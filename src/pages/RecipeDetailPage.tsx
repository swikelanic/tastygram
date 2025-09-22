// src/pages/RecipeDetailPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Recipe } from "../types";
import './RecipeDetailPage.css';

interface RecipeDetailPageProps {
  recipes: Recipe[];
  darkMode: boolean; // <-- Add this
}

interface Review {
  username: string;
  rating: number;
  comment: string;
}

const RecipeDetailPage: React.FC<RecipeDetailPageProps> = ({ recipes, darkMode }) => {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find((r) => r.id === id);

  const [liked, setLiked] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!recipe) return;
    const savedLikes = JSON.parse(localStorage.getItem('likedRecipes') || '{}');
    setLiked(!!savedLikes[recipe.id]);

    const savedReviews = JSON.parse(localStorage.getItem(`reviews_${recipe.id}`) || "[]");
    setReviews(savedReviews);
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

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !comment) return;

    const newReview = { username, rating, comment };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${recipe?.id}`, JSON.stringify(updatedReviews));

    setUsername("");
    setComment("");
    setRating(5);
  };

  if (!recipe) return <p className={`recipe-not-found ${darkMode ? 'dark' : ''}`}>Recipe not found</p>;

  const stepList = recipe.steps?.split(/\.|\n/).map((s) => s.trim()).filter((s) => s.length > 0) ?? [];

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <main className={`recipe-page ${darkMode ? 'dark' : ''}`}>
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

      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={toggleLike}
          style={{ fontSize: '2rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {liked ? '❤️' : '🤍'}
        </button>
      </div>

      <section className="recipe-reviews" style={{ marginTop: '2rem' }}>
        <h2>Reviews {averageRating && <span>⭐ {averageRating}</span>}</h2>

        {reviews.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {reviews.map((rev, idx) => (
              <li key={idx} style={{ borderBottom: '1px solid #ddd', padding: '0.5rem 0' }}>
                <strong>{rev.username}</strong> ⭐ {rev.rating}
                <p>{rev.comment}</p>
              </li>
            ))}
          </ul>
        ) : <p>No reviews yet. Be the first to review!</p>}

        <form onSubmit={submitReview} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} ⭐</option>)}
          </select>
          <textarea
            placeholder="Write your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button type="submit" style={{ alignSelf: 'flex-start' }}>Submit Review</button>
        </form>
      </section>

      <div className="recipe-actions" style={{ marginTop: '2rem' }}>
        <Link to="/recipes">← Back to Recipes</Link>
        <button onClick={() => window.print()}>🖨️ Print Recipe</button>
      </div>
    </main>
  );
};

export default RecipeDetailPage;
