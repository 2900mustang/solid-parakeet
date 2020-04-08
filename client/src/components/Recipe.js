import React from 'react'
import style from '../styles/recipe.module.css'

const Recipe = ({ recipe }) => {
  const { label, image, calories, ingredients } = recipe

  return (
    <div className={style.recipe}>
      <h1>{label}</h1>
      <ol>
        {ingredients.map((ing, i) => (
          <li key={i}>{ing.text}</li>
        ))}
      </ol>
      <h1>{calories}</h1>
      <img className={style.image} src={image} alt='' />
    </div>
  )
}

export default Recipe
