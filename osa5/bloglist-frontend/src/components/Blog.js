import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const handleDelete = (blog) => {
    if (window.confirm(`remove blog ${blog.title}?`)) {
      dispatch(deleteBlog(blog))
    }
  }

  const handleLike = (blog) => {
    console.log(blog)
    dispatch(likeBlog(blog))
  }

  return (
    <div className="container blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer noopener">{blog.url}</a>
        <p> <button onClick={() => handleLike(blog)} className="like-btn">like</button> {blog.likes} </p>
        {blog.user.id === user.id && (
          <button onClick={() => handleDelete(blog)} className="remove-btn">remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog