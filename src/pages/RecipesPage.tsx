import React, { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../types';

interface RecipesPageProps {
  recipes: Recipe[];
  searchQuery?: string; // receive search query from App
  darkMode?: boolean;   // <-- Add this
}

const categories = [
  'Breakfast',         
  'Italian',
  'Indian',
  'Chinese',
  'Mexican',
  'American',
  'South African',
  'Other',
  'Desserts',
];

const RecipesPage: React.FC<RecipesPageProps> = ({ recipes, searchQuery = '', darkMode = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [mostLoved, setMostLoved] = useState<Recipe[]>([]);

  // Filter recipes based on category & search
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

  // Compute Most Loved recipes
  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedRecipes') || '{}');
    const sorted = [...recipes].sort((a, b) => {
      const likesA = savedLikes[a.id] ? 1 : 0;
      const likesB = savedLikes[b.id] ? 1 : 0;
      return likesB - likesA; // Descending
    });
    setMostLoved(sorted.slice(0, 4)); // top 4 recipes
  }, [recipes]);

  return (
    <main style={{
      padding: '1.5rem 2rem',
      maxWidth: 1100,
      margin: '0 auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: darkMode ? '#1f2937' : '#fff',
      color: darkMode ? '#f0f0f0' : '#000'
    }}>
      <h2 style={{ marginBottom: '1rem', color: darkMode ? '#fbbf24' : '#5a3e36' }}>Most Loved Recipes ❤️</h2>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', justifyItems: 'center' }}>
        {mostLoved.length > 0 ? mostLoved.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} darkMode={darkMode} />)
          : <p>No loved recipes yet.</p>}
      </section>

      <Filter categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: darkMode ? '#fbbf24' : '#5a3e36' }}>All Recipes</h2>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', justifyItems: 'center' }}>
        {filteredRecipes.length > 0 ? filteredRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} darkMode={darkMode} />)
          : <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.2rem', color: darkMode ? '#ccc' : '#666', marginTop: '3rem' }}>No recipes found.</p>}
      </section>
    </main>
  );
};

export default RecipesPage;
