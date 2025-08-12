// src/context/RecipeContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Recipe, User } from '../types';
import { v4 as uuidv4 } from 'uuid';  // import uuidv4

interface RecipeContextType {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
}

// Initialize context with undefined to force provider usage
const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: 'r1',
      title: 'Spaghetti Bolognese',
      description: 'Classic Italian pasta with rich meat sauce',
      category: 'Italian',
      author: 'Chef John',
      ingredients: ['Pasta', 'Beef', 'Tomato Sauce'],
      steps: 'Cook pasta. Prepare sauce. Mix together.',
      imageUrl: 'https://source.unsplash.com/featured/?pasta',
    },
    {
      id: 'r2',
      title: 'Chicken Curry',
      description: 'Spicy and creamy Indian chicken curry',
      category: 'Indian',
      author: 'Chef Anjali',
      ingredients: ['Chicken', 'Curry spices', 'Coconut milk'],
      steps: 'Cook chicken. Add spices and coconut milk. Simmer.',
      imageUrl: 'https://source.unsplash.com/featured/?curry',
    },
  ]);

  const login = (username: string) => {
    const newUser: User = {
      id: uuidv4(),    // generate unique id here
      username,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const addRecipe = (recipe: Recipe) => {
    setRecipes((prev) => [...prev, recipe]);
  };

  return (
    <RecipeContext.Provider value={{ user, login, logout, recipes, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

// Custom hook with safety check
export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipeContext must be used within a RecipeProvider');
  }
  return context;
};
