// src/context/RecipeContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Recipe, User } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface RecipeContextType {
  user: User | null;
  login: (username: string) => void;
  signup: (username: string) => void;
  logout: () => void;
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
}

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

  // Login existing user
  const login = (username: string) => {
    const existingUser: User = {
      id: uuidv4(),
      username,
    };
    setUser(existingUser);
  };

  // Signup new user
  const signup = (username: string) => {
    const newUser: User = {
      id: uuidv4(),
      username,
    };
    setUser(newUser);
  };

  // Logout user
  const logout = () => {
    setUser(null);
  };

  // Add a recipe and associate with current user
  const addRecipe = (recipe: Recipe) => {
    if (!user) return; // only logged-in users can upload

    const newRecipe: Recipe = {
      ...recipe,
      id: uuidv4(),
      author: user.username,
    };

    setRecipes((prev) => [...prev, newRecipe]);
  };

  return (
    <RecipeContext.Provider
      value={{ user, login, signup, logout, recipes, addRecipe }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

// Custom hook for consuming context
export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipeContext must be used within a RecipeProvider');
  }
  return context;
};