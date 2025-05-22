
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Recipe, Category, Ingredient, RecipeStep } from '../types/recipe';
import { mockRecipes } from '../data/mockData';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';

interface RecipesContextType {
  recipes: Recipe[];
  userRecipes: Recipe[];
  getRecipeById: (id: string) => Recipe | undefined;
  addRecipe: (recipe: Omit<Recipe, 'id' | 'author' | 'createdAt'>) => string;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => boolean;
  deleteRecipe: (id: string) => boolean;
  searchRecipes: (query: string) => Recipe[];
  filterRecipesByCategory: (category: Category) => Recipe[];
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const savedRecipes = localStorage.getItem('recipe_exchange_recipes');
    return savedRecipes ? JSON.parse(savedRecipes) : mockRecipes;
  });

  useEffect(() => {
    localStorage.setItem('recipe_exchange_recipes', JSON.stringify(recipes));
  }, [recipes]);

  const userRecipes = user 
    ? recipes.filter(recipe => recipe.author.id === user.id)
    : [];

  const getRecipeById = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  const addRecipe = (newRecipeData: Omit<Recipe, 'id' | 'author' | 'createdAt'>) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add a recipe",
        variant: "destructive",
      });
      return "";
    }

    const newId = Date.now().toString();
    const newRecipe: Recipe = {
      ...newRecipeData,
      id: newId,
      author: user,
      createdAt: new Date().toISOString(),
    };

    setRecipes(prevRecipes => [...prevRecipes, newRecipe]);
    
    toast({
      title: "Recipe added",
      description: "Your recipe has been added successfully",
    });
    
    return newId;
  };

  const updateRecipe = (id: string, recipeUpdates: Partial<Recipe>) => {
    const recipeIndex = recipes.findIndex(recipe => recipe.id === id);
    
    if (recipeIndex === -1) {
      toast({
        title: "Error",
        description: "Recipe not found",
        variant: "destructive",
      });
      return false;
    }

    const recipe = recipes[recipeIndex];
    
    // Check if the user is the author of the recipe
    if (user?.id !== recipe.author.id) {
      toast({
        title: "Error",
        description: "You can only edit your own recipes",
        variant: "destructive",
      });
      return false;
    }

    const updatedRecipe = {
      ...recipe,
      ...recipeUpdates,
      updatedAt: new Date().toISOString()
    };

    const updatedRecipes = [...recipes];
    updatedRecipes[recipeIndex] = updatedRecipe;
    
    setRecipes(updatedRecipes);
    
    toast({
      title: "Recipe updated",
      description: "Your recipe has been updated successfully",
    });
    
    return true;
  };

  const deleteRecipe = (id: string) => {
    const recipe = recipes.find(recipe => recipe.id === id);
    
    if (!recipe) {
      toast({
        title: "Error",
        description: "Recipe not found",
        variant: "destructive",
      });
      return false;
    }

    // Check if the user is the author of the recipe
    if (user?.id !== recipe.author.id) {
      toast({
        title: "Error",
        description: "You can only delete your own recipes",
        variant: "destructive",
      });
      return false;
    }

    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
    
    toast({
      title: "Recipe deleted",
      description: "Your recipe has been deleted successfully",
    });
    
    return true;
  };

  const searchRecipes = (query: string) => {
    if (!query.trim()) return recipes;
    
    const lowercaseQuery = query.toLowerCase();
    
    return recipes.filter(recipe => {
      const titleMatch = recipe.title.toLowerCase().includes(lowercaseQuery);
      const descriptionMatch = recipe.description.toLowerCase().includes(lowercaseQuery);
      const ingredientsMatch = recipe.ingredients.some(ingredient => 
        ingredient.name.toLowerCase().includes(lowercaseQuery)
      );
      
      return titleMatch || descriptionMatch || ingredientsMatch;
    });
  };

  const filterRecipesByCategory = (category: Category) => {
    return recipes.filter(recipe => recipe.categories.includes(category));
  };

  return (
    <RecipesContext.Provider value={{
      recipes,
      userRecipes,
      getRecipeById,
      addRecipe,
      updateRecipe,
      deleteRecipe,
      searchRecipes,
      filterRecipesByCategory
    }}>
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = (): RecipesContextType => {
  const context = useContext(RecipesContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipesProvider');
  }
  return context;
};
