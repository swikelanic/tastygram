import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);

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

  return (
    <Link
      to={`/recipes/${recipe.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          maxWidth: 360,
          backgroundColor: '#fefefe',
          borderRadius: 16,
          boxShadow: hovered
            ? '0 12px 25px rgba(0, 0, 0, 0.12)'
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
          color: '#333',
        }}
      >
        {/* Title */}
        <h3
          style={{
            margin: 0,
            fontWeight: 700,
            fontSize: '1.6rem',
            color: '#5a3e36',
          }}
        >
          {recipe.title}
        </h3>

        {/* Recipe Image */}
        {recipe.imageUrl && (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            style={{
              width: '100%',
              borderRadius: 14,
              objectFit: 'cover',
              border: '2px solid #e6d8d1',
              boxShadow: '0 4px 12px rgba(230, 216, 209, 0.5)',
              aspectRatio: '4 / 3',
            }}
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Recipe Info */}
        <div
          style={{
            fontSize: '0.9rem',
            color: '#6b5b54',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
          }}
        >
          <p>
            <strong style={{ fontWeight: 600, color: '#7d5a50' }}>
              Category:
            </strong>{' '}
            {recipe.category || 'N/A'}
          </p>
        </div>

        {/* Heart Button below */}
        <button
          onClick={toggleLike}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
            alignSelf: 'flex-start',
          }}
          aria-label={liked ? 'Unlike recipe' : 'Like recipe'}
        >
          {liked ? '❤️' : '🤍'}
        </button>
      </div>
    </Link>
  );
};

export default RecipeCard;
