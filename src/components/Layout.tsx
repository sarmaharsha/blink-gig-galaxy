
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, User, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleConnectWallet = () => {
    toast({
      title: "Wallet Connection",
      description: "This would connect to Phantom wallet in production",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-950">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-solana-purple to-solana-teal"></div>
            <span className="text-lg font-bold">BlinkGigs</span>
          </Link>
          
          {!isMobile && (
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleConnectWallet}>
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          )}
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        <div className="container py-4 mx-auto animate-fade-in">
          {children}
        </div>
      </main>
      
      {/* Mobile navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center justify-around h-16">
            <Link to="/" className={`flex flex-col items-center justify-center flex-1 p-2 ${location.pathname === '/' ? 'text-solana-purple' : 'text-gray-500'}`}>
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </Link>
            <Link to="/search" className={`flex flex-col items-center justify-center flex-1 p-2 ${location.pathname === '/search' ? 'text-solana-purple' : 'text-gray-500'}`}>
              <Search className="w-5 h-5" />
              <span className="text-xs">Search</span>
            </Link>
            <Link to="/create-gig" className={`flex flex-col items-center justify-center flex-1 p-2 ${location.pathname === '/create-gig' ? 'text-solana-purple' : 'text-gray-500'}`}>
              <PlusCircle className="w-5 h-5" />
              <span className="text-xs">Post</span>
            </Link>
            <Link to="/profile" className={`flex flex-col items-center justify-center flex-1 p-2 ${location.pathname === '/profile' ? 'text-solana-purple' : 'text-gray-500'}`}>
              <User className="w-5 h-5" />
              <span className="text-xs">Profile</span>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
