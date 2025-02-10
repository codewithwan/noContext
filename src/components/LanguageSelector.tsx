import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { LanguageKey, languages } from '../config/languages';

const LanguageSelector: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <select
      value={Object.keys(languages).find(key => languages[key as LanguageKey] === language)}
      onChange={(e) => changeLanguage(e.target.value as LanguageKey)}
      className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="en">English</option>
      <option value="id">Indonesia</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
  );
};

export default LanguageSelector;
