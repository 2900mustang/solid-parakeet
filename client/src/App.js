import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router';
import './App.css';

import { loginUser, registerUser, verifyUser, updatePassword } from './services/auth-api'
import { getUser, getAllBlogs, getBlogs, getComments, createBlog, createComment, updateBlog, updateComment, destroyBlog, destroyComment } from './services/blog-api'

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
    const fetchUser = async () => {
      const currentUser = await verifyUser()
      if (currentUser) {
        setCurrentUser(currentUser)
      }
      const allBlogs = await getAllBlogs()
      setAllBlogs(allBlogs)
    }
    fetchUser()
  }, [])

  const handleAuthObjChange = e => {
    const { target: { name, value } } = e
    setAuthObj({ ...authObj, [name]: value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    const currentUser = await registerUser(authObj)
    setCurrentUser(currentUser)
    setAuthObj({ username: '', email: '', password: '', newPassword: '' })
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
          const updated = await updatePassword(updatingObj, validUser.id)
        }
        setChangingPassword(!changingPassword)
        setAuthObj({ username: '', email: '', password: '', newPassword: '' })
      } catch (e) {
        console.error(e.message)
      }
    } else {
      const currentUser = await loginUser({ username: authObj.username, password: authObj.password })
      setCurrentUser(currentUser)
      history.push('/blogs')
      setAuthObj({ username: '', email: '', password: '', newPassword: '' })
    }
  }

  const handleLogOut = async () => {
    try {
      setCurrentUser(null)
      await localStorage.removeItem('authToken')
    } catch (e) {
      console.error(e.message)
    }
  }
 
  const handleBlogFormChange = e => {
    const { target: { name, value } } = e
    setBlogForm({ ...blogForm, [name]: value })
  }

  const clearBlogForm = () => setBlogForm({ title: '', text: '' })

  const handleBlogCreate = async e => {
    e.preventDefault()
    try {
      const createdBlog = await createBlog(currentUser.id, blogForm)
      if (createdBlog) {
        history.push('/blogs')
        setAllBlogs(allBlogs.concat(createdBlog))
        setBlogForm({ title: '', text: '' })
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

  const backToMain = () => setBrowsingSomeones(false)

  return (
    <>
      <NavBar searchText={search} handleChange={handleSearchChange} handleClick={handleSearch} handleKeyPress={keyPress} currentUser={currentUser} logout={handleLogOut} backToMain={backToMain} clearBlogForm={clearBlogForm} />

      <Switch>
        <Route exact path='/'>
          {/* {currentUser ? <Redirect to='/blogs' /> : <Redirect to='/landing' />} */}
          {/* <Redirect to={!currentUser ? `/landing` : `/blogs`} /> */}
          <Redirect to='/landing' />
        </Route>
        <Route path='/landing'>
          {!currentUser ? <Landing /> : <Redirect to='/blogs' />}
        </Route>
        <Route path="/blogs">
          <Blogs blogs={searching ? filteredBlogs : allBlogs} currentUser={currentUser && currentUser.username} deleteBlog={handleBlogDelete} updateBlog={handleBlogUpdate} />
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
          <BlogsByUser {...props} handleLoad={fetchBlogsByUser} blogs={searching ? filteredBlogs : someonesBlogs} currentUser={currentUser.username} user={currentUser} deleteBlog={handleBlogDelete} updateBlog={handleBlogUpdate} />
        )} />
        <Route exact path='/users/:userId/blogs' render={props => (
          <BlogsByUser {...props} handleLoad={fetchBlogsByUser} blogs={searching ? filteredBlogs : someonesBlogs} currentUser={currentUser && currentUser.username} user={whoseBlogs} deleteBlog={handleBlogDelete} updateBlog={handleBlogUpdate} />
        )} />
        <Route path='/users/:userId/blogs/:blogId' render={props => (
          <FullBlog {...props} />
        )} />
      </Switch>
    </>
  )
}

export default withRouter(App);
