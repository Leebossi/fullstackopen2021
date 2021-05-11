import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'

import Menu from './components/Menu'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const addBlogRef = useRef()

  return (
    <div className="container">
      <Notification />
      {user === null ?
        <LoginForm /> :
        <div>
          <Menu />
          <Switch>
            <Route path="/users/:id">
              <User users={users} />
            </Route>

            <Route path="/users">
              <Users />
            </Route>

            <Route path="/blogs/:id">
              <Blog />
            </Route>

            <Route path="/">
              <Togglable buttonLabel="new blog" ref={addBlogRef}>
                <BlogForm />
              </Togglable>
              <Blogs user={user} />
            </Route>

          </Switch>
        </div>
      }
    </div>
  )
}

export default App