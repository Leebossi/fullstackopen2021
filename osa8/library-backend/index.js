const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = 'mongodb+srv://fullstack:fullstackpass123@cluster0.aaxn7.mongodb.net/graphql?retryWrites=true'

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
    addBook: async (root, args) => {
      console.log(args)

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

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      await author.save()
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})