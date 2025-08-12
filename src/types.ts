// src/types.ts

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string; // optional
  category: string;
  author: string;
  ingredients: string[];
  steps: string;
  cookingTime?: number;
}

// Add this User interface and export it
export interface User {
  id: string;
  username: string;
}
