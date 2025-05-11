import * as React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Calendar, Tag, FileText, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Gig {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  provider: {
    name: string;
    rating: number;
  };
  postedDate: string;
  status: 'open' | 'in-progress' | 'completed';
}

const CreateGig: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [duration, setDuration] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get current user
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      toast.error('Please log in to create a gig');
      navigate('/login');
      return;
    }

    const user = JSON.parse(storedUser);
    
    // Create new gig
    const newGig: Gig = {
      id: `gig-${Date.now()}`,
      title,
      description,
      price: parseFloat(price),
      duration,
      category,
      provider: {
        name: user.name,
        rating: 5.0 // Default rating for new providers
      },
      postedDate: new Date().toISOString(),
      status: 'open'
    };

    // Get existing gigs from localStorage
    const existingGigs = JSON.parse(localStorage.getItem('gigs') || '[]');
    
    // Add new gig
    const updatedGigs = [...existingGigs, newGig];
    
    // Save to localStorage
    localStorage.setItem('gigs', JSON.stringify(updatedGigs));

    // Show success message
    toast.success('Gig created successfully!');
    
    // Redirect to dashboard after 2 seconds
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl p-8 shadow-xl"
        >
          <h1 className="text-2xl font-bold text-white mb-6">Create a New Gig</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2">Gig Title</label>
              <div className="relative">
                <FileText className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter a descriptive title"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
                placeholder="Describe your gig in detail"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Price (SOL)</label>
                <div className="relative">
                  <DollarSign className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Category</label>
                <div className="relative">
                  <Tag className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="writing">Writing</option>
                    <option value="data">Data</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Duration</label>
                <div className="relative">
                  <Calendar className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                    required
                  >
                    <option value="">Select duration</option>
                    <option value="1-day">1 Day</option>
                    <option value="3-days">3 Days</option>
                    <option value="1-week">1 Week</option>
                    <option value="2-weeks">2 Weeks</option>
                    <option value="1-month">1 Month</option>
                  </select>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg py-3 font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              Create Gig
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateGig;
