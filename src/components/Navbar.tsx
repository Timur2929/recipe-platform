
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, BookOpen, PlusCircle, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '../context/AuthContext';
import { Input } from '@/components/ui/input';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-accent" />
            <span className="font-bold text-xl hidden md:inline">Recipe Exchange</span>
            <span className="font-bold text-xl md:hidden">RE</span>
          </Link>
        </div>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden md:flex w-1/3 relative">
          <Input
            type="search"
            placeholder="Search recipes or ingredients"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <Button type="submit" variant="ghost" size="icon" className="absolute right-0">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/categories">
            <Button variant="ghost">Categories</Button>
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/create">
                <Button variant="ghost" className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Recipe</span>
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.username} />
                      <AvatarFallback>{user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/my-recipes')}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>My Recipes</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    logout();
                    navigate('/');
                  }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="default">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu and search */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b p-4 space-y-4">
          <form onSubmit={handleSearch} className="flex relative">
            <Input
              type="search"
              placeholder="Search recipes or ingredients"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button type="submit" variant="ghost" size="icon" className="absolute right-0">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          
          <div className="flex flex-col space-y-2">
            <Link to="/categories" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start">Categories</Button>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/create" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    <span>Add Recipe</span>
                  </Button>
                </Link>
                <Link to="/profile" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    <span>Profile</span>
                  </Button>
                </Link>
                <Link to="/my-recipes" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>My Recipes</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-destructive" 
                  onClick={() => {
                    logout();
                    navigate('/');
                    toggleMenu();
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Log out</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-start">Login</Button>
                </Link>
                <Link to="/register" onClick={toggleMenu}>
                  <Button variant="default" className="w-full justify-start">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
