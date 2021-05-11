import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  if (!blogs) {
    return null
  }

  return (
    <div>
      <h2>blogs</h2>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs