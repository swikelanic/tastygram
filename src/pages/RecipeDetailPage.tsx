import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Recipe } from "../types";
import './RecipeDetailPage.css';

interface RecipeDetailPageProps {
  recipes: Recipe[];
}

const RecipeDetailPage: React.FC<RecipeDetailPageProps> = ({ recipes }) => {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find((r) => r.id === id);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!recipe) return;
    const savedLikes = JSON.parse(localStorage.getItem('likedRecipes') || '{}');
    setLiked(!!savedLikes[recipe.id]);
  }, [recipe]);

  const toggleLike = () => {
    if (!recipe) return;
    setLiked((prev) => {
      const newState = !prev;
      const savedLikes = JSON.parse(localStorage.getItem('likedRecipes') || '{}');
      savedLikes[recipe.id] = newState;
      localStorage.setItem('likedRecipes', JSON.stringify(savedLikes));
      return newState;
    });
  };

  if (!recipe) return <p className="recipe-not-found">Recipe not found</p>;

  const stepList = recipe.steps?.split(/\.|\n/).map((s) => s.trim()).filter((s) => s.length > 0) ?? [];

  return (
    <main className="recipe-page">
      <div className="recipe-hero">
        {recipe.imageUrl ? <img src={recipe.imageUrl} alt={recipe.title} /> : <div>No image available</div>}
        <div className="recipe-hero-overlay">
          <h1>{recipe.title}</h1>
          <p>{recipe.category || "Uncategorized"}</p>
        </div>
      </div>

      <div className="recipe-info">
        <div>
          <p>Uploaded by</p>
          <p>{recipe.author || "Anonymous"}</p>
        </div>
        <div>
          <p>Category</p>
          <p>{recipe.category || "Uncategorized"}</p>
        </div>
      </div>

      {recipe.description && <p className="recipe-description">{recipe.description}</p>}

      <div className="recipe-grid">
        <section className="recipe-section">
          <h2>Ingredients</h2>
          {recipe.ingredients.length > 0 ? <ul>{recipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}</ul> : <p>No ingredients listed.</p>}
        </section>

        <section className="recipe-section">
          <h2>Steps</h2>
          {stepList.length > 0 ? <ol>{stepList.map((step, idx) => <li key={idx}>{step}.</li>)}</ol> : <p>No steps provided.</p>}
        </section>
      </div>

      {/* Heart button below */}
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={toggleLike}
          style={{ fontSize: '2rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {liked ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="recipe-actions">
        <Link to="/recipes">← Back to Recipes</Link>
        <button onClick={() => window.print()}>🖨️ Print Recipe</button>
      </div>
    </main>
  );
};

export default RecipeDetailPage;
