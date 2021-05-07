const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'RESET_NOTIFICATION':
      return ''
    default: return state
  }
}

let timer

export const setNotification = (message, type, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message: message,
        type: type,
      }
    })

    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    }, time * 1000)
  }
}



export default reducer