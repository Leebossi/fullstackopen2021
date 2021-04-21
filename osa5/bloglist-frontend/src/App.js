import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
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
      setNotification({ message: `${user.username} logged in`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({ message: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
    setNotification({ message: 'succesfully logged out', type: 'info' })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      addBlogRef.current.toggleVisibility()
      setBlogs([...blogs, newBlog])
      setNotification({ message: `a new blog ${blog.title} by ${blog.author} added`, type: 'info' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({ message: 'error adding blog', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)

      setBlogs(sortBasedOnLikes(blogs.filter(b => b.id !== blog.id)))
      setNotification({ message: 'blog deleted', type: 'info' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({ message: 'error deleting blog', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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
      <Notification notification={notification} />
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