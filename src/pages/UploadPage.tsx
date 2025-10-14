// src/pages/UploadPage.tsx
import React, { useState, useEffect } from 'react';
import { User, Recipe } from '../types';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './UploadPage.css';

interface UploadPageProps {
  user?: User | null; // allow null/undefined
  recipes?: Recipe[]; // all recipes from App.tsx
  setRecipes?: React.Dispatch<React.SetStateAction<Recipe[]>>; // update App recipes
  darkMode?: boolean;
}

const UploadPage: React.FC<UploadPageProps> = ({ user, recipes = [], setRecipes, darkMode = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Load recipe for editing if passed via state
  useEffect(() => {
    const state = location.state as { recipe?: Recipe };
    if (state?.recipe) {
      const r = state.recipe;
      setEditingId(r.id || null);
      setTitle(r.title || '');
      setDescription(r.description || '');
      setCategory(r.category || '');
      setImagePreview(r.imageUrl || null);
      setIngredients(r.ingredients?.join(', ') || '');
      setSteps(r.steps || '');
    }
  }, [location.state]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to submit a recipe.');
      return;
    }

    const newRecipe: Recipe = {
      id: editingId || uuidv4(),
      title,
      description,
      category,
      ingredients: ingredients.split(',').map((i) => i.trim()),
      steps,
      author: user.username,
      imageUrl: imagePreview || '',
    };

    // Save to localStorage
    const savedRecipes: Recipe[] = JSON.parse(localStorage.getItem('uploaded_recipes') || '[]');

    if (editingId) {
      const updatedRecipes = savedRecipes.map((r) => (r.id === editingId ? newRecipe : r));
      localStorage.setItem('uploaded_recipes', JSON.stringify(updatedRecipes));
      alert('Recipe updated successfully!');
    } else {
      savedRecipes.push(newRecipe);
      localStorage.setItem('uploaded_recipes', JSON.stringify(savedRecipes));
      alert('Recipe submitted successfully!');
    }

    // Update main App recipes so RecipesPage shows it immediately
    if (setRecipes) {
      const filteredRecipes = recipes.filter((r) => r.id !== newRecipe.id);
      setRecipes([...filteredRecipes, newRecipe]);
    }

    navigate('/my-recipes');
  };

  return (
    <div className={`upload-container ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="upload-title">{editingId ? 'Edit Recipe' : 'Upload a New Recipe'}</h1>
      {!user ? (
        <p>Please log in to upload a recipe.</p>
      ) : (
        <form className="upload-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            placeholder="Short description of the recipe"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a category</option>
            <option value="African Traditional Food">African Traditional Food</option>
            <option value="Desserts">Desserts</option>
            <option value="Italian">Italian</option>
            <option value="Indian">Indian</option>
            <option value="Mexican">Mexican</option>
            <option value="Other">Other</option>
          </select>

          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}

          <label>Ingredients (comma-separated)</label>
          <input
            type="text"
            placeholder="e.g. rice, tomatoes, onions"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />

          <label>Steps</label>
          <textarea
            placeholder="Explain the recipe steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
          />

          <button type="submit">{editingId ? 'Update Recipe' : 'Submit Recipe'}</button>
        </form>
      )}
    </div>
  );
};

export default UploadPage;
