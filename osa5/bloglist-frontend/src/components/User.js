import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <Table striped>
        <tbody>
          {user.blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default User