import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url and likes by default', () => {
  const blog = {
    title: 'Test blog title',
    author: 'Test blog author',
    url: 'Test blog url',
    likes: 7
  }

  const component = render(
    <Blog blog={blog} />
  )

  component.debug()

  expect(component.container).toHaveTextContent('Test blog title')
  expect(component.container).toHaveTextContent('Test blog author')
  expect(component.container).not.toHaveTextContent('Test blog url')
  expect(component.container).not.toHaveTextContent(7)
})


test('renders url and likes after button click', () => {
  const blog = {
    id: '6076ba847960ea34194f9306',
    title: 'Test blog title',
    author: 'Test blog author',
    url: 'Test blog url',
    likes: 7,
    user: {
      id: '6076ba847960ea34194f9306',
      name: 'Test user',
      username: 'tester',
    }
  }

  const user = {
    id: '6076ba847960ea34194f9306',
    name: 'Test user',
    username: 'tester',
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )
  
  const button = component.getByText('show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('Test blog url')
  expect(component.container).toHaveTextContent(7)
})

test('pressing like button twice triggers the event handler exactly twice', () => {
  const blog = {
    title: 'Test blog title',
    author: 'Test blog author',
    url: 'Test blog url',
    likes: 7,
    user: {
      id: '6076ba847960ea34194f9306',
      name: 'Test user',
      username: 'tester',
    }
  }

  const user = {
    id: '6076ba847960ea34194f9306',
    name: 'Test user',
    username: 'tester',
  }

  const handleLike = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} like={handleLike} />
  )

  const showButton = component.getByText('show')
  fireEvent.click(showButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(handleLike.mock.calls).toHaveLength(2)
})
