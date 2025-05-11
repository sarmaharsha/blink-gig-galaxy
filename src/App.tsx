import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import TrendingCollections from './components/TrendingCollections';
import WelcomeSection from './components/WelcomeSection';
import GigCategories from './components/GigCategories';
import TopBar from './components/TopBar';
import GigDetails from './pages/GigDetails';
import CreateGig from './pages/CreateGig';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Fund from './pages/Fund';
import { Toaster } from 'react-hot-toast';

function App() {
  const endpoint = useMemo(() => clusterApiUrl('devnet'), []);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Router>
            <div className="min-h-screen bg-gray-900">
              <TopBar />
              <main className="space-y-0">
                <Routes>
                  <Route path="/" element={
                    <>
                      <WelcomeSection />
                      <TrendingCollections />
                      <GigCategories />
                    </>
                  } />
                  <Route path="/gig/:gigId" element={<GigDetails />} />
                  <Route path="/create-gig" element={<CreateGig />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/fund" element={<Fund />} />
                </Routes>
              </main>
              <Toaster position="bottom-right" />
            </div>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
