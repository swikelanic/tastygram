// src/components/UploadRecipeForm.tsx

import React, { useState } from 'react';
import { useRecipeContext } from '../context/RecipeContext';
import { Recipe } from '../types';
import { v4 as uuidv4 } from 'uuid';

const categories = ['Italian', 'Indian', 'Chinese', 'Mexican', 'American', 'Other'];

const UploadRecipeForm = () => {
  const { addRecipe, user } = useRecipeContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');   // <-- added description state
  const [category, setCategory] = useState(categories[0]);
  const [author, setAuthor] = useState(user ? user.username : '');
  const [ingredients, setIngredients] = useState(''); // comma-separated string
  const [steps, setSteps] = useState(''); // single string describing steps
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Updated validation to include description
    if (!title.trim() || !description.trim() || !author.trim() || !ingredients.trim() || !steps.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    const newRecipe: Recipe = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),    // <-- include description here
      category,
      author: author.trim(),
      ingredients: ingredients
        .split(',')
        .map((ing) => ing.trim())
        .filter((ing) => ing.length > 0),
      steps: steps.trim(),
      imageUrl: imageUrl.trim() || undefined,
    };

    addRecipe(newRecipe);

    // Reset form fields
    setTitle('');
    setDescription('');          // <-- reset description
    setCategory(categories[0]);
    setIngredients('');
    setSteps('');
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Upload a New Recipe</h2>

      <label>
        Title:<br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
      </label>

      <label>
        Description:<br /> {/* Added description input */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={2}
          style={styles.textarea}
          placeholder="Short description of the recipe"
        />
      </label>

      <label>
        Category:<br />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <label>
        Author:<br />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          style={styles.input}
          disabled={!!user} // disable if user logged in
        />
      </label>

      <label>
        Ingredients (comma separated):<br />
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          rows={3}
          style={styles.textarea}
          placeholder="e.g. sugar, flour, eggs"
        />
      </label>

      <label>
        Steps:<br />
        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          required
          rows={4}
          style={styles.textarea}
          placeholder="Describe the preparation steps"
        />
      </label>

      <label>
        Image URL (optional):<br />
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={styles.input}
          placeholder="https://example.com/image.jpg"
        />
      </label>

      <button type="submit" style={styles.button}>
        Add Recipe
      </button>
    </form>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    maxWidth: '500px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '1rem',
  },
  select: {
    width: '100%',
    padding: '8px',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    fontSize: '1rem',
    resize: 'vertical',
  },
  button: {
    padding: '10px',
    fontSize: '1.1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default UploadRecipeForm;
