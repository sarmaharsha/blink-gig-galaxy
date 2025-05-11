import { PublicKey } from '@solana/web3.js';

declare global {
  interface Window {
    phantom?: {
      solana?: {
        isPhantom: boolean;
        connect: () => Promise<{ publicKey: PublicKey }>;
        disconnect: () => Promise<void>;
        on: (event: string, callback: (args: any) => void) => void;
      };
    };
  }
}

export const checkPhantomWallet = () => {
  return window.phantom?.solana?.isPhantom || false;
};

export const connectWallet = async () => {
  try {
    if (!checkPhantomWallet()) {
      window.open('https://phantom.app/', '_blank');
      return null;
    }

    const { publicKey } = await window.phantom?.solana?.connect();
    return publicKey;
  } catch (error) {
    console.error('Error connecting wallet:', error);
    return null;
  }
};

export const disconnectWallet = async () => {
  try {
    await window.phantom?.solana?.disconnect();
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
  }
}; 