import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getAllBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(sortBasedOnLikes(blogs))
    }

    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getAllBlogs()
    }
  }, [])

  const login = async (credentials) => {

    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
      dispatch(setNotification(`Logged in as ${user.name}`, 'success', 5))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error', 5))
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setNotification('succesfully logged out', 'info', 5))
  }

  const addBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      addBlogRef.current.toggleVisibility()
      setBlogs([...blogs, newBlog])
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, 'info', 5))
    } catch (exception) {
      dispatch(setNotification('error adding blog', 'error', 5))
    }
  }

  const deleteBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)

      setBlogs(sortBasedOnLikes(blogs.filter(b => b.id !== blog.id)))
      dispatch(setNotification('blog deleted', 'info', 5))
    } catch (exception) {
      dispatch(setNotification('error deleting blog', 'error', 5))
    }
  }

  const handleLike = async (blog) => {
    blog.likes++
    await blogService.update(blog)
    getAllBlogs()
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

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(sortBasedOnLikes(blogs))
  }

  const addBlogRef = useRef()

  const blogslist = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} refresh={getAllBlogs} user={user} like={handleLike} />
      )}
    </div>
  )

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm login={login} /> :
        <div>
          <p className="container user-nav">logged in as {user.name}<button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="new blog" ref={addBlogRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          {blogslist()}
        </div>
      }
    </div>
  )
}

export default App