import React, { useState } from 'react'

const Blog = ({ blog, deleteBlog, user, like }) => {
  const [fullInfoVisible, setFullInfoVisible] = useState(false)

  const handleDelete = async (blog) => {
    if (window.confirm(`remove blog ${blog.title}?`)) {
      deleteBlog(blog)
    }
  }

  return (
    <div className="container">
      <div>
        {blog.title} {blog.author} <button onClick={() => setFullInfoVisible(!fullInfoVisible)}>{fullInfoVisible ? 'hide' : 'show'}</button>
      </div>
      {fullInfoVisible && (
        <div>
          <a href={blog.url} target="_blank" rel="noreferrer noopener">{blog.url}</a>
          <p> <button onClick={() => like(blog)} className="like-btn">like</button> {blog.likes} </p>
          {blog.user.id === user.id && (
            <button onClick={() => handleDelete(blog)} className="remove-btn">remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog