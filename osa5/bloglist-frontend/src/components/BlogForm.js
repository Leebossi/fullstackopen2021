import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

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
    dispatch(addBlog(blog))
  }

  return (
    <div className="container">
      <h2>Add new</h2>
      <form onSubmit={handleAdd}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)} />

          <Form.Label>author:</Form.Label>
          <Form.Control
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)} />

          <Form.Label>url:</Form.Label>
          <Form.Control
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)} />

          <Button variant="outline-primary" type="submit">add</Button>
        </Form.Group>
      </form>
    </div>
  )
}

export default BlogForm