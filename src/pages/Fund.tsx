import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { Wallet, ArrowLeft, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Fund: React.FC = () => {
  const navigate = useNavigate();
  const { walletAddress, isPhantomInstalled, connect, disconnect } = useWallet();
  const [amount, setAmount] = useState('');

  const handleConnect = async () => {
    if (!isPhantomInstalled) {
      toast.error('Please install Phantom wallet first');
      return;
    }
    await connect();
  };

  const handleFund = async () => {
    if (!walletAddress) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    // Here you would implement the actual funding logic
    toast.success(`Successfully funded ${amount} SOL`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl p-8 shadow-xl"
        >
          <h1 className="text-2xl font-bold text-white mb-6">Fund Your Account</h1>

          {!isPhantomInstalled && (
            <div className="bg-yellow-500/20 text-yellow-400 p-4 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>Please install Phantom wallet to continue</span>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2">Wallet Status</label>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-purple-400" />
                    <span className="text-white">
                      {walletAddress ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                  {walletAddress && (
                    <p className="text-gray-400 text-sm mt-1 truncate">
                      {walletAddress}
                    </p>
                  )}
                </div>
                {walletAddress ? (
                  <button
                    onClick={disconnect}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    onClick={handleConnect}
                    disabled={!isPhantomInstalled}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Amount (SOL)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full bg-gray-700 text-white rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={!walletAddress}
              />
            </div>

            <button
              onClick={handleFund}
              disabled={!walletAddress || !amount}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg py-4 font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50"
            >
              Fund Account
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Fund; 