import React from 'react'

const Recommendations = ({ show, books, user }) => {
  const booksToShow = books.filter(book => book.genres.includes(user.favoriteGenre))

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{user.favoriteGenre}</b>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations