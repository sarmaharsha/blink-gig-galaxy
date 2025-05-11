import { useState } from 'react';
import { Network, Wifi } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface NetworkOption {
  id: string;
  name: string;
  description: string;
  isTestnet: boolean;
}

const networks: NetworkOption[] = [
  {
    id: 'mainnet',
    name: 'Mainnet',
    description: 'Real SOL, real transactions',
    isTestnet: false,
  },
  {
    id: 'testnet',
    name: 'Testnet',
    description: 'Free SOL for testing',
    isTestnet: true,
  },
];

const NetworkSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkOption>(networks[0]);
  const { toast } = useToast();

  const handleNetworkChange = (network: NetworkOption) => {
    setSelectedNetwork(network);
    setIsOpen(false);
    
    toast({
      title: 'Network Changed',
      description: `Switched to ${network.name}`,
    });
  };

  return (
    <div className="relative">
      <button
        className="solana-button-outline flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Wifi className={`w-4 h-4 ${selectedNetwork.isTestnet ? 'text-[#14F195]' : 'text-[#9945FF]'}`} />
        <span>{selectedNetwork.name}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-48 solana-card p-2 z-50">
          {networks.map((network) => (
            <button
              key={network.id}
              className="w-full flex items-center justify-between px-4 py-2 text-gray-200 hover:bg-[#9945FF]/10 rounded-lg transition-colors"
              onClick={() => handleNetworkChange(network)}
            >
              <div className="flex items-center gap-2">
                <Wifi className={`w-4 h-4 ${network.isTestnet ? 'text-[#14F195]' : 'text-[#9945FF]'}`} />
                <span>{network.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NetworkSelector; 