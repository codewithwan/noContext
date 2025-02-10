import { MessageCircle, Lock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../hooks/useLanguage'; 

const LandingPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                noContext
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            {language.welcome},
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              {language.freedomOfExpression}
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            {language.privacyDesc}
          </p>
          <button
            onClick={() => navigate('/setup')}
            className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            {language.startYapping}
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6 rounded-xl hover:shadow-xl transition-all duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{language.noLoginRequired}</h3>
              <p className="text-gray-600">{language.noLoginRequiredDesc}</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-xl transition-all duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{language.pureExpression}</h3>
              <p className="text-gray-600">{language.pureExpressionDesc}</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-xl transition-all duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{language.lightningFast}</h3>
              <p className="text-gray-600">{language.lightningFastDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;