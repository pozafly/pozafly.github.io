import { useLayoutEffect, useState } from 'react';

type Ttheme = 'dark' | 'light';

const useTheme = () => {
  const [theme, setTheme] = useState('dark');
  let prefersColorScheme;
  let localTheme;

  useLayoutEffect(() => {
    prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    localTheme = localStorage.getItem('theme');
    const initialTheme = localTheme || (prefersColorScheme as Ttheme);
    setTheme(initialTheme);
  }, []);

  const setMode = (mode: Ttheme) => {
    localStorage.setItem('theme', mode);
    setTheme(mode);
  };
  const themeToggler = () =>
    theme === 'light' ? setMode('dark') : setMode('light');

  return { theme, themeToggler };
};

export default useTheme;
