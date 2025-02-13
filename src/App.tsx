import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import UsernameSetup from './components/UsernameSetup';
import { LanguageProvider } from './hooks/useLanguage';

const App = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/setup" element={<UsernameSetup onComplete={(username) => console.log(username)} onSkip={() => navigate('/home')} />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

const WrappedApp = () => (
  <Router>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </Router>
);

export default WrappedApp;
