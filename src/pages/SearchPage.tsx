
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useRecipes } from '../context/RecipesContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeGrid from '../components/RecipeGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchRecipes>>([]);
  
  const { searchRecipes } = useRecipes();
  
  // Update search results when query param changes
  useEffect(() => {
    setSearchQuery(initialQuery);
    if (initialQuery) {
      setSearchResults(searchRecipes(initialQuery));
    } else {
      setSearchResults([]);
    }
  }, [initialQuery, searchRecipes]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchResults(searchRecipes(searchQuery));
    
    // Update URL without refreshing the page
    const newUrl = searchQuery
      ? `${location.pathname}?q=${encodeURIComponent(searchQuery)}`
      : location.pathname;
    window.history.pushState({}, '', newUrl);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container px-4">
          <h1 className="text-3xl font-bold mb-8">Search Recipes</h1>
          
          <form onSubmit={handleSearch} className="flex w-full max-w-lg mb-12 mx-auto">
            <Input
              type="search"
              placeholder="Search by recipe name, ingredients, or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button type="submit" className="ml-2">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
          
          {initialQuery && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{initialQuery}"
              </h2>
              <RecipeGrid 
                recipes={searchResults}
                emptyMessage="No recipes match your search. Try different keywords."
              />
            </div>
          )}
          
          {!initialQuery && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-2">
                Enter a search term to find recipes
              </p>
              <p className="text-muted-foreground">
                You can search by recipe name, ingredients, or description
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
