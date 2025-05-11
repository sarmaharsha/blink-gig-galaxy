import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, CheckCircle, ArrowRight, Coins } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useToast } from '@/components/ui/use-toast';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => Promise<void>;
  isCompleted: boolean;
}

const OnboardingFlow = () => {
  const { connect, connected, publicKey } = useWallet();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const steps: OnboardingStep[] = [
    {
      id: 'install-wallet',
      title: 'Install Phantom Wallet',
      description: 'Download and install the Phantom wallet browser extension',
      icon: <Wallet className="w-6 h-6" />,
      action: async () => {
        window.open('https://phantom.app/', '_blank');
        toast({
          title: 'Wallet Installation',
          description: 'Please install Phantom wallet and return here',
        });
      },
      isCompleted: false,
    },
    {
      id: 'connect-wallet',
      title: 'Connect Your Wallet',
      description: 'Connect your Phantom wallet to start your crypto journey',
      icon: <ArrowRight className="w-6 h-6" />,
      action: async () => {
        try {
          await connect();
          toast({
            title: 'Wallet Connected!',
            description: 'Great job! Your wallet is now connected.',
          });
        } catch (error) {
          toast({
            title: 'Connection Failed',
            description: 'Please try connecting your wallet again',
            variant: 'destructive',
          });
        }
      },
      isCompleted: connected,
    },
    {
      id: 'fund-wallet',
      title: 'Fund Your Wallet',
      description: 'Add 0.01 SOL to your wallet to unlock your welcome bonus',
      icon: <Coins className="w-6 h-6" />,
      action: async () => {
        // Implement MoonPay integration here
        toast({
          title: 'Buy SOL',
          description: 'You can buy SOL directly with your credit card',
        });
      },
      isCompleted: false,
    },
  ];

  const handleStepAction = async (step: OnboardingStep) => {
    setIsLoading(true);
    try {
      await step.action();
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    } catch (error) {
      console.error('Step action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold solana-gradient-text mb-2">
          Welcome to BlinkGigs
        </h2>
        <p className="text-gray-400">
          Complete these steps to start your crypto freelancing journey
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`solana-card p-6 ${
              index === currentStep ? 'border-[#9945FF]' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {step.isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-[#14F195]" />
                ) : (
                  <div className="w-6 h-6 text-[#9945FF]">{step.icon}</div>
                )}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-200 mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-400 mb-4">{step.description}</p>
                {index === currentStep && !step.isCompleted && (
                  <button
                    className="solana-button"
                    onClick={() => handleStepAction(step)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Continue'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Progress</span>
          <span>{Math.round((currentStep / steps.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-black/40 rounded-full overflow-hidden">
          <motion.div
            className="h-full solana-gradient"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow; 