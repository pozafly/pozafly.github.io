export {};

declare global {
  interface Window {
    __theme: 'dark' | 'light';
    __setPreferredTheme: (theme: 'dark' | 'light') => void;
    __onThemeChange: (theme: 'dark' | 'light') => void;
  }
}
