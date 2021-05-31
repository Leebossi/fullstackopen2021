const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.mesage)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    addAuthor(
      name: String!
      born: Int
    ): Author
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      let filter = {}
      if (args.author) {
        return books.filter(b => b.author === args.author)
      } else if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }
      const filteredBooks = await Book.find({ ...filter }).populate('author')
      return filteredBooks
    },

    allAuthors: () => Author.find({}),

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id })
      return books.length
    }
  },

  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    genres: (root) => root.genres,
    id: (root) => root.id
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('Not authenticated!')
      }

      let authorId

      const existingAuthor = await Author.findOne({ name: args.author })

      if (existingAuthor) {
        authorId = existingAuthor._id
        console.log('Existing author found', existingAuthor.name)
      } else {
        const newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          if (error.message.includes('Author') && error.message.includes('is shorter than the minimum')) {
            throw new UserInputError('Author name is too short!', {
              invalidArgs: args
            })
          }
        }

        authorId = newAuthor._id
        console.log('New author', newAuthor.name)
      }

      const newBook = new Book({
        title: args.title,
        published: args.published,
        author: authorId,
        genres: args.genres
      })

      try {
        await newBook.save()
        console.log('Book added', newBook.title)
      } catch (error) {
        if (error.message.includes('title') && error.message.includes('is shorter than the minimum')) {
          throw new UserInputError('Book title is too short!', {
            invalidArgs: args
          })
        }
      }

      const book = await Book.findById(newBook._id).populate('author')

      return book
    },

    addAuthor: async (root, args) => {
      const author = new Author({ ...args })

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser)  {
        throw new AuthenticationError('Not authenticated!')
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      await author.save()
      return author
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})