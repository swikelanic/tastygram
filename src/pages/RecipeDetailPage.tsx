import React from "react";
import { useParams, Link } from "react-router-dom";
import { Recipe } from "../types";
import './RecipeDetailPage.css';

interface RecipeDetailPageProps {
  recipes: Recipe[];
}

const RecipeDetailPage: React.FC<RecipeDetailPageProps> = ({ recipes }) => {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find((r) => r.id === id);

  // Debugging
  console.log("RecipeDetailPage component rendered");
  console.log("Route param id:", id);
  console.log("Loaded recipe:", recipe?.title);

  if (!recipe) {
    return <p className="recipe-not-found">Recipe not found</p>;
  }

  const stepList = recipe.steps?.split(/\.|\n/).map((s) => s.trim()).filter((s) => s.length > 0) ?? [];
  const hours = recipe.cookingTime ? Math.floor(recipe.cookingTime / 60) : 0;
  const minutes = recipe.cookingTime ? recipe.cookingTime % 60 : 0;

  return (
    <main className="recipe-page">
      {/* Hero Section */}
      <div className="recipe-hero">
        {recipe.imageUrl ? (
          <img src={recipe.imageUrl} alt={recipe.title} />
        ) : (
          <div className="recipe-hero-noimage">No image available</div>
        )}
        <div className="recipe-hero-overlay">
          <h1>{recipe.title}</h1>
          <p>{recipe.category || "Uncategorized"}</p>
        </div>
      </div>

      {/* Info Card */}
      <div className="recipe-info">
        <div>
          <p>Uploaded by</p>
          <p>{recipe.author || "Anonymous"}</p>
        </div>
        {recipe.cookingTime && (
          <div>
            <p>Cooking Time</p>
            <p>{hours > 0 ? `${hours}h ` : ""}{minutes} min</p>
          </div>
        )}
        <div>
          <p>Category</p>
          <p>{recipe.category || "Uncategorized"}</p>
        </div>
      </div>

      {/* Description */}
      {recipe.description && <p className="recipe-description">{recipe.description}</p>}

      {/* Ingredients & Steps */}
      <div className="recipe-grid">
        <div className="divider-horizontal"></div>
        <div className="divider-vertical"></div>

        {/* Ingredients */}
        <section className="recipe-section">
          <h2>Ingredients</h2>
          {recipe.ingredients.length > 0 ? (
            <ul>{recipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}</ul>
          ) : (
            <p>No ingredients listed.</p>
          )}
        </section>

        {/* Steps */}
        <section className="recipe-section">
          <h2>Steps</h2>
          {stepList.length > 0 ? (
            <ol>{stepList.map((step, idx) => <li key={idx}>{step}.</li>)}</ol>
          ) : (
            <p>No steps provided.</p>
          )}
        </section>
      </div>

      {/* Actions */}
      <div className="recipe-actions">
        <Link to="/recipes">← Back to Recipes</Link>
        <button onClick={() => window.print()}>🖨️ Print Recipe</button>
      </div>
    </main>
  );
};

export default RecipeDetailPage;
