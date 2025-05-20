
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useRecipes } from '../context/RecipesContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeGrid from '../components/RecipeGrid';
import { Button } from '@/components/ui/button';

const MyRecipesPage: React.FC = () => {
  const { userRecipes } = useRecipes();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-3xl font-bold">Мои рецепты</h1>
            <Button asChild className="mt-4 sm:mt-0">
              <Link to="/create">
                <PlusCircle className="h-4 w-4 mr-2" />
                Добавить новый рецепт
              </Link>
            </Button>
          </div>
          
          <RecipeGrid
            recipes={userRecipes}
            emptyMessage="Вы еще не создали ни одного рецепта. Нажмите 'Добавить новый рецепт', чтобы начать!"
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyRecipesPage;
