import * as React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Briefcase, FileText, Users, Clock, Star, DollarSign } from 'lucide-react';

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
  applicantName?: string;
}

interface Application {
  id: string;
  gigId: string;
  applicantName: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedDate: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<'created' | 'applied' | 'applications'>('created');
  const [userName, setUserName] = React.useState('');
  const [createdGigs, setCreatedGigs] = React.useState<Gig[]>([]);
  const [appliedGigs, setAppliedGigs] = React.useState<Gig[]>([]);
  const [receivedApplications, setReceivedApplications] = React.useState<Gig[]>([]);

  // Load user data and their gigs
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);

      // Load user's created gigs
      const allGigs = JSON.parse(localStorage.getItem('gigs') || '[]');
      const userCreatedGigs = allGigs.filter((gig: Gig) => gig.provider?.name === user.name);
      setCreatedGigs(userCreatedGigs);

      // Load user's applied gigs
      const appliedGigsData = JSON.parse(localStorage.getItem('appliedGigs') || '[]');
      const userAppliedGigs = appliedGigsData.filter((gig: Gig) => gig.applicantName === user.name);
      setAppliedGigs(userAppliedGigs);

      // Load applications received for user's gigs
      const applicationsData = JSON.parse(localStorage.getItem('applications') || '[]') as Application[];
      const userApplications = applicationsData
        .filter((app: Application) => userCreatedGigs.some((gig: Gig) => gig.id === app.gigId))
        .map((app: Application) => {
          const gig = allGigs.find((g: Gig) => g.id === app.gigId);
          return {
            ...gig,
            applicationStatus: app.status,
            appliedDate: app.appliedDate
          } as Gig;
        });
      setReceivedApplications(userApplications);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Pre-filled gigs for new users
  const preFilledGigs: Gig[] = [
    {
      id: 'pre-1',
      title: 'Full Stack Web Development',
      description: 'Build a complete web application with React and Node.js',
      price: 2.5,
      duration: '1 week',
      category: 'Development',
      status: 'open',
      applications: 5,
      postedDate: '2024-03-15T10:00:00Z',
      provider: {
        name: 'Alex Dev',
        rating: 4.9
      }
    },
    {
      id: 'pre-2',
      title: 'UI/UX Design',
      description: 'Design a modern and intuitive user interface',
      price: 1.8,
      duration: '3 days',
      category: 'Design',
      status: 'in-progress',
      applications: 3,
      postedDate: '2024-03-14T15:30:00Z',
      provider: {
        name: 'Sarah Designer',
        rating: 4.8
      }
    },
    {
      id: 'pre-3',
      title: 'Blockchain Development',
      description: 'Smart contract development for Solana',
      price: 3.0,
      duration: '2 weeks',
      category: 'Development',
      status: 'open',
      applications: 2,
      postedDate: '2024-03-13T09:15:00Z',
      provider: {
        name: 'Mike Blockchain',
        rating: 4.7
      }
    }
  ];

  // Initialize pre-filled gigs for new users
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const existingGigs = JSON.parse(localStorage.getItem('gigs') || '[]');
      
      // Only add pre-filled gigs if user has no gigs
      if (existingGigs.length === 0) {
        localStorage.setItem('gigs', JSON.stringify(preFilledGigs));
        setCreatedGigs(preFilledGigs);
      }
    }
  }, []);

  const renderGigCard = (gig: Gig) => (
    <motion.div
      key={gig.id}
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800 rounded-xl p-6 cursor-pointer"
      onClick={() => navigate(`/gig/${gig.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{gig.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${
          gig.status === 'open' ? 'bg-green-500/20 text-green-400' :
          gig.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-purple-500/20 text-purple-400'
        }`}>
          {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
        </span>
      </div>
      
      <p className="text-gray-400 text-sm mb-4">{gig.description}</p>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4 text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{gig.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{gig.price} SOL</span>
          </div>
          {gig.applications !== undefined && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{gig.applications} applications</span>
            </div>
          )}
        </div>
        {gig.provider && (
          <div className="flex items-center gap-2 text-gray-400">
            <span>{gig.provider.name}</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>{gig.provider.rating}</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome back, {userName}!</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/create-gig')}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Create New Gig
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('created')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'created'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span>My Gigs ({createdGigs.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('applied')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'applied'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Applied Gigs ({appliedGigs.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'applications'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Received Applications ({receivedApplications.length})</span>
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeTab === 'created' && (
            createdGigs.length > 0 ? (
              createdGigs.map(renderGigCard)
            ) : (
              <div className="col-span-full text-center text-gray-400 py-8">
                You haven't created any gigs yet. Create your first gig!
              </div>
            )
          )}
          {activeTab === 'applied' && (
            appliedGigs.length > 0 ? (
              appliedGigs.map(renderGigCard)
            ) : (
              <div className="col-span-full text-center text-gray-400 py-8">
                You haven't applied to any gigs yet. Browse available gigs!
              </div>
            )
          )}
          {activeTab === 'applications' && (
            receivedApplications.length > 0 ? (
              receivedApplications.map(renderGigCard)
            ) : (
              <div className="col-span-full text-center text-gray-400 py-8">
                No applications received yet. Share your gigs to get applications!
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 