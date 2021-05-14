import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql `
query {
  allAuthors {
    name
    born
    bookCount
  }
  allBooks {
    title
    author
    published
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
    author
    published
    genres
  }
}
`