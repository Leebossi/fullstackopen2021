import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const authors = props.authors

  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    const bornInt = Number(born)

    changeBorn({ variables: { name, bornInt } })

    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>set birth year</h2>
      <form onSubmit={submit}>
        <select
          id="authors"
          name="authors"
          defaultValue="default"
          onChange={({ target }) => setName(target.value)}
        >

          <option disabled value="default">choose author</option>
          {authors.map(a =>
            <option key={a.name} value={a.name}>{a.name}</option>
          )}
        </select>
        <input
          type='number'
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
        <button type="submit">update author</button>
      </form>

    </div>
  )
}

export default Authors