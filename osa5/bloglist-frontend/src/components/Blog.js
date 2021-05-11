import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'
import { useParams, useHistory } from 'react-router-dom'
import CommentForm from './CommentForm'
import { Table, Button } from 'react-bootstrap'

const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const handleDelete = (blog) => {
    if (window.confirm(`remove blog ${blog.title}?`)) {
      dispatch(deleteBlog(blog))
      history.push('/')
    }
  }

  const handleLike = (blog) => {
    console.log(blog)
    dispatch(likeBlog(blog))
  }

  if (!blog) {
    return null
  }

  return (
    <div className="container">
      <h2>
        {blog.title}, {blog.author}
      </h2>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer noopener">{blog.url}</a>
        <p> <Button variant="outline-success" onClick={() => handleLike(blog)} className="like-btn">like</Button> {blog.likes} </p>
      </div>
      <div>
        <h3>Comments</h3>
        <Table striped>
          <tbody>
            {blog.comments.map(comment =>
              <tr key={comment.id}>
                <td>
                  {comment.content}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <CommentForm />
      </div>
      {blog.user.id === user.id && (
        <Button variant="outline-danger" onClick={() => handleDelete(blog)} className="remove-btn">remove blog</Button>
      )}
    </div>
  )
}

export default Blog