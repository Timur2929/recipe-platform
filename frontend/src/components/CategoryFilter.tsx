
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types/recipe';
import { categories } from '../data/mockData';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  selectedCategory?: Category;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory }) => {
  return (
    <div className="w-full my-6">
      <h2 className="text-lg font-semibold mb-4">Категории</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 p-1">
          <Link to="/categories">
            <Button 
              variant={!selectedCategory ? "default" : "outline"}
              className="rounded-full"
            >
              Все
            </Button>
          </Link>
          
          {categories.map((category) => (
            <Link key={category} to={`/categories/${category}`}>
              <Button 
                variant={selectedCategory === category ? "default" : "outline"}
                className="rounded-full capitalize"
              >
                {category}
              </Button>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
