import React, { useState } from 'react'

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState(null)

  if (!props.show) {
    return null
  }

  const books = props.books
  console.log(books)

  let genres = new Set()

  books.forEach(book => {
    book.genres.forEach(genre => {
      genres.add(genre)
    })
  })

  console.log(genres)

  const setGenre = (genre) => {
    setGenreFilter(genre)
  }

  const style = {
    borderColor: "blue"
  }

  let booksToShow

  if (genreFilter === null) {
    booksToShow = books
  } else {
    booksToShow = books.filter(book => book.genres.includes(genreFilter))
  }
  

  return (
    <div>
      <h2>books in {genreFilter === null ? 'all genres' : `genre ${genreFilter}`}</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {Array.from(genres).map(genre =>
          <button key={genre} onClick={() => setGenre(genre)}
            style={(genre === genreFilter ? style : null)}>
            {genre}
          </button>
        )}
        <button onClick={() => setGenreFilter(null)}
          style={(genreFilter === null ? style : null)}>
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books