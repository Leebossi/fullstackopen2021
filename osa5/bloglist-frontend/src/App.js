import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser, logout } from './reducers/loginReducer'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  /*
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
  */

  const addBlogRef = useRef()

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm /> :
        <div>
          <p className="container user-nav">logged in as {user.name}<button onClick={() => dispatch(logout())}>logout</button></p>
          <Togglable buttonLabel="new blog" ref={addBlogRef}>
            <BlogForm />
          </Togglable>
          <Blogs user={user} />
        </div>
      }
    </div>
  )
}

export default App