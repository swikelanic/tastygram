export interface Recipe {
  id: string;
  title: string;
  category: string;
  author: string;
  ingredients: string[];
  steps: string;
  imageUrl?: string;
  description?: string;
  cookingTime?: number;
}

export interface User {
  id: string;
  username: string;
}
