
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import FeaturedGigs from '@/components/FeaturedGigs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Search, PlusCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleDemoMode = () => {
    toast({
      title: "Demo Mode",
      description: "You're now using BlinkGigs with demo SOL!",
    });
  };

  return (
    <Layout>
      <div className="space-y-8 pb-16">
        {/* Hero section */}
        <section className="py-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-solana-purple to-solana-teal">
              Micro-Gigs, Instant Payments
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Post or complete small tasks and get paid instantly with Solana Blinks
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {!isMobile && (
                <Button
                  onClick={() => navigate('/create-gig')}
                  className="bg-solana-purple hover:bg-solana-purple/90"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Post a Gig
                </Button>
              )}
              <Button
                variant="outline"
                onClick={handleDemoMode}
              >
                Try Demo Mode
              </Button>
            </div>
          </div>
        </section>
        
        {/* Search bar on desktop */}
        {!isMobile && (
          <section className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for gigs..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-solana-purple"
                onClick={() => navigate('/search')}
              />
            </div>
          </section>
        )}
        
        {/* Featured Gigs */}
        <section>
          <FeaturedGigs />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
