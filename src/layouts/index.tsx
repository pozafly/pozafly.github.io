import { useMemo } from 'react';

import { ThemeProvider } from '@emotion/react';

import { ThemeToggleContext } from './ThemeToggleContext';
import useTheme from '../hooks/useTheme';
import GlobalStyles from '../styles/GlobalStyles';

import type { Theme } from '@emotion/react';

type IndexProps = {
  className?: string;
  children: React.ReactNode;
};

function IndexLayout(props: IndexProps) {
  const { theme, themeToggler } = useTheme();
  const themeObject: Theme = { mode: theme };
  const memorizedValue = useMemo(
    () => ({
      theme,
      themeToggler,
    }),
    [theme, themeToggler],
  );

  return (
    <div className={props.className}>
      <ThemeToggleContext.Provider value={memorizedValue}>
        <ThemeProvider theme={themeObject}>
          <GlobalStyles />
          {props.children}
        </ThemeProvider>
      </ThemeToggleContext.Provider>
    </div>
  );
}

export default IndexLayout;
