import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { languages, LanguageKey, Language } from '../config/languages';

interface LanguageContextProps {
  language: Language;
  changeLanguage: (lang: LanguageKey) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [languageKey, setLanguageKey] = useState<LanguageKey>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as LanguageKey;
    if (savedLanguage && languages[savedLanguage]) {
      setLanguageKey(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: LanguageKey) => {
    if (languages[lang]) {
      setLanguageKey(lang);
      localStorage.setItem('language', lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language: languages[languageKey], changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export type { LanguageKey };

