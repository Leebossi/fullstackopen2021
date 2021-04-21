import React from 'react'
import { render, fireEvent, } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls submit', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogForm addBlog={addBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Test blog title' }
  })
  
  fireEvent.change(author, {
    target: { value: 'Test blog author' }
  })
  
  fireEvent.change(url, {
    target: { value: 'Test blog url' }
  })

  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Test blog title')
  expect(addBlog.mock.calls[0][0].author).toBe('Test blog author')
  expect(addBlog.mock.calls[0][0].url).toBe('Test blog url')
})