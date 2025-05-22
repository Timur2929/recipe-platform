
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, Users, ChefHat, Edit, Trash, ArrowLeft } from 'lucide-react';
import { useRecipes } from '../context/RecipesContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getRecipeById, deleteRecipe } = useRecipes();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const recipe = id ? getRecipeById(id) : undefined;
  
  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container py-12 px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Recipe Not Found</h2>
            <p className="text-muted-foreground mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/">Go Back Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const { 
    title, description, image, prepTime, cookTime, servings, 
    difficulty, categories, ingredients, steps, author, createdAt 
  } = recipe;
  
  const totalTime = prepTime + cookTime;
  const isAuthor = user?.id === author.id;
  const formattedDate = new Date(createdAt).toLocaleDateString();
  
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

  const handleDelete = () => {
    if (id && deleteRecipe(id)) {
      navigate('/my-recipes');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Image */}
        <div className="relative w-full h-64 sm:h-96 md:h-[400px] overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="container">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(-1)}
                className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {categories.map((category, i) => (
                  <Badge key={i} className="bg-accent/90 text-accent-foreground">
                    {category}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">{title}</h1>
            </div>
          </div>
        </div>
        
        <div className="container px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recipe Info Column */}
            <div className="order-2 lg:order-1 lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Author */}
                <div className="flex items-center p-4 bg-muted rounded-lg">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={author.avatar} />
                    <AvatarFallback>{author.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{author.username}</div>
                    <div className="text-sm text-muted-foreground">Posted on {formattedDate}</div>
                  </div>
                </div>
                
                {/* Recipe Info */}
                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Prep Time</div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-accent" />
                      <span>{formatTime(prepTime)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Cook Time</div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-accent" />
                      <span>{formatTime(cookTime)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Total Time</div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-accent" />
                      <span>{formatTime(totalTime)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Servings</div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-accent" />
                      <span>{servings}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Difficulty</div>
                    <div className="flex items-center">
                      <ChefHat className="h-4 w-4 mr-2 text-accent" />
                      <span className="capitalize">{difficulty}</span>
                    </div>
                  </div>
                </div>
                
                {/* Ingredients */}
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Ingredients</h3>
                  <ul className="space-y-3">
                    {ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-baseline">
                        <span className="mr-2 text-accent">•</span>
                        <span>
                          {ingredient.amount} {ingredient.unit} {ingredient.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Author Controls */}
                {isAuthor && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/edit-recipe/${id}`)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="flex-1">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your recipe.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
            </div>
            
            {/* Main Content Column */}
            <div className="order-1 lg:order-2 lg:col-span-2">
              <div className="mb-6">
                <p className="text-lg">{description}</p>
              </div>
              
              <Separator className="my-8" />
              
              {/* Instructions */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Instructions</h2>
                <ol className="space-y-8">
                  {steps.map((step) => (
                    <li key={step.id} className="flex">
                      <div className="mr-4 mt-1">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-accent-foreground font-semibold">
                          {step.order}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="mb-2">{step.instruction}</p>
                        {step.image && (
                          <img
                            src={step.image}
                            alt={`Step ${step.order}`}
                            className="rounded-lg mt-4 w-full max-w-md"
                          />
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecipeDetailPage;
