import React, { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../types';

interface RecipesPageProps {
  recipes: Recipe[];
  searchQuery?: string; // receive search query from App
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

const RecipesPage: React.FC<RecipesPageProps> = ({ recipes, searchQuery = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  // ✅ Update filtered recipes whenever search or category changes
  useEffect(() => {
    let updated = recipes;

    if (selectedCategory) {
      updated = updated.filter(
        (r) => r.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery) {
      updated = updated.filter((r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRecipes(updated);
  }, [selectedCategory, searchQuery, recipes]);

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
            No recipes found.
          </p>
        )}
      </section>
    </main>
  );
};

export default RecipesPage;
