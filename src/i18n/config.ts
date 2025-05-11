import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to BlinkGigs',
      onboarding: {
        title: 'Complete these steps to start your crypto freelancing journey',
        installWallet: {
          title: 'Install Phantom Wallet',
          description: 'Download and install the Phantom wallet browser extension',
        },
        connectWallet: {
          title: 'Connect Your Wallet',
          description: 'Connect your Phantom wallet to start your crypto journey',
        },
        fundWallet: {
          title: 'Fund Your Wallet',
          description: 'Add 0.01 SOL to your wallet to unlock your welcome bonus',
        },
      },
      buySol: {
        title: 'Buy SOL',
        amount: 'Amount (SOL)',
        estimatedCost: 'Estimated Cost',
        buyWithCard: 'Buy with Card',
        poweredBy: 'Powered by MoonPay. You can buy SOL directly with your credit card.',
      },
      network: {
        title: 'Network',
        mainnet: {
          name: 'Mainnet',
          description: 'Real SOL, real transactions',
        },
        testnet: {
          name: 'Testnet',
          description: 'Free SOL for testing',
          message: "You're in testnet mode. Get free SOL from the Solana Faucet to test the platform.",
          getTestSol: 'Get Test SOL',
        },
      },
    },
  },
  es: {
    translation: {
      welcome: 'Bienvenido a BlinkGigs',
      onboarding: {
        title: 'Complete estos pasos para comenzar tu viaje de freelancing crypto',
        installWallet: {
          title: 'Instalar Phantom Wallet',
          description: 'Descarga e instala la extensión del navegador Phantom wallet',
        },
        connectWallet: {
          title: 'Conectar tu Wallet',
          description: 'Conecta tu wallet Phantom para comenzar tu viaje crypto',
        },
        fundWallet: {
          title: 'Fondear tu Wallet',
          description: 'Agrega 0.01 SOL a tu wallet para desbloquear tu bono de bienvenida',
        },
      },
      buySol: {
        title: 'Comprar SOL',
        amount: 'Cantidad (SOL)',
        estimatedCost: 'Costo Estimado',
        buyWithCard: 'Comprar con Tarjeta',
        poweredBy: 'Impulsado por MoonPay. Puedes comprar SOL directamente con tu tarjeta de crédito.',
      },
      network: {
        title: 'Red',
        mainnet: {
          name: 'Mainnet',
          description: 'SOL real, transacciones reales',
        },
        testnet: {
          name: 'Testnet',
          description: 'SOL gratis para pruebas',
          message: 'Estás en modo testnet. Obtén SOL gratis del Solana Faucet para probar la plataforma.',
          getTestSol: 'Obtener SOL de Prueba',
        },
      },
    },
  },
  hi: {
    translation: {
      welcome: 'BlinkGigs में आपका स्वागत है',
      onboarding: {
        title: 'अपनी क्रिप्टो फ्रीलांसिंग यात्रा शुरू करने के लिए इन चरणों को पूरा करें',
        installWallet: {
          title: 'Phantom Wallet इंस्टॉल करें',
          description: 'Phantom wallet ब्राउज़र एक्सटेंशन डाउनलोड और इंस्टॉल करें',
        },
        connectWallet: {
          title: 'अपना Wallet कनेक्ट करें',
          description: 'अपनी क्रिप्टो यात्रा शुरू करने के लिए अपना Phantom wallet कनेक्ट करें',
        },
        fundWallet: {
          title: 'अपना Wallet फंड करें',
          description: 'अपने स्वागत बोनस को अनलॉक करने के लिए अपने wallet में 0.01 SOL जोड़ें',
        },
      },
      buySol: {
        title: 'SOL खरीदें',
        amount: 'राशि (SOL)',
        estimatedCost: 'अनुमानित लागत',
        buyWithCard: 'कार्ड से खरीदें',
        poweredBy: 'MoonPay द्वारा संचालित। आप अपने क्रेडिट कार्ड से सीधे SOL खरीद सकते हैं।',
      },
      network: {
        title: 'नेटवर्क',
        mainnet: {
          name: 'मेननेट',
          description: 'वास्तविक SOL, वास्तविक लेनदेन',
        },
        testnet: {
          name: 'टेस्टनेट',
          description: 'परीक्षण के लिए मुफ्त SOL',
          message: 'आप टेस्टनेट मोड में हैं। प्लेटफॉर्म का परीक्षण करने के लिए Solana Faucet से मुफ्त SOL प्राप्त करें।',
          getTestSol: 'टेस्ट SOL प्राप्त करें',
        },
      },
    },
  },
  zh: {
    translation: {
      welcome: '欢迎使用 BlinkGigs',
      onboarding: {
        title: '完成这些步骤开始您的加密自由职业之旅',
        installWallet: {
          title: '安装 Phantom 钱包',
          description: '下载并安装 Phantom 钱包浏览器扩展',
        },
        connectWallet: {
          title: '连接您的钱包',
          description: '连接您的 Phantom 钱包开始加密之旅',
        },
        fundWallet: {
          title: '为钱包充值',
          description: '添加 0.01 SOL 到您的钱包以解锁欢迎奖励',
        },
      },
      buySol: {
        title: '购买 SOL',
        amount: '数量 (SOL)',
        estimatedCost: '预估成本',
        buyWithCard: '使用信用卡购买',
        poweredBy: '由 MoonPay 提供支持。您可以直接使用信用卡购买 SOL。',
      },
      network: {
        title: '网络',
        mainnet: {
          name: '主网',
          description: '真实 SOL，真实交易',
        },
        testnet: {
          name: '测试网',
          description: '免费 SOL 用于测试',
          message: '您处于测试网模式。从 Solana Faucet 获取免费 SOL 来测试平台。',
          getTestSol: '获取测试 SOL',
        },
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 