import { Theme, ThemeProvider } from '@emotion/react';

import { ThemeToggleContext } from './ThemeToggleContext';
import useTheme from '../hooks/useTheme';
import GlobalStyles from '../styles/GlobalStyles';

type IndexProps = {
  className?: string;
  children: React.ReactNode;
};

function IndexLayout(props: IndexProps) {
  const { theme, themeToggler } = useTheme();
  const themeObject: Theme = { mode: theme };

  return (
    <div className={props.className}>
      <ThemeToggleContext.Provider value={{ theme, themeToggler }}>
        <ThemeProvider theme={themeObject}>
          <GlobalStyles />
          {props.children}
        </ThemeProvider>
      </ThemeToggleContext.Provider>
    </div>
  );
}

export default IndexLayout;
