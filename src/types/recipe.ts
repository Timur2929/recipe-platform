
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export type Category = 
  | 'breakfast'
  | 'lunch' 
  | 'dinner'
  | 'dessert'
  | 'vegan'
  | 'vegetarian'
  | 'gluten-free'
  | 'dairy-free'
  | 'quick'
  | 'appetizer'
  | 'soup'
  | 'salad'
  | 'main'
  | 'side'
  | 'drink';

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
}

export interface RecipeStep {
  id: string;
  order: number;
  instruction: string;
  image?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  categories: Category[];
  ingredients: Ingredient[];
  steps: RecipeStep[];
  author: User;
  createdAt: string;
  updatedAt?: string;
}
