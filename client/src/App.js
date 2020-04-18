import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router';
import './App.scss';

import { loginUser, registerUser, verifyUser, updatePassword, removeToken, getUser, getAllBlogs, getBlogs, createBlog, updateBlog, destroyBlog } from './services/auth-api'

import NavBar from './screens/NavBar'
import Landing from './screens/Landing'
import Signup from './components/Signup'
import Login from './components/Login'
import Blogs from './components/Blogs'
import BlogsByUser from './components/BlogsByUser'
import FullBlog from './components/FullBlog'
import BlogForm from './components/BlogForm'

const App = (props) => {
  const { history } = props
  const [currentUser, setCurrentUser] = useState(null)
  const [whoseBlogs, setWhoseBlogs] = useState(null)
  const [authObj, setAuthObj] = useState({ username: '', email: '', password: '', newPassword: '' })
  const [changingPassword, setChangingPassword] = useState(false)
  const [blogForm, setBlogForm] = useState({ title: '', text: '' })
  const [allBlogs, setAllBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [someonesBlogs, setSomeonesBlogs] = useState([])
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [browsingSomeones, setBrowsingSomeones] = useState(false)

  useEffect(() => {
    const loginHook = async () => {
      const validUser = await verifyUser()
      if (validUser) {
        setCurrentUser(validUser)
      }
    }
    loginHook()
  }, [])

  const blogsHook = () => {
    getAllBlogs()
      .then(res => setAllBlogs(res))
  }

  useEffect(blogsHook, [])

  const handleAuthObjChange = e => {
    const { target: { name, value } } = e
    setAuthObj({ ...authObj, [name]: value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const validUser = await registerUser(authObj)
      if (validUser) {
        setCurrentUser(validUser)
      }
      setAuthObj({ username: '', email: '', password: '', newPassword: '' })
      history.push('/blogs')
    } catch (e) {
      console.error(e.message)
    }
  }
  
  const handleLogin = async (e) => {
    e.preventDefault()
    if (changingPassword) {
      localStorage.removeItem('authToken')
      try {
        const validUser = await loginUser(authObj)
        const updatingObj = {...authObj}
        updatingObj.email = validUser.email
        updatingObj.password = authObj.newPassword
        delete updatingObj.newPassword
        if (validUser) {
          await updatePassword(updatingObj, validUser.id)
        }
        setChangingPassword(!changingPassword)
        setAuthObj({ username: '', email: '', password: '', newPassword: '' })
      } catch (e) {
        console.error(e.message)
      }
    } else {
      const validUser = await loginUser({ username: authObj.username, password: authObj.password })
      setCurrentUser(validUser)
      setAuthObj({ username: '', email: '', password: '', newPassword: '' })
      history.push('/blogs')
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem('authToken')
    removeToken()
    setCurrentUser(null)
    setWhoseBlogs(null)
    history.push('/')
  }
 
  const handleBlogFormChange = e => {
    const { target: { name, value } } = e
    setBlogForm({ ...blogForm, [name]: value })
  }

  const handleBlogCreate = async e => {
    e.preventDefault()
    try {
      const createdBlog = await createBlog(currentUser.id, { ...blogForm, user_id: currentUser.id })
      if (createdBlog) {
        setSearching(false)
        setAllBlogs(allBlogs.concat(createdBlog))
        setBlogForm({ title: '', text: '' })
        history.push('/blogs')
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  const handleBlogUpdate = async (userId, blogId, obj) => {
    try {
      const updatedBlog = await updateBlog(userId, blogId, obj)
      if (updatedBlog) {
        setAllBlogs(allBlogs.map(blog => blog.id.toString() !== blogId.toString() ? blog : updatedBlog))
        if (browsingSomeones) {
          setSomeonesBlogs(someonesBlogs.map(blog => blog.id.toString() !== blogId.toString() ? blog : updatedBlog))
        }
        if (searching) {
          setFilteredBlogs(filteredBlogs.map(blog => blog.id.toString() !== blogId.toString() ? blog : updatedBlog))
        }
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  const handleBlogDelete = async (userId, blogId) => {
    try {
      await destroyBlog(userId, blogId)
      const updatedList = allBlogs.filter(blog => blog.id.toString() !== blogId)
      setAllBlogs(updatedList)
      if (someonesBlogs.length) {
        const updatedList = someonesBlogs.filter(blog => blog.id.toString() !== blogId)
        setSomeonesBlogs(updatedList)
      }
      if (filteredBlogs.length) {
        const updatedList = filteredBlogs.filter(blog => blog.id.toString() !== blogId)
        setFilteredBlogs(updatedList)
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  const handleSearchChange = ({ target: { value } }) => {
    setSearch(value)
    if (!value) {
      setFilteredBlogs([])
      setSearching(false)
    }
  }

  const handleSearch = () => {
    if (search) {
      const filteredBlogs = !browsingSomeones ? allBlogs.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase())) : someonesBlogs.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()))
      setFilteredBlogs(filteredBlogs) 
      setSearching(true) 
    }
  }

  const keyPress = ({ key }) => {
    if (key === 'Enter') {
      handleSearch()
    }
  }

  const fetchBlogsByUser = async (userId) => {
    const blogs = await getBlogs(userId)
    const user = await getUser(userId)
    setSearching(false)
    setWhoseBlogs(user)
    setSomeonesBlogs(blogs)
    setBrowsingSomeones(true)
  }

  const backToMain = () => {
    setBrowsingSomeones(false)
    setSearching(false)
    setBlogForm({ title: '', text: '' })
  }

  return (
    <>
      <NavBar searchText={search} handleChange={handleSearchChange} handleClick={handleSearch} handleKeyPress={keyPress} currentUser={currentUser} logout={handleLogOut} backToMain={backToMain} />

      <Switch>
        <Route exact path='/'>
          <Redirect to='/landing' />
        </Route>
        <Route path='/landing'>
          {!currentUser ? <Landing /> : <Redirect to='/blogs' />}
        </Route>
        <Route path="/blogs">
          <Blogs blogs={searching ? filteredBlogs : allBlogs} currentUser={currentUser} deleteBlog={handleBlogDelete} updateBlog={handleBlogUpdate} />
        </Route>

        <Route path='/signup' render={props => (
          <Signup {...props} authObj={authObj} handleChange={handleAuthObjChange} handleSubmit={handleSignup} />
        )} />
        <Route path='/login' render={props => (
          <Login {...props} authObj={authObj} changingPassword={changingPassword} toggleNewPass={() => setChangingPassword(!changingPassword)} handleChange={handleAuthObjChange} handleSubmit={handleLogin} />
        )} />
        
        <Route path='/createBlog' render={props => (
          <BlogForm {...props} blogForm={blogForm} handleChange={handleBlogFormChange} handleSubmit={handleBlogCreate} />
        )} />
        <Route path='/myblogs/:userId' render={props => (
          <BlogsByUser {...props} handleLoad={fetchBlogsByUser} blogs={searching ? filteredBlogs : someonesBlogs} currentUser={currentUser} owner={currentUser} deleteBlog={handleBlogDelete} updateBlog={handleBlogUpdate} />
        )} />
        <Route exact path='/users/:userId/blogs' render={props => (
          <BlogsByUser {...props} handleLoad={fetchBlogsByUser} blogs={searching ? filteredBlogs : someonesBlogs} currentUser={currentUser} owner={whoseBlogs} deleteBlog={handleBlogDelete} updateBlog={handleBlogUpdate} />
        )} />
        <Route path='/users/:userId/blogs/:blogId' render={props => (
          <FullBlog {...props} currentUser={currentUser} />
        )} />
      </Switch>
    </>
  )
}

export default withRouter(App);
