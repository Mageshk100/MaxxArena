import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
        // Log them in immediately after successful registration
        await login(formData.email, formData.password); 
      }
      navigate('/');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    // Navigates the entire browser to hit our backend OAuth router splash screen
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`;
  };

  return (
    <div className="page-enter w-full min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-4 relative z-20">
      
      {/* Back button */}
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] hover:text-[var(--text-primary)] transition-colors font-bold z-30">
        <span className="text-xl">🏠</span>
        <span className="text-sm border-2 rounded p-1 hidden sm:block">Arena</span>
      </Link>

      <div className="w-full max-w-md bg-[var(--bg-surface)] p-8 rounded-3xl border-2 border-[var(--border-subtle)] shadow-[0_8px_0_var(--border-subtle)] relative">
        
        {/* Header */}
        <div className="text-center mb-8">
           <div className="w-14 h-14 mx-auto rounded-2xl bg-[var(--color-primary)] flex items-center justify-center shadow-[0_6px_0_var(--color-primary-dark)] transform rotate-3 mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          <h2 className="font-display text-3xl font-black text-[var(--text-primary)] tracking-tight">
            {isLogin ? 'Welcome Back!' : 'Join the Arena'}
          </h2>
          <p className="text-[var(--text-secondary)] font-medium mt-2">
            {isLogin ? 'Ready to beat your high score?' : 'Start your coding journey.'}
          </p>
        </div>

        {/* Error Message Dashboard */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-100 text-red-600 font-bold text-sm text-center border-2 border-red-200">
            {errorMsg}
          </div>
        )}

        {/* Standard Form Authentication */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!isLogin && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[var(--text-muted)] uppercase">Display Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] text-[var(--text-primary)] font-medium focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                placeholder="CodeMaster"
                required
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[var(--text-muted)] uppercase">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] text-[var(--text-primary)] font-medium focus:border-[var(--color-primary)] focus:outline-none transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[var(--text-muted)] uppercase">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 rounded-xl bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] text-[var(--text-primary)] font-medium focus:border-[var(--color-primary)] focus:outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-2 w-full p-4 rounded-xl font-display font-black text-white text-lg tracking-wide uppercase transition-all flex justify-center items-center gap-2 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-[var(--color-primary)] hover:-translate-y-1 shadow-[0_6px_0_var(--color-primary-dark)] hover:shadow-[0_8px_0_var(--color-primary-dark)] active:translate-y-1 active:shadow-[0_0px_0_var(--color-primary-dark)]'
            }`}
          >
            {isLoading ? 'Processing...' : (isLogin ? 'Login To Arena' : 'Create Account')}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-0.5 bg-[var(--border-subtle)]"></div>
          <span className="text-sm font-bold text-[var(--text-muted)] uppercase">OR</span>
          <div className="flex-1 h-0.5 bg-[var(--border-subtle)]"></div>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full p-4 rounded-xl font-display font-black text-[var(--text-primary)] bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] text-lg tracking-wide transition-all flex justify-center items-center gap-3 hover:-translate-y-1 shadow-[0_4px_0_var(--border-subtle)] hover:shadow-[0_6px_0_var(--border-subtle)] active:translate-y-1 active:shadow-[0_0px_0_var(--border-subtle)]"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
          Continue with Google
        </button>

        {/* Toggle Mode Link */}
        <div className="mt-8 text-center">
          <p className="text-[var(--text-secondary)] font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-[var(--color-primary)] font-bold hover:underline"
            >
              {isLogin ? 'Sign up here' : 'Log in here'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

export default AuthPage;
