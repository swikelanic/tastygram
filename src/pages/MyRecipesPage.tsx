import React, { useEffect, useState } from 'react';
import { Recipe, User } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import './MyRecipesPage.css';

interface MyRecipesPageProps {
  user?: User | null;
  darkMode?: boolean;
  recipes: Recipe[]; // shared from App.tsx
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>; // allow updates to main recipes
}

const MyRecipesPage: React.FC<MyRecipesPageProps> = ({ user, darkMode = false, recipes, setRecipes }) => {
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  // Filter recipes uploaded by this user
  useEffect(() => {
    if (!user) return;
    const userRecipes = recipes.filter(r => r.author === user.username);
    setMyRecipes(userRecipes);
  }, [user, recipes]);

  // Delete recipe
  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    const updatedRecipes = recipes.filter(r => r.id !== id);
    setRecipes(updatedRecipes); // update App.tsx state
    setMyRecipes(myRecipes.filter(r => r.id !== id)); // update local view

    // Update only uploaded recipes in localStorage
    const uploadedRecipes = updatedRecipes.filter(r => r.author === user?.username);
    localStorage.setItem('uploaded_recipes', JSON.stringify(uploadedRecipes));
  };

  // Edit recipe
  const handleEdit = (recipe: Recipe) => {
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
                  <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">View</Link>
                  <button className="recipe-card-btn edit-btn" onClick={() => handleEdit(recipe)}>Edit</button>
                  <button className="recipe-card-btn delete-btn" onClick={() => handleDelete(recipe.id)}>Delete</button>
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
