const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'RESET':
      return ''
    default: return state
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })

    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, time * 1000)
  }
}

export default notificationReducer