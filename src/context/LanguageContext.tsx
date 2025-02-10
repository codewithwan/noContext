import { createContext, useContext, useState, ReactNode } from 'react';
import { languages, LanguageKey, Language } from '../config/languages';

type LanguageContextType = {
  language: Language;
  setLanguage: (languageKey: LanguageKey) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(languages.en);

  const changeLanguage = (languageKey: LanguageKey) => {
    setLanguage(languages[languageKey]);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
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
