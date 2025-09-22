// src/pages/UploadPage.tsx
import React, { useState } from 'react';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';
import './UploadPage.css';

interface UploadPageProps {
  user: User;
}

const UploadPage: React.FC<UploadPageProps> = ({ user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Preview the selected image
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // For now, just log the data
    console.log({
      title,
      description,
      category,
      imageFile,
      ingredients: ingredients.split(',').map((i) => i.trim()),
      steps,
      author: user.username,
    });

    alert('Recipe submitted successfully!');
    navigate('/recipes'); // Redirect to recipes page
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Upload a New Recipe</h1>
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

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default UploadPage;
