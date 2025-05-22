
import React from 'react';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types/recipe';

interface RecipeGridProps {
  recipes: Recipe[];
  emptyMessage?: string;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ 
  recipes, 
  emptyMessage = "No recipes found" 
}) => {
  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeGrid;
