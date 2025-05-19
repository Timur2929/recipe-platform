
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ChefHat } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { id, title, description, image, prepTime, cookTime, servings, difficulty, categories, author, ingredients } = recipe;
  
  const totalTime = prepTime + cookTime;
  
  // Format time display
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes 
      ? `${hours} hr ${remainingMinutes} min` 
      : `${hours} hr`;
  };

  return (
    <Link to={`/recipe/${id}`} className="recipe-card">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="recipe-img"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {difficulty}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-1">
          {categories.slice(0, 3).map((category, i) => (
            <span key={i} className="category-badge bg-accent/10 text-accent-foreground">
              {category}
            </span>
          ))}
          {categories.length > 3 && (
            <span className="category-badge bg-secondary text-secondary-foreground">
              +{categories.length - 3}
            </span>
          )}
        </div>
        
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatTime(totalTime)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{servings}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="h-4 w-4" />
            <span>{ingredients.length} ingredients</span>
          </div>
        </div>
        
        <div className="flex items-center mt-auto">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{author.username}</span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
