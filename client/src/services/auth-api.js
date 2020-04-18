import axios from 'axios'

const baseURL = 'http://localhost:3000'

const api = axios.create({
  baseURL
})

const loginUser = async (loginData) => {
  const response = await api.post('/auth/login', { auth: loginData })
  localStorage.setItem('authToken', response.data.token)
  api.defaults.headers.common.authorization = `Bearer ${response.data.token}`
  return response.data.user;
}

const registerUser = async (registerData) => {
  const response = await api.post('/users/', { user: registerData })
  localStorage.setItem('authToken', response.data.token);
  api.defaults.headers.common.authorization = `Bearer ${response.data.token}`
  return response.data.user
}

const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const response = await api.get('/auth/verify');
    return response.data
  }
  return false
}

const removeToken = () => {
  api.defaults.headers.common.authorization = null;
}

const updatePassword = async (obj, id) => {
  const res = await api.put(`/users/${id}`, { user: obj })
  return res.data
}

export {
  loginUser,
  registerUser,
  verifyUser,
  updatePassword,
  removeToken
}