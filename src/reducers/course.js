import courseService from '../services/course'
import userService from '../services/user'

const initial = {
  info: null,
  stats: null
}

const reducer = (state = initial, action) => {
  console.log(action)
  if (action.type === 'INITIALIZE_COURSE') {
    return Object.assign({}, state, {info: action.payload } )
  }

  if (action.type === 'INITIALIZE_STATS') {
    return Object.assign({}, state, { stats: action.payload })
  }

  return state
}

export const initializeCourse = () => {
  return async (dispatch) => {
    const info = await courseService.getInfo()
    dispatch({
      type: 'INITIALIZE_COURSE',
      payload: info
    })
  }
}

export const initializeStats = () => {
  return async (dispatch) => {
    const stats = await courseService.getStats()
    dispatch({
      type: 'INITIALIZE_STATS',
      payload: stats
    })
  }
}

export default reducer