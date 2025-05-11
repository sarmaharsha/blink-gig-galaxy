import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Coins, Menu, X, Plus, LogIn, UserPlus, LogOut, Briefcase, ClipboardList } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';

const TopBar: React.FC = () => {
  const { connected } = useWallet();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [appliedGigsCount, setAppliedGigsCount] = React.useState(0);
  const [createdGigsCount, setCreatedGigsCount] = React.useState(0);

  // Check if user is logged in and get their data from localStorage
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserName(user.name);
      
      // Get applied gigs count for specific user
      const appliedGigs = JSON.parse(localStorage.getItem(`appliedGigs_${user.id}`) || '[]');
      setAppliedGigsCount(appliedGigs.length);
      
      // Get created gigs count for specific user
      const createdGigs = JSON.parse(localStorage.getItem(`createdGigs_${user.id}`) || '[]');
      setCreatedGigsCount(createdGigs.length);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
  };

  const handleConnectWallet = () => {
    window.open('https://phantom.app/', '_blank');
  };

  const menuItems = [
    {
      title: 'Create Gig',
      icon: <Plus className="w-5 h-5" />,
      action: () => {
        if (!isLoggedIn) {
          navigate('/login');
        } else {
          navigate('/create-gig');
        }
      }
    },
    {
      title: 'My Applied Gigs',
      icon: <ClipboardList className="w-5 h-5" />,
      badge: appliedGigsCount,
      action: () => {
        if (!isLoggedIn) {
          navigate('/login');
        } else {
          navigate('/dashboard?tab=applied');
        }
      }
    },
    {
      title: 'My Created Gigs',
      icon: <Briefcase className="w-5 h-5" />,
      badge: createdGigsCount,
      action: () => {
        if (!isLoggedIn) {
          navigate('/login');
        } else {
          navigate('/dashboard?tab=created');
        }
      }
    },
    {
      title: connected ? 'Wallet Connected' : 'Connect Wallet',
      icon: <Wallet className="w-5 h-5" />,
      action: handleConnectWallet
    },
    {
      title: 'Fund Wallet',
      icon: <Coins className="w-5 h-5" />,
      action: () => {
        if (!connected) {
          navigate('/login');
        } else {
          navigate('/fund');
        }
      }
    }
  ];

  const authItems = isLoggedIn
    ? [
        {
          title: `Welcome, ${userName}`,
          action: () => {}
        },
        {
          title: 'Logout',
          icon: <LogOut className="w-5 h-5" />,
          action: handleLogout
        }
      ]
    : [
        {
          title: 'Login',
          icon: <LogIn className="w-5 h-5" />,
          action: () => navigate('/login')
        },
        {
          title: 'Sign Up',
          icon: <UserPlus className="w-5 h-5" />,
          action: () => navigate('/signup')
        }
      ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold">BG</span>
            </div>
            <span className="text-white font-semibold">Blink Gigs</span>
          </div>

          {/* Menu Button */}
          <button
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-gray-900 border-b border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="grid gap-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.action();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-white">{item.title}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
                <div className="border-t border-gray-800 my-2"></div>
                {authItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.action();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-left"
                  >
                    {item.icon}
                    <span className="text-white">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopBar; 