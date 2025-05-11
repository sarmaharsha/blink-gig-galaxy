import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { preFilledGigs } from '../data/preFilledGigs';

interface Gig {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  status: 'open' | 'in-progress' | 'completed';
  applications?: number;
  provider?: {
    name: string;
    rating: number;
  };
  postedDate: string;
}

const GigCategories: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Development');
  const [gigs, setGigs] = useState<Gig[]>([]);

  useEffect(() => {
    // Load gigs from localStorage
    const storedGigs = JSON.parse(localStorage.getItem('gigs') || '[]');
    
    // If no gigs in localStorage, initialize with pre-filled gigs
    if (storedGigs.length === 0) {
      const allPreFilledGigs = Object.values(preFilledGigs).flat();
      localStorage.setItem('gigs', JSON.stringify(allPreFilledGigs));
      setGigs(allPreFilledGigs.filter(gig => gig.category === selectedCategory));
    } else {
      // Filter gigs by selected category
      setGigs(storedGigs.filter((gig: Gig) => gig.category === selectedCategory));
    }
  }, [selectedCategory]);

  const categories = [
    { id: 'Development', name: 'Development', icon: '💻' },
    { id: 'Design', name: 'Design', icon: '🎨' },
    { id: 'Marketing', name: 'Marketing', icon: '📢' },
    { id: 'Writing', name: 'Writing', icon: '✍️' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Browse Gigs</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/create-gig')}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Create New Gig
          </motion.button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-xl text-center transition-colors ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-medium">{category.name}</div>
            </motion.button>
          ))}
        </div>

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.length > 0 ? (
            gigs.map((gig) => (
              <motion.div
                key={gig.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 rounded-xl p-6 cursor-pointer"
                onClick={() => navigate(`/gig/${gig.id}`)}
              >
                <h3 className="text-lg font-semibold text-white mb-2">{gig.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{gig.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-1">
                      <span>⏱️</span>
                      <span>{gig.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💰</span>
                      <span>{gig.price} SOL</span>
                    </div>
                  </div>
                  {gig.provider && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <span>{gig.provider.name}</span>
                      <div className="flex items-center gap-1">
                        <span>⭐</span>
                        <span>{gig.provider.rating}</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-8">
              No gigs found in this category. Be the first to create one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GigCategories; 