import { useCallback, useLayoutEffect, useState } from 'react';

type Ttheme = 'dark' | 'light';
export const themeNames = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

const useTheme = () => {
  const [theme, setTheme] = useState<Ttheme>('dark');

  const themeToggler = useCallback(() => {
    const nextTheme =
      theme === themeNames.LIGHT ? themeNames.DARK : themeNames.LIGHT;

    setTheme(nextTheme);
    window.__setPreferredTheme(nextTheme);
  }, [theme]);

  useLayoutEffect(() => {
    // 클라이언트에서는 window.__theme 값으로 테마를 설정한다
    if (typeof window === 'object') {
      setTheme(window.__theme);
    }

    // 테마 변경 시점에 실행할 로직을 추가한다.
    // __setPreferredTheme은 변경할 수 없으므로 여기에 React에서 사용할 수 있는 로직을 추가한다.
    window.__onThemeChange = (newTheme: Ttheme) => {
      setTheme(newTheme);
    };
  }, []);

  return { theme, themeToggler };
};

export default useTheme;
