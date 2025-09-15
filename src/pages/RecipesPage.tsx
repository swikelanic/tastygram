import React, { useState } from 'react';
import Filter from '../components/Filter';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../types';

interface RecipesPageProps {
  recipes: Recipe[];
}

const categories = [
  'Italian',
  'Indian',
  'Chinese',
  'Mexican',
  'American',
  'South African',
  'Other',
  'Desserts',
];

const RecipesPage: React.FC<RecipesPageProps> = ({ recipes }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredRecipes = selectedCategory
    ? recipes.filter(
        (r) => r.category?.toLowerCase() === selectedCategory.toLowerCase()
      )
    : recipes;

  return (
    <main
      style={{
        padding: '1.5rem 2rem',
        maxWidth: 1100,
        margin: '0 auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <section
        style={{
          marginTop: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          justifyItems: 'center',
        }}
      >
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              fontSize: '1.2rem',
              color: '#666',
              marginTop: '3rem',
            }}
          >
            No recipes found for "{selectedCategory}".
          </p>
        )}
      </section>
    </main>
  );
};

export default RecipesPage;
