import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  if (!blogs) {
    return null
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <div key={blog.id} className="container blog">
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

export default Blogs