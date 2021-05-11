import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { commentBlog } from '../reducers/blogsReducer'
import { Form, Button } from 'react-bootstrap'


const CommentForm = () => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const blogs = useSelector(state => state.blogs)
  const id = useRouteMatch('/blogs/:id')
  const blog = id ? blogs.find(b => b.id === id.params.id) : null

  const handleAdd = async (event) => {
    event.preventDefault()


    const newComment = { content: comment }

    setComment('')
    dispatch(commentBlog(blog, newComment))
  }

  return (
    <form onSubmit={handleAdd}>
      <Form.Group className="d-flex">
        <Form.Control
          id="content"
          type="text"
          value={comment}
          name="comment"
          onChange={({ target }) => setComment(target.value)} />
        <Button variant="outline-primary" type="submit">comment</Button>
      </Form.Group>
    </form>
  )
}

export default CommentForm