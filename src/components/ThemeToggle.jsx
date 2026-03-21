import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--border-subtle)] shadow-[0_4px_0_var(--border-subtle)] transform hover:-translate-y-1 active:translate-y-2 active:shadow-[0_0_0_transparent] transition-all text-2xl"
      aria-label="Toggle Theme"
      title="Toggle Dark/Light Theme"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}
