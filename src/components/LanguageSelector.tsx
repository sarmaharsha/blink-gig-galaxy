import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'zh', name: 'Mandarin', nativeName: '中文' },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const { toast } = useToast();

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    
    // In a real implementation, this would use i18n to change the language
    toast({
      title: 'Language Changed',
      description: `Switched to ${language.name}`,
    });
  };

  return (
    <div className="relative">
      <button
        className="solana-button-outline flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="w-4 h-4" />
        <span>{selectedLanguage.nativeName}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-48 solana-card p-2 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              className="w-full flex items-center justify-between px-4 py-2 text-gray-200 hover:bg-[#9945FF]/10 rounded-lg transition-colors"
              onClick={() => handleLanguageChange(language)}
            >
              <div className="flex items-center gap-2">
                <span>{language.nativeName}</span>
                <span className="text-xs text-gray-400">({language.name})</span>
              </div>
              {selectedLanguage.code === language.code && (
                <Check className="w-4 h-4 text-[#14F195]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 