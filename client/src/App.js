import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router';
import './App.css';

import { loginUser, registerUser, verifyUser } from './services/auth-api'

import NavBar from './screens/NavBar'
import Landing from './screens/Landing'
import Signup from './components/Signup'
import Login from './components/Login'

const App = (props) => {
  const { history } = props
  const [currentUser, setCurrentUser] = useState(null)
  const [authObj, setAuthObj] = useState({ username: '', email: '', password: '', newPassword: '' })
  const [changingPassword, setChangingPassword] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')

  useEffect(() => {
    history.push('/home')
    const fetchUser = async () => {
      const currentUser = await verifyUser()
      if (currentUser) {
        setCurrentUser(currentUser)
      }
    }
    fetchUser()
  }, [])

  const handleAuthObjChange = e => {
    const { target: { name, value } } = e
    setAuthObj({ ...authObj, [name]: value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    const signupObj = Object.assign({}, authObj)
    delete signupObj.newPassword
    console.log({...signupObj})
    history.push('/login')
  }
  
  const handleLogin = async (e) => {
    e.preventDefault()
    if (changingPassword) {
      const updatingObj = {...authObj}
      delete updatingObj.email
      setChangingPassword(!changingPassword)
    } else {
      const currentUser = await loginUser(authObj)
      setCurrentUser(currentUser)
      console.log({...currentUser})
      history.push('/home')
    }
  }

  const handleSearch = e => setSearch(e.target.value)

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  return (
    <>
      <NavBar currentUser={currentUser} />

      <Switch>
        <Route exact path="/home" render={() => (
          <Landing />
        )} />
        <Route path='/signup' render={props => (
          <Signup {...props} authObj={authObj} handleChange={handleAuthObjChange} handleSubmit={handleSignup} />
        )} />
        <Route path='/login' render={props => (
          <Login {...props} authObj={authObj} changingPassword={changingPassword} toggleNewPass={() => setChangingPassword(!changingPassword)} handleChange={handleAuthObjChange} handleSubmit={handleLogin} />
        )} />
      </Switch>
    </>
  )
}

export default withRouter(App);
