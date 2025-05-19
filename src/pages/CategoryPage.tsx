import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecipes } from '../context/RecipesContext';
import { Category } from '../types/recipe';
import { categories } from '../data/mockData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeGrid from '../components/RecipeGrid';
import CategoryFilter from '../components/CategoryFilter';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const { recipes, filterRecipesByCategory } = useRecipes();
  
  // Validate that category is a valid category or undefined (for all categories)
  const validCategory = category as Category | undefined;
  
  // If category is provided, filter recipes by that category
  // Otherwise, show all recipes
  const displayedRecipes = validCategory 
    ? filterRecipesByCategory(validCategory)
    : recipes;
  
  const pageTitle = validCategory 
    ? `${validCategory.charAt(0).toUpperCase() + validCategory.slice(1)} Recipes`
    : 'All Categories';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container px-4">
          <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>
          
          <CategoryFilter selectedCategory={validCategory} />
          
          <RecipeGrid 
            recipes={displayedRecipes}
            emptyMessage={validCategory 
              ? `No recipes found in the ${validCategory} category` 
              : "No recipes found"
            }
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
