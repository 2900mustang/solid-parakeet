import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import Recipe from './components/Recipe'
import Axios from 'axios'
import './App.css';

import NavBar from './screens/NavBar'

const App = () => {
  const APP_ID = ''
  const APP_KEY = ''

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')

  useEffect(() => {
    getRecipes()
  }, [query])

  const getRecipes = async () => {
    const res = await Axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    console.log(res.data.hits)
    setRecipes(res.data.hits)
  } 

  const handleSearch = e => setSearch(e.target.value)

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  return (
    <>
      <NavBar />

      <Switch>
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type='text' value={search} onChange={handleSearch} />
        <button className='search-btn' type='submit'>Search</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe recipe={recipe.recipe} key={recipe.recipe.uri} />
        ))}
      </div>
      </Switch>
    </>
  )
}

export default App;
