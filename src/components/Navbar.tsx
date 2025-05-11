import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import NetworkSelector from './NetworkSelector';

const Navbar = () => {
  const { connected } = useWallet();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold solana-gradient-text">
              BlinkGigs
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            {connected && <NetworkSelector />}
            <WalletMultiButton className="solana-button" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 