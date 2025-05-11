
import { useState } from 'react';
import { categories } from '@/data/mockData';
import { Category } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CategoryFilterProps {
  onCategoryChange: (category: Category | null) => void;
  selectedCategory: Category | null;
}

const CategoryFilter = ({ onCategoryChange, selectedCategory }: CategoryFilterProps) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-2 p-1">
        <Badge
          onClick={() => onCategoryChange(null)}
          className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors px-3 py-1 ${
            selectedCategory === null
              ? 'bg-solana-purple hover:bg-solana-purple/90 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
          }`}
        >
          All
        </Badge>
        
        {categories.map((category) => (
          <Badge
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors px-3 py-1 capitalize ${
              selectedCategory === category
                ? 'bg-solana-purple hover:bg-solana-purple/90 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
            }`}
          >
            {category}
          </Badge>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CategoryFilter;
