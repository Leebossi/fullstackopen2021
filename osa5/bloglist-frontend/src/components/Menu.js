import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const Menu = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <div className="container user-nav">
      <div>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
      </div>
      <div>
        logged in as {user.name}<button onClick={() => dispatch(logout())}>logout</button>
      </div>
    </div>
  )
}

export default Menu