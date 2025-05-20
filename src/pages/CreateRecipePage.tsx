
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const CreateRecipePage: React.FC = () => {
  const { addRecipe } = useRecipes();
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
  const [ingredients, setIngredients] = useState<Omit<Ingredient, 'id'>[]>([
    { name: '', amount: '', unit: '' }
  ]);
  const [steps, setSteps] = useState<Omit<RecipeStep, 'id'>[]>([
    { order: 1, instruction: '', image: undefined }
  ]);
  
  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Redirect if not authenticated
  React.useEffect(() => {
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
    setIngredients([...ingredients, { name: '', amount: '', unit: '' }]);
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
    setSteps([...steps, { order: steps.length + 1, instruction: '', image: undefined }]);
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
    
    if (!validateForm()) {
      return;
    }
    
    // Prepare ingredients with IDs
    const ingredientsWithIds = ingredients
      .filter(ing => ing.name.trim() !== '')
      .map((ing, index) => ({
        ...ing,
        id: index.toString()
      }));
    
    // Prepare steps with IDs
    const stepsWithIds = steps
      .filter(step => step.instruction.trim() !== '')
      .map((step, index) => ({
        ...step,
        id: index.toString(),
        order: index + 1
      }));
    
    const newRecipeId = addRecipe({
      title,
      description,
      image,
      prepTime,
      cookTime,
      servings,
      difficulty,
      categories: selectedCategories,
      ingredients: ingredientsWithIds,
      steps: stepsWithIds,
    });
    
    if (newRecipeId) {
      navigate(`/recipe/${newRecipeId}`);
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
            Назад
          </Button>
          
          <h1 className="text-3xl font-bold mb-8">Создать новый рецепт</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Основная информация</CardTitle>
                <CardDescription>Добавьте основные сведения о вашем рецепте</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Название рецепта</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Пицца Деревенская"
                  />
                  {errors.title && <p className="text-destructive text-sm">{errors.title}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Фантастическая классика, вкуснейшая пицца на вашем столе!"
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
                    placeholder="Введите URL-адрес изображения вашего рецепта"
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
                    <Label htmlFor="prepTime">Время подготовки (в минутах)</Label>
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
                    <Label htmlFor="cookTime">Время готовки (в минутах)</Label>
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
                    <Label htmlFor="servings">Порции</Label>
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
                  <Label htmlFor="difficulty">Сложность</Label>
                  <Select
                    value={difficulty}
                    onValueChange={(value) => setDifficulty(value as 'easy' | 'medium' | 'hard')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Легко</SelectItem>
                      <SelectItem value="medium">Средне</SelectItem>
                      <SelectItem value="hard">Тяжело</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            {/* Categories Card */}
            <Card>
              <CardHeader>
                <CardTitle>Категории</CardTitle>
                <CardDescription>Выберите все категории, которые относятся к вашему рецепту</CardDescription>
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
                <CardTitle>Ингридиенты</CardTitle>
                <CardDescription>Перечислите все ингредиенты, необходимые для вашего рецепта</CardDescription>
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
                      <Label htmlFor={`ingredient-${index}`}>Ингридиент</Label>
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
                  Добавить ингридиент
                </Button>
                
                {errors.ingredients && <p className="text-destructive text-sm">{errors.ingredients}</p>}
              </CardContent>
            </Card>
            
            {/* Instructions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Инструкция</CardTitle>
                <CardDescription>Добавьте пошаговые инструкции к вашему рецепту</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="space-y-2 p-4 border rounded-md">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`step-${index}`}>Шаг {step.order}</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveStep(index)}
                        disabled={steps.length === 1}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Убрать
                      </Button>
                    </div>
                    <Textarea
                      id={`step-${index}`}
                      value={step.instruction}
                      onChange={(e) => handleStepChange(index, 'instruction', e.target.value)}
                      placeholder={`Опишите шаг ${step.order}`}
                      rows={3}
                    />
                    <div className="space-y-2">
                      <Label htmlFor={`step-image-${index}`}>Шаг Image URL (optional)</Label>
                      <Input
                        id={`step-image-${index}`}
                        value={step.image || ''}
                        onChange={(e) => handleStepChange(index, 'image', e.target.value)}
                        placeholder="Добавьте URL-адрес изображения для этого шага (необязательно)"
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
                  Добавить шаг
                </Button>
                
                {errors.steps && <p className="text-destructive text-sm">{errors.steps}</p>}
              </CardContent>
            </Card>
            
            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Создать рецепт
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateRecipePage;
