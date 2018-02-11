const reducer = (state = null, action) => {
  if (action.type === 'SET_NOTIFICATION') {
    return action.payload
  } else if (action.type === 'CLEAR_NOTIFICATION') {
    return null
  }

  return state
}

export const setLoginError = (text) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: {
      text, 
      type: 'loginError'
    }
  }
}

export const setError = (text) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: {
      text,
      type: 'error'
    }
  }
}

export const notify = (text) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        text,
        type: 'success'
      }
    })
    
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, 8000)   
  }
}

export const setNotification = (text) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: {
      text,
      type: 'success'
    }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default reducer