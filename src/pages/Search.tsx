
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import GigCard from '@/components/GigCard';
import { mockGigs } from '@/data/mockData';
import { Gig } from '@/lib/types';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Gig[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // Filter gigs based on search query
    const results = mockGigs.filter(
      gig => 
        gig.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        gig.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto pb-16">
        <h1 className="text-2xl font-bold mb-6">Search Gigs</h1>
        
        <div className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for gigs..."
            className="pl-10 pr-4 py-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button 
            className="mt-4 bg-solana-purple hover:bg-solana-purple/90"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        
        {hasSearched && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {searchResults.length > 0 
                ? `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'}`
                : 'No gigs found'}
            </h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {searchResults.map((gig) => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
            
            {searchResults.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Try a different search term or browse our featured gigs
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
