
import { useState, useEffect } from 'react';
import { Gig, Category } from '@/lib/types';
import { mockGigs } from '@/data/mockData';
import GigCard from './GigCard';
import CategoryFilter from './CategoryFilter';

const FeaturedGigs = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [filteredGigs, setFilteredGigs] = useState<Gig[]>(mockGigs);
  
  useEffect(() => {
    if (selectedCategory) {
      setFilteredGigs(mockGigs.filter(gig => gig.category === selectedCategory));
    } else {
      setFilteredGigs(mockGigs);
    }
  }, [selectedCategory]);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Gigs</h2>
      </div>
      
      <div className="mb-4">
        <CategoryFilter 
          onCategoryChange={setSelectedCategory} 
          selectedCategory={selectedCategory} 
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGigs.map((gig) => (
          <GigCard key={gig.id} gig={gig} />
        ))}
      </div>
      
      {filteredGigs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="mb-2 text-lg font-medium">No gigs found</p>
          <p className="text-sm text-gray-500">
            Try a different category or check back later
          </p>
        </div>
      )}
    </div>
  );
};

export default FeaturedGigs;
