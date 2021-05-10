import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const [fullInfoVisible, setFullInfoVisible] = useState(false)

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
      <div>
        {blog.title} {blog.author} <button onClick={() => setFullInfoVisible(!fullInfoVisible)}>{fullInfoVisible ? 'hide' : 'show'}</button>
      </div>
      {fullInfoVisible && (
        <div>
          <a href={blog.url} target="_blank" rel="noreferrer noopener">{blog.url}</a>
          <p> <button onClick={() => handleLike(blog)} className="like-btn">like</button> {blog.likes} </p>
          {blog.user.id === user.id && (
            <button onClick={() => handleDelete(blog)} className="remove-btn">remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog