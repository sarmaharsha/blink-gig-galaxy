
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Share } from 'lucide-react';

interface BlinkPaymentProps {
  receiverWallet?: string;
  amount?: number;
  onComplete?: () => void;
}

const BlinkPayment = ({ receiverWallet, amount, onComplete }: BlinkPaymentProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    receiver: receiverWallet || '',
    amount: amount?.toString() || '',
    currency: 'SOL',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCurrencyChange = (value: string) => {
    setPaymentData(prev => ({
      ...prev,
      currency: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Blink Link Generated",
        description: "Payment link has been created and copied to clipboard!",
      });
      
      if (onComplete) {
        onComplete();
      }
    }, 1500);
  };

  const handleShareLink = () => {
    toast({
      title: "Link Shared",
      description: "Blink payment link has been copied to clipboard!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Blink Payment</CardTitle>
        <CardDescription>
          Create a shareable link to instantly receive payment in SOL or stablecoins
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="receiver">Receiver Wallet Address</Label>
            <Input
              id="receiver"
              name="receiver"
              placeholder="Enter Solana wallet address"
              value={paymentData.receiver}
              onChange={handleChange}
              disabled={!!receiverWallet}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.000001"
                min="0.000001"
                placeholder="0.05"
                value={paymentData.amount}
                onChange={handleChange}
                disabled={!!amount}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={paymentData.currency}
                onValueChange={handleCurrencyChange}
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOL">SOL</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-solana-purple hover:bg-solana-purple/90" 
              disabled={loading || !paymentData.receiver || !paymentData.amount}
            >
              {loading ? 'Generating...' : 'Generate Blink Link'}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t px-6 py-4">
        <Button variant="outline" onClick={handleShareLink} className="w-full">
          <Share className="w-4 h-4 mr-2" />
          Share Payment Link
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlinkPayment;
