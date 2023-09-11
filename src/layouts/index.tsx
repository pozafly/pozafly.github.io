import { Theme, ThemeProvider } from '@emotion/react';

import { ThemeToggleContext } from './ThemeToggleContext';
import favicon from '../content/img/common/alien.png';
import useTheme from '../hooks/useTheme';
import GlobalStyles from '../styles/GlobalStyles';

type IndexProps = {
  className?: string;
  children: React.ReactNode;
};

export const Head = () => (
  <link rel="icon" href="../content/img/common/alien.png" type="image/x-icon" />
);

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
