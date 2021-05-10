import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user
    case 'LOGIN':
      return action.data.user
    case 'LOGOUT':
      return null
    default: return state
  }
}

export const setUser = user => {
  return async dispatch => {
    blogService.setToken(user.token)

    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export const login = credentials => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      dispatch({
        type: 'LOGIN',
        data: {
          user: user
        }
      })

      console.log(user)
      dispatch(setNotification(`Logged in as ${user.name}`, 'success', 5))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error', 5))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBloglistUser')

    dispatch({
      type: 'LOGOUT'
    })

    dispatch(setNotification('succesfully logged out', 'info', 5))
  }
}

export default reducer