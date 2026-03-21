import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProblemPage from './pages/ProblemPage';
import ResultPage from './pages/ResultPage';
import AuthPage from './pages/AuthPage';
import ThemeToggle from './components/ThemeToggle';
import { useAuth } from './context/AuthContext';

/**
 * App Component
 * Root component that defines all application routes.
 */
function App() {
  const { handleOAuthLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Intercept Google OAuth Token on initial redirect
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (token) {
      handleOAuthLogin(token);
      // Strip the token securely out of the URL without refreshing the page
      navigate('/', { replace: true });
    }
  }, [location, handleOAuthLogin, navigate]);

  return (
    <>
      {/* Animated background grid with floating orbs */}
      <div className="arena-bg" />

      {/* Main content sits above the background */}
      <div className="relative z-10 min-h-screen w-full overflow-x-hidden">
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/problem/:id" element={<ProblemPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
