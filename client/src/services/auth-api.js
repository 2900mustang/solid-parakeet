import axios from 'axios'

const baseURL = 'http://localhost:3000'
const token = localStorage.getItem('authToken')

const api = axios.create({
  baseURL,
  headers: {
    authorization: token
  }
})

const loginUser = async (obj) => {
  const res = await api.post('/auth/login', obj)
  localStorage.setItem('authToken', res.data.token)
  api.defaults.headers.common.authorization = `Bearer ${res.data.token}`
  return res.data.user
}

const registerUser = async (obj) => {
  const res = await api.post('/users/', { user: obj })
  localStorage.setItem('authToken', res.data.token)
  api.defaults.headers.common.authorization = `Bearer ${res.data.token}`
  return res.data.user  
}

const verifyUser = async () => {
  const token = localStorage.getItem('authToken')
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}` 
    const res = await api.get('/auth/verify')
    return res.data
  }
  return false
}

export {
  loginUser,
  registerUser,
  verifyUser
}