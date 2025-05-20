
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-accent" />
              <span className="font-bold text-xl">Culinary magic</span>
            </Link>
            <p className="text-muted-foreground">Поделитесь своими кулинарными творениями со всем миром. Открывайте для себя, создавайте и наслаждайтесь удивительными рецептами.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/search" className="text-muted-foreground hover:text-foreground transition-colors">Search</Link>
              </li>
              <li>
                <Link to="/create" className="text-muted-foreground hover:text-foreground transition-colors">Add Recipe</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Категории</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/breakfast" className="text-muted-foreground hover:text-foreground transition-colors">Breakfast</Link>
              </li>
              <li>
                <Link to="/categories/vegan" className="text-muted-foreground hover:text-foreground transition-colors">Vegan</Link>
              </li>
              <li>
                <Link to="/categories/dessert" className="text-muted-foreground hover:text-foreground transition-colors">Desserts</Link>
              </li>
              <li>
                <Link to="/categories/quick" className="text-muted-foreground hover:text-foreground transition-colors">Quick Meals</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="p-2 rounded-full bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="p-2 rounded-full bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground">Подпишитесь на нашу рассылку новостей</p>
              <div className="mt-2 flex">
                <input 
                  type="email" 
                  placeholder="Ваш E-mail" 
                  className="px-3 py-2 border rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <button className="bg-accent text-accent-foreground px-4 py-2 rounded-r-md hover:bg-accent/90 transition-colors">
                  Подписаться
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Recipe Exchange. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
