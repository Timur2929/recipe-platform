
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChefHat, Utensils, BookOpen } from 'lucide-react';
import { useRecipes } from '../context/RecipesContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeGrid from '../components/RecipeGrid';
import CategoryFilter from '../components/CategoryFilter';
import { Button } from '@/components/ui/button';

const HomePage: React.FC = () => {
  const { recipes } = useRecipes();
  
  // Get the latest recipes (up to 8)
  const latestRecipes = [...recipes]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative">
          <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')",
              filter: "brightness(0.6)"
            }}
          />
          
          <div className="relative z-10 container px-4 py-24 md:py-32 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Discover & Share Amazing Recipes
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl">
              Join our community of food enthusiasts to find inspiration and share your culinary creations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/create">
                  <ChefHat className="h-5 w-5 mr-2" />
                  Add Your Recipe
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                <Link to="/categories">
                  <Utensils className="h-5 w-5 mr-2" />
                  Browse Recipes
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Latest Recipes Section */}
        <section className="py-16 container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Latest Recipes</h2>
            <Button asChild variant="ghost">
              <Link to="/categories" className="flex items-center">
                <span>View All</span>
                <BookOpen className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <RecipeGrid recipes={latestRecipes} />
        </section>
        
        {/* Categories Section */}
        <section className="bg-muted py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Explore by Category</h2>
            <CategoryFilter />
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Why Join Recipe Exchange?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <ChefHat className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Your Recipes</h3>
              <p className="text-muted-foreground">Upload and share your favorite recipes with our community of food enthusiasts.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Utensils className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover New Dishes</h3>
              <p className="text-muted-foreground">Find inspiration with our diverse collection of recipes from around the world.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Your Favorites</h3>
              <p className="text-muted-foreground">Create your personal collection of recipes you love for easy access anytime.</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
