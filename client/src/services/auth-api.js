import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ? 'https://calm-depths-12111.herokuapp.com' : 'http://localhost:3000'

const api = axios.create({
  baseURL
})

const loginUser = async (loginData) => {
  const response = await api.post('/auth/login', {
    auth: loginData
  })
  localStorage.setItem('authToken', response.data.token)
  api.defaults.headers.common.authorization = `Bearer ${response.data.token}`
  return response.data.user;
}

const registerUser = async (registerData) => {
  const response = await api.post('/users/', {
    user: registerData
  })
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
  const res = await api.put(`/users/${id}`, {
    user: obj
  })
  return res.data
}

const getUser = async (userId) => {
  const res = await api.get(`/users/${userId}`)
  return res.data
}

const getAllBlogs = async () => {
  const res = await api.get('/all_blogs')
  return res.data
}

const getBlogs = async (userId) => {
  const res = await api.get(`/users2/${userId}/blogs`)
  return res.data
}

const getBlog = async (userId, blogId) => {
  const res = await api.get(`/users/${userId}/blogs/${blogId}`)
  return res.data
}

const createBlog = async (userId, obj) => {
  const res = await api.post(`/users/${userId}/blogs`, {
    blog: obj
  })
  return res.data
}

const updateBlog = async (userId, blogId, obj) => {
  const res = await api.put(`/users/${userId}/blogs/${blogId}`, {
    blog: obj
  })
  return res.data
}

const destroyBlog = async (userId, blogId) => {
  const res = await api.delete(`/users/${userId}/blogs/${blogId}`)
  return res.data
}

const getComments = async () => {
  const res = await api.get('/comments')
  return res.data
}

const createComment = async (id, obj) => {
  const res = await api.post(`/blogs/${id}/comments`, {
    comment: obj
  })
  return res.data
}

const updateComment = async (blogId, commentId, obj) => {
  const res = await api.put(`/blogs/${blogId}/comments/${commentId}`, {
    comment: obj
  })
  return res.data
}

const destroyComment = async (blogId, commentId) => {
  const res = await api.delete(`/blogs/${blogId}/comments/${commentId}`)
  return res.data
}

export {
  loginUser,
  registerUser,
  verifyUser,
  updatePassword,
  removeToken,
  getUser,
  getAllBlogs,
  getBlogs,
  getBlog,
  getComments,
  createBlog,
  createComment,
  updateBlog,
  updateComment,
  destroyBlog,
  destroyComment
}