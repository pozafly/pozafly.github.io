import { Theme, ThemeProvider } from '@emotion/react';
import { Helmet } from 'react-helmet';

import { ThemeToggleContext } from './ThemeToggleContext';
import favicon from '../content/img/common/alien.png';
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
      <Helmet>
        <link rel="icon" href={favicon} type="image/x-icon" />
      </Helmet>

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
