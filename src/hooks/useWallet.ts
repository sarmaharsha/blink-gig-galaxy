import { useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';
import { checkPhantomWallet, connectWallet, disconnectWallet } from '../lib/wallet';

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);

  useEffect(() => {
    setIsPhantomInstalled(checkPhantomWallet());
    
    // Check for existing connection
    const storedWallet = localStorage.getItem('walletAddress');
    if (storedWallet) {
      setWalletAddress(storedWallet);
    }
  }, []);

  const connect = async () => {
    const publicKey = await connectWallet();
    if (publicKey) {
      const address = publicKey.toString();
      setWalletAddress(address);
      localStorage.setItem('walletAddress', address);
    }
  };

  const disconnect = async () => {
    await disconnectWallet();
    setWalletAddress(null);
    localStorage.removeItem('walletAddress');
  };

  return {
    walletAddress,
    isPhantomInstalled,
    connect,
    disconnect
  };
}; 