import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Recipe } from '../types';

interface RecipeDetailPageProps {
  recipes: Recipe[];
}

const RecipeDetailPage: React.FC<RecipeDetailPageProps> = ({ recipes }) => {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe)
    return (
      <p className="text-red-600 text-center mt-6">Recipe not found</p>
    );

  // Split steps by newline for numbered display
  const stepList = recipe.steps.split('\n').filter((s) => s.trim() !== '');

  // Calculate hours and minutes from cookingTime (in minutes)
  const hours = recipe.cookingTime ? Math.floor(recipe.cookingTime / 60) : 0;
  const minutes = recipe.cookingTime ? recipe.cookingTime % 60 : 0;

  return (
    <div className="max-w-3xl mx-auto bg-yellow-100 p-6 rounded shadow mt-6">
      <h1 className="text-3xl font-bold text-yellow-900 mb-4">{recipe.title}</h1>

      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full rounded mb-4"
        />
      )}

      {recipe.description && <p className="mb-4 text-yellow-800">{recipe.description}</p>}

      <p className="text-sm text-yellow-700 mb-2">Category: {recipe.category}</p>
      <p className="text-sm text-yellow-700 mb-4">Uploaded by: {recipe.author}</p>

      {recipe.cookingTime && (
        <p className="font-semibold mb-4">
          Total Cooking Time: {hours > 0 ? `${hours}h ` : ''}{minutes}min
        </p>
      )}

      <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-2">Steps:</h3>
      <ol className="list-decimal list-inside mb-4">
        {stepList.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>

      <Link to="/recipes" className="underline text-yellow-800 mt-6 block">
        Back to Recipes
      </Link>
    </div>
  );
};

export default RecipeDetailPage;
