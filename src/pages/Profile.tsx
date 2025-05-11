import { useState } from 'react';
import Layout from '@/components/Layout';
import ProfileCard from '@/components/ProfileCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUsers, mockGigs } from '@/data/mockData';
import GigCard from '@/components/GigCard';
import { Wallet, Award } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// For demo, we'll use the first user
const currentUser = mockUsers[0];

const Profile = () => {
  const { toast } = useToast();
  const userGigs = mockGigs.filter(gig => gig.poster.id === currentUser.id);
  const [tabValue, setTabValue] = useState("gigs");
  
  const handleConnectWallet = () => {
    toast({
      title: "Connect Wallet",
      description: "This would connect to Phantom wallet in the real app",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 pb-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <ProfileCard user={currentUser} />
            <div className="mt-4 space-y-4">
              <button 
                className="solana-button w-full"
                onClick={handleConnectWallet}
              >
                <Wallet className="w-4 h-4 mr-2 inline" />
                Connect Wallet
              </button>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="gigs" className="w-full" onValueChange={setTabValue}>
              <TabsList className="grid w-full grid-cols-2 bg-black/40 backdrop-blur-lg border border-white/10">
                <TabsTrigger value="gigs" className="data-[state=active]:bg-[#9945FF]">My Gigs</TabsTrigger>
                <TabsTrigger value="rewards" className="data-[state=active]:bg-[#9945FF]">Reward Tokens</TabsTrigger>
              </TabsList>
              <TabsContent value="gigs" className="pt-4">
                {userGigs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {userGigs.map((gig) => (
                      <GigCard key={gig.id} gig={gig} />
                    ))}
                  </div>
                ) : (
                  <Card className="solana-card">
                    <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="mb-4 text-lg font-medium text-gray-200">No gigs yet</p>
                      <button 
                        onClick={() => window.location.href = '/create-gig'}
                        className="solana-button"
                      >
                        Create Your First Gig
                      </button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="rewards" className="pt-4">
                <Card className="solana-card">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-200">
                      <Award className="w-5 h-5 mr-2 text-[#9945FF]" />
                      Reputation Tokens
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg bg-black/40">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#9945FF]/10 text-[#9945FF]">
                          <Award className="w-5 h-5" />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-gray-200">BlinkGigs PRO</p>
                          <p className="text-sm text-gray-400">Reward for top performers</p>
                        </div>
                      </div>
                      <Badge className="bg-[#9945FF] text-black">12 tokens</Badge>
                    </div>
                    
                    <button className="solana-button-outline w-full">
                      View All Tokens
                    </button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
