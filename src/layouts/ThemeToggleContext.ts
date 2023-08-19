import { createContext } from 'react';

export const ThemeToggleContext = createContext({
  theme: '',
  themeToggler: () => {},
});
