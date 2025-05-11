import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { preFilledGigs } from '../data/preFilledGigs';
import { useWallet } from '@solana/wallet-adapter-react';
import toast from 'react-hot-toast';

const GigDetails: React.FC = () => {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const { connected } = useWallet();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Find the gig from all categories
  const gig = React.useMemo(() => {
    for (const category of Object.values(preFilledGigs)) {
      const foundGig = category.find(g => g.id === gigId);
      if (foundGig) return foundGig;
    }
    return null;
  }, [gigId]);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setIsLoggedIn(!!storedUser);
  }, []);

  if (!gig) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Gig not found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    if (!isLoggedIn) {
      toast.error('Please login to apply for this gig');
      navigate('/login');
      return;
    }

    if (!connected) {
      toast.error('Please connect your wallet to apply');
      return;
    }

    // Get current user
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Get existing applications
    const appliedGigs = JSON.parse(localStorage.getItem(`appliedGigs_${user.id}`) || '[]');
    
    // Check if already applied
    if (appliedGigs.some((g: any) => g.id === gig.id)) {
      toast.error('You have already applied for this gig');
      return;
    }

    // Add to applied gigs
    appliedGigs.push(gig);
    localStorage.setItem(`appliedGigs_${user.id}`, JSON.stringify(appliedGigs));
    
    toast.success('Successfully applied for the gig!');
    navigate('/dashboard?tab=applied');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{gig.title}</h1>
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span>{gig.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💰</span>
              <span>{gig.price} SOL</span>
            </div>
            <div className="flex items-center gap-2">
              <span>👥</span>
              <span>{gig.applications} applications</span>
            </div>
          </div>
        </div>

        {/* Provider Info */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">About the Provider</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium">{gig.provider.name}</p>
              <div className="flex items-center gap-2 text-gray-400">
                <span>⭐</span>
                <span>{gig.provider.rating} rating</span>
              </div>
            </div>
            <button
              onClick={handleApply}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition-all duration-300"
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-300 leading-relaxed">{gig.description}</p>
        </div>

        {/* Skills */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {gig.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Requirements</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {gig.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        {/* Deliverables */}
        <div className="bg-gray-800/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Deliverables</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {gig.deliverables.map((del, index) => (
              <li key={index}>{del}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GigDetails;
