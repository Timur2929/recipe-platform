
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Minus, Trash, ArrowLeft } from 'lucide-react';
import { useRecipes } from '../context/RecipesContext';
import { useAuth } from '../context/AuthContext';
import { Category, Ingredient, RecipeStep } from '../types/recipe';
import { categories } from '../data/mockData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EditRecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getRecipeById, updateRecipe } = useRecipes();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // State for recipe form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [prepTime, setPrepTime] = useState(15);
  const [cookTime, setCookTime] = useState(30);
  const [servings, setServings] = useState(4);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<RecipeStep[]>([]);
  
  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Load recipe data
  useEffect(() => {
    if (id) {
      const recipe = getRecipeById(id);
      
      if (recipe) {
        // Check if user is the author
        if (user?.id !== recipe.author.id) {
          navigate(`/recipe/${id}`);
          return;
        }
        
        setTitle(recipe.title);
        setDescription(recipe.description);
        setImage(recipe.image);
        setPrepTime(recipe.prepTime);
        setCookTime(recipe.cookTime);
        setServings(recipe.servings);
        setDifficulty(recipe.difficulty);
        setSelectedCategories(recipe.categories);
        setIngredients(recipe.ingredients);
        setSteps(recipe.steps);
      } else {
        navigate('/not-found');
      }
    }
  }, [id, getRecipeById, user, navigate]);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!image.trim()) newErrors.image = 'Image URL is required';
    if (prepTime <= 0) newErrors.prepTime = 'Prep time must be greater than 0';
    if (cookTime < 0) newErrors.cookTime = 'Cook time cannot be negative';
    if (servings <= 0) newErrors.servings = 'Servings must be greater than 0';
    if (selectedCategories.length === 0) newErrors.categories = 'Select at least one category';
    
    // Validate ingredients
    const validIngredients = ingredients.filter(i => i.name.trim() !== '');
    if (validIngredients.length === 0) {
      newErrors.ingredients = 'Add at least one ingredient';
    }
    
    // Validate steps
    const validSteps = steps.filter(s => s.instruction.trim() !== '');
    if (validSteps.length === 0) {
      newErrors.steps = 'Add at least one instruction step';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handlers for ingredients
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { id: `new-${Date.now()}`, name: '', amount: '', unit: '' }]);
  };
  
  const handleRemoveIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  
  const handleIngredientChange = (index: number, field: keyof Omit<Ingredient, 'id'>, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };
  
  // Handlers for steps
  const handleAddStep = () => {
    setSteps([...steps, { id: `new-${Date.now()}`, order: steps.length + 1, instruction: '', image: undefined }]);
  };
  
  const handleRemoveStep = (index: number) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    // Update order numbers
    newSteps.forEach((step, i) => {
      step.order = i + 1;
    });
    setSteps(newSteps);
  };
  
  const handleStepChange = (index: number, field: keyof Omit<RecipeStep, 'id' | 'order'>, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };
  
  // Handle category selection
  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !id) {
      return;
    }
    
    // Prepare ingredients
    const updatedIngredients = ingredients
      .filter(ing => ing.name.trim() !== '')
      .map((ing, index) => ({
        ...ing,
        id: ing.id.startsWith('new-') ? index.toString() : ing.id
      }));
    
    // Prepare steps
    const updatedSteps = steps
      .filter(step => step.instruction.trim() !== '')
      .map((step, index) => ({
        ...step,
        id: step.id.startsWith('new-') ? index.toString() : step.id,
        order: index + 1
      }));
    
    const success = updateRecipe(id, {
      title,
      description,
      image,
      prepTime,
      cookTime,
      servings,
      difficulty,
      categories: selectedCategories,
      ingredients: updatedIngredients,
      steps: updatedSteps,
    });
    
    if (success) {
      navigate(`/recipe/${id}`);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container px-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-3xl font-bold mb-8">Edit Recipe</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update basic details about your recipe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Recipe Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Chocolate Chip Cookies"
                  />
                  {errors.title && <p className="text-destructive text-sm">{errors.title}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe your recipe"
                    rows={3}
                  />
                  {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Enter a URL for your recipe image"
                  />
                  {errors.image && <p className="text-destructive text-sm">{errors.image}</p>}
                  {image && (
                    <div className="mt-2">
                      <img 
                        src={image} 
                        alt="Recipe preview" 
                        className="h-40 w-full object-cover rounded-md"
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/600x400?text=Image+Preview';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prepTime">Prep Time (minutes)</Label>
                    <Input
                      id="prepTime"
                      type="number"
                      min="0"
                      value={prepTime}
                      onChange={(e) => setPrepTime(parseInt(e.target.value) || 0)}
                    />
                    {errors.prepTime && <p className="text-destructive text-sm">{errors.prepTime}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cookTime">Cook Time (minutes)</Label>
                    <Input
                      id="cookTime"
                      type="number"
                      min="0"
                      value={cookTime}
                      onChange={(e) => setCookTime(parseInt(e.target.value) || 0)}
                    />
                    {errors.cookTime && <p className="text-destructive text-sm">{errors.cookTime}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="servings">Servings</Label>
                    <Input
                      id="servings"
                      type="number"
                      min="1"
                      value={servings}
                      onChange={(e) => setServings(parseInt(e.target.value) || 1)}
                    />
                    {errors.servings && <p className="text-destructive text-sm">{errors.servings}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={difficulty}
                    onValueChange={(value) => setDifficulty(value as 'easy' | 'medium' | 'hard')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            {/* Categories Card */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Select all categories that apply to your recipe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className="capitalize cursor-pointer"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.categories && <p className="text-destructive text-sm mt-2">{errors.categories}</p>}
              </CardContent>
            </Card>
            
            {/* Ingredients Card */}
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
                <CardDescription>List all ingredients needed for your recipe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="w-1/4">
                      <Label htmlFor={`amount-${index}`}>Amount</Label>
                      <Input
                        id={`amount-${index}`}
                        value={ingredient.amount}
                        onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                        placeholder="e.g., 1/2"
                      />
                    </div>
                    <div className="w-1/4">
                      <Label htmlFor={`unit-${index}`}>Unit</Label>
                      <Input
                        id={`unit-${index}`}
                        value={ingredient.unit}
                        onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                        placeholder="e.g., cup"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`ingredient-${index}`}>Ingredient</Label>
                      <Input
                        id={`ingredient-${index}`}
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                        placeholder="e.g., flour"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveIngredient(index)}
                      disabled={ingredients.length === 1}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddIngredient}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Ingredient
                </Button>
                
                {errors.ingredients && <p className="text-destructive text-sm">{errors.ingredients}</p>}
              </CardContent>
            </Card>
            
            {/* Instructions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
                <CardDescription>Add step-by-step instructions for your recipe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="space-y-2 p-4 border rounded-md">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`step-${index}`}>Step {step.order}</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveStep(index)}
                        disabled={steps.length === 1}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                    <Textarea
                      id={`step-${index}`}
                      value={step.instruction}
                      onChange={(e) => handleStepChange(index, 'instruction', e.target.value)}
                      placeholder={`Describe step ${step.order}`}
                      rows={3}
                    />
                    <div className="space-y-2">
                      <Label htmlFor={`step-image-${index}`}>Step Image URL (optional)</Label>
                      <Input
                        id={`step-image-${index}`}
                        value={step.image || ''}
                        onChange={(e) => handleStepChange(index, 'image', e.target.value)}
                        placeholder="Add an image URL for this step (optional)"
                      />
                    </div>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddStep}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
                
                {errors.steps && <p className="text-destructive text-sm">{errors.steps}</p>}
              </CardContent>
            </Card>
            
            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EditRecipePage;
