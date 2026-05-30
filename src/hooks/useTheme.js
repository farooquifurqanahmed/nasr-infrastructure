import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('nasr_theme');
    if (saved) return saved;
    // Default to dark mode for luxury architecture theme
    return 'dark';
  });

  useEffect(() => {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.remove('theme-light');
      body.classList.add('theme-dark');
      document.documentElement.classList.add('dark');
    } else {
      body.classList.remove('theme-dark');
      body.classList.add('theme-light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('nasr_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
};
