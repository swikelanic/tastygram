import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import { Recipe } from './types';

// If you want to import images directly, uncomment these and update imageUrl below:
// import carbonara from './assets/carbonara.jpg';
// import foods from './assets/foods.jpg';

const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with eggs, cheese, pancetta, and pepper.',
    category: 'Italian',
    imageUrl: '/assets/carbonara.jpg', // or use carbonara if imported
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan Cheese', 'Black Pepper'],
    steps: 'Cook pasta. Fry pancetta. Mix eggs and cheese. Combine all.',
    author: 'Chef Luigi',
  },
  {
    id: '2',
    title: 'Butter Chicken',
    description: 'Rich and creamy Indian chicken curry.',
    category: 'Indian',
    imageUrl: '/assets/foods.jpg', // or use foods if imported
    ingredients: ['Chicken', 'Butter', 'Tomatoes', 'Cream', 'Spices'],
    steps: 'Marinate chicken. Cook sauce. Combine and simmer.',
    author: 'Chef Priya',
  },
  // Add more recipes here
];

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        {/* Pass only recipes prop here */}
        <Route path="/recipes" element={<RecipesPage recipes={sampleRecipes} />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
