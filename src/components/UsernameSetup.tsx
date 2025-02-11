import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { useLanguage, LanguageKey } from '../hooks/useLanguage';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { languages } from '../config/languages';

interface UsernameSetupProps {
  onComplete: (username: string) => void;
  onSkip: () => void; 
}

const UsernameSetup: React.FC<UsernameSetupProps> = ({ onComplete, onSkip }) => {
  const [username, setUsername] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const { language, changeLanguage } = useLanguage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim()) {
      setError(language.usernameRequired || 'Username is required');
      return;
    }
    if (!agreed) {
      setError(language.agreeGuidelines);
      return;
    }
    // Call the onComplete callback with the username
    if (onComplete) {
      onComplete(username);
    }
  };

  const guidelines = [
    {
      title: language.freedomOfExpression,
      description: language.freedomOfExpressionDesc
    },
    {
      title: language.privacy,
      description: language.privacyDesc
    },
    {
      title: language.prohibitedContent,
      description: language.prohibitedContentDesc
    },
    {
      title: language.responsibility,
      description: language.responsibilityDesc
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            noContext
          </span>
          <p className="mt-2 text-gray-600">{language.createIdentity}</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language.username}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={language.chooseUsername}
                maxLength={30}
              />
              <p className="mt-2 text-sm text-gray-500">
                {language.usernameDesc}
              </p>
            </div>

            {/* Language Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language.selectLanguage}
              </label>
              <select
                value={Object.keys(languages).find(key => languages[key as LanguageKey] === language)}
                onChange={(e) => changeLanguage(e.target.value as LanguageKey)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="en">English</option>
                <option value="id">Indonesia</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>

            {/* Guidelines Checkbox */}
            <div className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    {language.readCommunityGuidelines}
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{language.communityGuidelines}</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 space-y-6">
                    {guidelines.map((guideline, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="text-lg font-semibold">{guideline.title}</h3>
                        <p className="text-gray-600">{guideline.description}</p>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="guidelines"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      setError('');
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <label htmlFor="guidelines" className="ml-3 text-sm text-gray-600">
                  {language.agreeGuidelines}
                </label>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>{language.startYapping}</span>
              <Check className="w-5 h-5" />
            </button>
          </form>
          {/* Skip Button */}
          <button
            onClick={onSkip}
            className="w-full mt-4 py-3 px-4 bg-gray-300 text-gray-700 rounded-lg hover:shadow-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>{language.skip}</span>
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          {language.footerText}
        </p>
      </div>
    </div>
  );
};

export default UsernameSetup;
