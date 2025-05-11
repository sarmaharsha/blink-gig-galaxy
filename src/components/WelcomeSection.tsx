import * as React from 'react';
import { Code, Palette, Megaphone, PenTool, Camera, Music, Globe, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { preFilledGigs } from '../data/preFilledGigs';

const WelcomeSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = React.useState('Development');

  const categories = [
    { id: 'Development', name: 'Development', icon: <Code className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    { id: 'Design', name: 'Design', icon: <Palette className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
    { id: 'Marketing', name: 'Marketing', icon: <Megaphone className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
    { id: 'Writing', name: 'Writing', icon: <PenTool className="w-6 h-6" />, color: 'from-yellow-500 to-orange-500' },
    { id: 'Photography', name: 'Photography', icon: <Camera className="w-6 h-6" />, color: 'from-red-500 to-rose-500' },
    { id: 'Music', name: 'Music', icon: <Music className="w-6 h-6" />, color: 'from-indigo-500 to-violet-500' },
    { id: 'Translation', name: 'Translation', icon: <Globe className="w-6 h-6" />, color: 'from-teal-500 to-cyan-500' },
    { id: 'Blockchain', name: 'Blockchain', icon: <Rocket className="w-6 h-6" />, color: 'from-purple-500 to-indigo-500' }
  ];

  const selectedGigs = preFilledGigs[selectedCategory as keyof typeof preFilledGigs] || [];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400">
            Welcome to Blink Gigs
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Your Gateway to the Future of Work on Solana
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Explore Categories
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`p-4 rounded-xl bg-gradient-to-br ${category.color} cursor-pointer hover:opacity-90 transition-opacity ${
                  selectedCategory === category.id ? 'ring-2 ring-white' : ''
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="text-white mb-2">{category.icon}</div>
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <p className="text-white/80 text-sm mt-1">
                  {preFilledGigs[category.id as keyof typeof preFilledGigs]?.length || 0} gigs available
                </p>
              </div>
            ))}
          </div>

          {/* Selected Category Gigs */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              {selectedCategory} Gigs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedGigs.map((gig) => (
                <div
                  key={gig.id}
                  className="bg-gray-800/50 rounded-xl p-4 cursor-pointer hover:bg-gray-800/70 transition-colors"
                  onClick={() => navigate(`/gig/${gig.id}`)}
                >
                  <h4 className="text-lg font-semibold text-white mb-2">{gig.title}</h4>
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection; 