import userService from '../services/user'

const reducer = (state = null, action) => {
  if (action.type === 'LOGIN') {
    return action.payload
  } else if (action.type === 'LOGOUT') {
    return null
  } else if (action.type === 'SUBMISSION') {
    return action.payload
  }

  return state
}

export const login = (user) => {
  return {
    type: 'LOGIN',
    payload: user
  }
}

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem('currentOFSUser')

    dispatch({
      type: 'LOGOUT'
    })

    dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        text: 'logged out',
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

export const loginFromLocalStore = () => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('currentOFSUser')
    if (userJson) {
      const user = JSON.parse(userJson)
      const { submissions} = await userService.getSubmissions(user.username)

      user.submissions = submissions

      dispatch({
        type: 'LOGIN',
        payload: user
      })
    }  
  }
}

export const loginWith = (token) => {
  return async (dispatch) => {
    const user = await userService.login(token)
    localStorage.setItem('currentOFSUser', JSON.stringify(user))
    dispatch({
      type: 'LOGIN',
      payload: user
    })

    dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        text: `${user.username} logged in`,
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

export const submission = (data) => {
  return {
    type: 'SUBMISSION',
    payload: data
  }
}

export default reducer