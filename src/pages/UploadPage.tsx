import React, { useState } from 'react'
import { Recipe, User } from '../types'
import { getRecipes, saveRecipes } from '../utils/localStorage'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  user: User
}

const categories = [
  'African Traditional Food',
  'Desserts',
  'Breakfast',
  'Vegetarian',
  'Seafood',
  'Beverages',
]

// Default images for categories
const defaultImages: Record<string, string> = {
  'African Traditional Food': 'https://images.unsplash.com/photo-1604908815316-75b1e9d3d6bc?auto=format&fit=crop&w=800&q=80',
  'Desserts': 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80',
  'Breakfast': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
  'Vegetarian': 'https://images.unsplash.com/photo-1543352634-6914a1b0c8b9?auto=format&fit=crop&w=800&q=80',
  'Seafood': 'https://images.unsplash.com/photo-1604908177008-dfb8f1e5dbed?auto=format&fit=crop&w=800&q=80',
  'Beverages': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
}

const UploadPage: React.FC<Props> = ({ user }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [imageUrl, setImageUrl] = useState('')
  const [ingredientsInput, setIngredientsInput] = useState('')
  const [steps, setSteps] = useState('')

  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!title.trim() || !description.trim() || !ingredientsInput.trim() || !steps.trim()) {
      alert('Please fill in all required fields.')
      return
    }

    // Use user-provided image URL or fallback to category default
    const finalImageUrl = imageUrl.trim() || defaultImages[category] || 'https://via.placeholder.com/300x200?text=No+Image'

    const newRecipe: Recipe = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      category,
      imageUrl: finalImageUrl,
      author: user.username,
      ingredients: ingredientsInput.split(',').map(item => item.trim()).filter(Boolean),
      steps: steps.trim(),
    }

    const recipes = getRecipes()
    saveRecipes([...recipes, newRecipe])

    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-yellow-100 p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-yellow-900">Upload a New Recipe</h2>

      <label className="block">
        <span className="text-yellow-900 font-semibold">Title</span>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="mt-1 p-2 w-full border border-yellow-300 rounded"
          required
        />
      </label>

      <label className="block">
        <span className="text-yellow-900 font-semibold">Description</span>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="mt-1 p-2 w-full border border-yellow-300 rounded"
          rows={3}
          required
        />
      </label>

      <label className="block">
        <span className="text-yellow-900 font-semibold">Category</span>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="mt-1 p-2 w-full border border-yellow-300 rounded"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-yellow-900 font-semibold">Image URL (optional)</span>
        <input
          type="url"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          className="mt-1 p-2 w-full border border-yellow-300 rounded"
        />
      </label>

      <label className="block">
        <span className="text-yellow-900 font-semibold">Ingredients (comma-separated)</span>
        <input
          type="text"
          value={ingredientsInput}
          onChange={e => setIngredientsInput(e.target.value)}
          className="mt-1 p-2 w-full border border-yellow-300 rounded"
          placeholder="e.g. rice, tomatoes, onions"
          required
        />
      </label>

      <label className="block">
        <span className="text-yellow-900 font-semibold">Steps</span>
        <textarea
          value={steps}
          onChange={e => setSteps(e.target.value)}
          className="mt-1 p-2 w-full border border-yellow-300 rounded"
          rows={4}
          placeholder="Explain the recipe steps"
          required
        />
      </label>

      <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  )
}

export default UploadPage
