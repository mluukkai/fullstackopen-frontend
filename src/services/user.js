import axios from 'axios'

const login = async (githubToken) => {
  const url = `${BASEURL}/api/login?token=${githubToken}`
  const response = await axios.get(url)
  return response.data
}

const getSubmissions = async (username) => {
  const user = JSON.parse(localStorage.getItem('currentOFSUser'))

  const config = {
    headers: { 'x-access-token': user.token }
  }

  const response = await axios.get(`${BASEURL}/users/${user.username}`, config)
  return response.data
}

const submitExercises = async (exercises) => {
  const user = JSON.parse(localStorage.getItem('currentOFSUser'))
  const config = {
    headers: { 'x-access-token': user.token }
  }

  const response = await axios.post(`${BASEURL}/users/${user.username}/exercises`, exercises, config)
  return response.data
}

export default {
  login, getSubmissions, submitExercises
}