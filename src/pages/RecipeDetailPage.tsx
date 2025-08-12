import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { getRecipes } from '../utils/localStorage'
import { Recipe } from '../types'

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const recipes: Recipe[] = getRecipes()
  const recipe = recipes.find(r => r.id === id)

  if (!recipe) return <p>Recipe not found</p>

  return (
    <div className="max-w-3xl mx-auto bg-yellow-100 p-6 rounded shadow">
      <h1 className="text-3xl font-bold text-yellow-900 mb-4">{recipe.title}</h1>
      <p className="mb-4 text-yellow-800">{recipe.description}</p>
      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full rounded mb-4"
        />
      )}
      <p className="text-sm text-yellow-700 mb-2">Category: {recipe.category}</p>
      <p className="text-sm text-yellow-700 mb-4">Uploaded by: {recipe.author}</p>
      <Link to="/" className="underline text-yellow-800">Back to Home</Link>
    </div>
  )
}

export default RecipeDetailPage
