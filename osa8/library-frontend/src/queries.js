import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $publishedInt: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $publishedInt,
    genres: $genres
  ) {
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $bornInt: Int!) {
  editAuthor(name: $name, setBornTo: $bornInt) {
    name
    born
  }
}
`

export const CURRENT_USER = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`