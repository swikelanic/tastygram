import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Recipe, Review } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  darkMode?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, darkMode = false }) => {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  // Load like state from localStorage
  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedRecipes') || '{}');
    setLiked(!!savedLikes[recipe.id]);
  }, [recipe.id]);

  const toggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLiked((prev) => {
      const newState = !prev;
      const savedLikes = JSON.parse(localStorage.getItem('likedRecipes') || '{}');
      savedLikes[recipe.id] = newState;
      localStorage.setItem('likedRecipes', JSON.stringify(savedLikes));
      return newState;
    });
  };

  // Compute average rating
  const averageRating =
    recipe.reviews && recipe.reviews.length > 0
      ? (recipe.reviews.reduce((sum, r) => sum + r.rating, 0) / recipe.reviews.length).toFixed(1)
      : null;

  return (
    <Link
      to={`/recipe/${recipe.id}`} // <-- fixed route
      state={{ recipe }} // optional: pass recipe in state
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          maxWidth: 360,
          backgroundColor: darkMode ? '#2d2d2d' : '#fefefe',
          color: darkMode ? '#f0f0f0' : '#333',
          borderRadius: 16,
          boxShadow: hovered
            ? darkMode
              ? '0 12px 25px rgba(0, 0, 0, 0.5)'
              : '0 12px 25px rgba(0, 0, 0, 0.12)'
            : darkMode
            ? '0 4px 12px rgba(0,0,0,0.4)'
            : '0 4px 12px rgba(0, 0, 0, 0.08)',
          margin: '1.25rem',
          padding: '1.5rem',
          cursor: 'pointer',
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          transform: hovered ? 'translateY(-6px)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1.6rem', color: darkMode ? '#f0c6a0' : '#5a3e36' }}>
          {recipe.title}
        </h3>

        {recipe.imageUrl && (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            style={{
              width: '100%',
              borderRadius: 14,
              objectFit: 'cover',
              border: `2px solid ${darkMode ? '#555' : '#e6d8d1'}`,
              boxShadow: darkMode ? '0 4px 12px rgba(0,0,0,0.6)' : '0 4px 12px rgba(230, 216, 209, 0.5)',
              aspectRatio: '4 / 3',
            }}
            loading="lazy"
            decoding="async"
          />
        )}

        <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <p>
            <strong style={{ fontWeight: 600, color: darkMode ? '#f0c6a0' : '#7d5a50' }}>Category:</strong>{' '}
            {recipe.category || 'N/A'}
          </p>
        </div>

        <button
          onClick={toggleLike}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', alignSelf: 'flex-start' }}
          aria-label={liked ? 'Unlike recipe' : 'Like recipe'}
        >
          {liked ? '❤️' : '🤍'}
        </button>

        {averageRating && (
          <div style={{ marginTop: '0.5rem', borderTop: `1px solid ${darkMode ? '#555' : '#ddd'}`, paddingTop: '0.5rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              ⭐ {averageRating} ({recipe.reviews?.length} reviews)
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowReviews((prev) => !prev);
              }}
              style={{
                marginTop: '0.3rem',
                background: darkMode ? '#444' : '#f5f5f5',
                border: 'none',
                padding: '0.3rem 0.6rem',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: '0.8rem',
                color: darkMode ? '#f0f0f0' : '#000',
              }}
            >
              {showReviews ? 'Hide Reviews' : 'Show Reviews'}
            </button>

            {showReviews && recipe.reviews && (
              <div
                style={{
                  marginTop: '0.5rem',
                  maxHeight: '150px',
                  overflowY: 'auto',
                  padding: '0.3rem',
                  background: darkMode ? '#3a3a3a' : '#fafafa',
                  borderRadius: 6,
                }}
              >
                {recipe.reviews.map((r: Review, idx) => (
                  <div key={idx} style={{ marginBottom: '0.5rem', borderBottom: `1px solid ${darkMode ? '#555' : '#eee'}`, paddingBottom: '0.3rem' }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.85rem', color: darkMode ? '#f0c6a0' : '#5a3e36' }}>
                      {r.username}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.8rem' }}>⭐ {r.rating}</p>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: darkMode ? '#ddd' : '#555' }}>
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default RecipeCard;
