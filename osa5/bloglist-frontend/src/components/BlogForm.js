import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAdd = async (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url,
    }

    setTitle('')
    setAuthor('')
    setUrl('')
    addBlog(blog)
  }

  return (
    <div className="container">
      <h2>Add new</h2>
      <form onSubmit={handleAdd}>
        <div>
          title:<input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:<input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:<input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default BlogForm