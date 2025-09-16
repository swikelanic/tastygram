import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [hovered, setHovered] = React.useState(false);

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
        aria-label={`Recipe card for ${recipe.title}`}
      >
        {/* Title */}
        <h3
          style={{
            margin: 0,
            fontWeight: 700,
            fontSize: '1.6rem',
            color: '#5a3e36',
            letterSpacing: '0.02em',
            lineHeight: 1.2,
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
            lineHeight: 1.4,
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
          {/* Ingredients removed to keep them hidden on card */}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;  