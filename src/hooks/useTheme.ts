import { useState } from 'react';

type Ttheme = 'dark' | 'light';

const useTheme = () => {
  const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light';

  const localTheme = localStorage.getItem('theme');
  const initialTheme = localTheme || (prefersColorScheme as Ttheme);
  const [theme, setTheme] = useState(initialTheme);

  const setMode = (mode: Ttheme) => {
    localStorage.setItem('theme', mode);
    setTheme(mode);
  };
  const themeToggler = () =>
    theme === 'light' ? setMode('dark') : setMode('light');

  return { theme, themeToggler };
};

export default useTheme;
