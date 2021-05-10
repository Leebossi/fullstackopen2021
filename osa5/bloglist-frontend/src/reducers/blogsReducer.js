import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return [...state, action.blog]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE_BLOG':
      return [...state]
    case 'DELETE_BLOG':
      return [...state]
    default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: sortBasedOnLikes(blogs)
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)

      dispatch({
        type: 'ADD_BLOG',
        data: { blog: newBlog }
      })

      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'info', 5))
    } catch (exception) {
      dispatch(setNotification('error adding blog', 'error', 5))
    }
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)

      dispatch({
        type: 'DELETE_BLOG',
        blog: blog
      })
      dispatch(setNotification('blog deleted', 'info', 5))
    } catch (exception) {
      dispatch(setNotification('error deleting blog', 'error', 5))
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    blog.likes++
    const likedBlog = await blogService.update(blog)

    dispatch({
      type: 'LIKE_BLOG',
      data: {
        likedBlog
      }
    })
  }
}

const sortBasedOnLikes = (blogs) => {
  blogs.sort((a, b) => {
    if (a.likes < b.likes) {
      return 1
    } else if (a.likes > b.likes) {
      return -1
    } else {
      return 0
    }
  })

  return blogs
}

export default reducer