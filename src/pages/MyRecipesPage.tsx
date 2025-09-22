import React, { useEffect, useState } from 'react';
import { Recipe, User } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import './MyRecipesPage.css';

interface MyRecipesPageProps {
  user?: User | null;       // allow null/undefined
  darkMode?: boolean;       // optional dark mode prop
}

const MyRecipesPage: React.FC<MyRecipesPageProps> = ({ user, darkMode = false }) => {
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return; // safety check
    const savedRecipes: Recipe[] = JSON.parse(localStorage.getItem('uploaded_recipes') || '[]');
    const userRecipes = savedRecipes.filter(r => r.author === user.username);
    setMyRecipes(userRecipes);
  }, [user]);

  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    const savedRecipes: Recipe[] = JSON.parse(localStorage.getItem('uploaded_recipes') || '[]');
    const updatedRecipes = savedRecipes.filter(r => r.id !== id);
    localStorage.setItem('uploaded_recipes', JSON.stringify(updatedRecipes));

    setMyRecipes(myRecipes.filter(r => r.id !== id));
  };

  const handleEdit = (recipe: Recipe) => {
    // Send the recipe in state as 'recipe' to match UploadPage expectation
    navigate('/upload', { state: { recipe } });
  };

  if (!user) {
    return (
      <main className={`my-recipes-page ${darkMode ? 'dark-mode' : ''}`}>
        <p>Please <Link to="/login">log in</Link> to view your recipes.</p>
      </main>
    );
  }

  return (
    <main className={`my-recipes-page ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="my-recipes-title">{user.username}'s Uploaded Recipes</h1>

      {myRecipes.length === 0 ? (
        <p className="no-recipes-msg">
          You haven't uploaded any recipes yet. <Link to="/upload">Upload one now!</Link>
        </p>
      ) : (
        <div className="recipes-grid">
          {myRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              {recipe.imageUrl ? (
                <img src={recipe.imageUrl} alt={recipe.title} className="recipe-card-img" />
              ) : (
                <div className="recipe-card-img placeholder">No Image</div>
              )}
              <div className="recipe-card-body">
                <h2 className="recipe-card-title">{recipe.title}</h2>
                <p className="recipe-card-category">{recipe.category || 'Uncategorized'}</p>
                <p className="recipe-card-description">{recipe.description}</p>
                <div className="recipe-card-actions">
                  <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
                    View
                  </Link>
                  <button
                    className="recipe-card-btn edit-btn"
                    onClick={() => handleEdit(recipe)}
                  >
                    Edit
                  </button>
                  <button
                    className="recipe-card-btn delete-btn"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MyRecipesPage;
