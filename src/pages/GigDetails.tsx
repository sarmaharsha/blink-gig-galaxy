
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { mockGigs } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import BlinkPayment from '@/components/BlinkPayment';
import { Send, ArrowLeft } from 'lucide-react';

const GigDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  
  // Find the gig with the matching id
  const gig = mockGigs.find(g => g.id === id);
  
  if (!gig) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="mb-4 text-lg font-medium">Gig not found</p>
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleApply = () => {
    setIsPaymentOpen(true);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 pb-16">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        {/* Gig header */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold">{gig.title}</h1>
            <Badge className="text-lg px-4 py-2 bg-solana-purple hover:bg-solana-purple/90">
              {gig.price} SOL
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline" className="capitalize">{gig.category}</Badge>
            <Badge variant="outline">Est. {gig.timeEstimate}</Badge>
            {gig.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Gig image and description */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {gig.image && (
              <div className="overflow-hidden rounded-lg">
                <img 
                  src={gig.image} 
                  alt={gig.title} 
                  className="w-full object-cover h-64 md:h-80"
                />
              </div>
            )}
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {gig.description}
                </p>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Deliver work within {gig.timeEstimate}</li>
                    <li>Experience with {gig.skills.join(', ')}</li>
                    <li>Clear communication and updates</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar with poster info and action buttons */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">About the Poster</h2>
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src={gig.poster.avatar} 
                    alt={gig.poster.username} 
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{gig.poster.username}</p>
                    <div className="flex items-center text-sm">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{gig.poster.rating}</span>
                      <span className="ml-1 text-gray-500">
                        ({gig.poster.completedGigs} gigs)
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>Member since {gig.poster.dateJoined}</p>
                  <p>Wallet: {gig.poster.wallet}</p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Posted on:</span>
                    <span>{gig.datePosted}</span>
                  </div>
                  <Button className="w-full bg-solana-purple hover:bg-solana-purple/90" onClick={handleApply}>
                    <Send className="w-4 h-4 mr-2" />
                    Apply for this Gig
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Payment dialog */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for Gig</DialogTitle>
            <DialogDescription>
              Send a payment request to the gig poster using Solana Blinks
            </DialogDescription>
          </DialogHeader>
          <BlinkPayment 
            receiverWallet={gig.poster.wallet} 
            amount={gig.price}
            onComplete={() => setIsPaymentOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default GigDetails;
