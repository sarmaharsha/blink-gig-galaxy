import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useToast } from '@/components/ui/use-toast';
import { Coins, CreditCard, ArrowRight } from 'lucide-react';

const FiatOnRamp = () => {
  const { publicKey } = useWallet();
  const { toast } = useToast();
  const [amount, setAmount] = useState('0.01');
  const [isLoading, setIsLoading] = useState(false);

  const handleBuySOL = async () => {
    if (!publicKey) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet first',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, this would integrate with MoonPay's SDK
      // For now, we'll simulate the process
      const moonpayUrl = `https://buy.moonpay.com/?apiKey=YOUR_API_KEY&currencyCode=sol&walletAddress=${publicKey.toString()}&baseCurrencyAmount=${amount}`;
      window.open(moonpayUrl, '_blank');
      
      toast({
        title: 'Buy SOL',
        description: 'You will be redirected to MoonPay to complete your purchase',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to initiate purchase. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="solana-card p-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#9945FF]/10">
          <Coins className="w-5 h-5 text-[#9945FF]" />
        </div>
        <h3 className="text-xl font-semibold text-gray-200">Buy SOL</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Amount (SOL)
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-[#9945FF]"
              min="0.01"
              step="0.01"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              SOL
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Estimated Cost</span>
          <span>~${(parseFloat(amount) * 100).toFixed(2)} USD</span>
        </div>

        <button
          className="solana-button w-full flex items-center justify-center gap-2"
          onClick={handleBuySOL}
          disabled={isLoading}
        >
          <CreditCard className="w-4 h-4" />
          {isLoading ? 'Processing...' : 'Buy with Card'}
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-xs text-gray-500 text-center">
          Powered by MoonPay. You can buy SOL directly with your credit card.
        </p>
      </div>
    </div>
  );
};

export default FiatOnRamp; 