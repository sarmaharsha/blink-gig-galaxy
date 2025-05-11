
import { useState } from 'react';
import Layout from '@/components/Layout';
import ProfileCard from '@/components/ProfileCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
              <Button 
                className="w-full bg-solana-purple hover:bg-solana-purple/90"
                onClick={handleConnectWallet}
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="gigs" className="w-full" onValueChange={setTabValue}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="gigs">My Gigs</TabsTrigger>
                <TabsTrigger value="rewards">Reward Tokens</TabsTrigger>
              </TabsList>
              <TabsContent value="gigs" className="pt-4">
                {userGigs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {userGigs.map((gig) => (
                      <GigCard key={gig.id} gig={gig} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="mb-4 text-lg font-medium">No gigs yet</p>
                      <Button 
                        onClick={() => window.location.href = '/create-gig'}
                        className="bg-solana-purple hover:bg-solana-purple/90"
                      >
                        Create Your First Gig
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="rewards" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2 text-solana-purple" />
                      Reputation Tokens
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-solana-purple/10 text-solana-purple">
                          <Award className="w-5 h-5" />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">BlinkGigs PRO</p>
                          <p className="text-sm text-gray-500">Reward for top performers</p>
                        </div>
                      </div>
                      <Badge className="bg-solana-purple">12 tokens</Badge>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      View All Tokens
                    </Button>
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
