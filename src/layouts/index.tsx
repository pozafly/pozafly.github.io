import React from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from '@emotion/react';

import favicon from '../content/img/common/alien.png';
import useTheme from '../hooks/useTheme';
import lightTheme from '../styles/theme/lightTheme';
import darkTheme from '../styles/theme/darkTheme';
import { ThemeToggleContext } from './ThemeToggleContext';
import GlobalStyles from '../styles/GlobalStyles';

type IndexProps = {
  className?: string;
  children: React.ReactNode;
};

function IndexLayout(props: IndexProps) {
  const { theme, themeToggler } = useTheme();
  const themeObject = theme === 'light' ? lightTheme : darkTheme;

  return (
    <div className={props.className}>
      <Helmet>
        <link rel="icon" href={favicon} type="image/x-icon" />
      </Helmet>

      <ThemeToggleContext.Provider value={{ theme, themeToggler }}>
        <ThemeProvider theme={themeObject}>
          <GlobalStyles theme={themeObject} />
          {props.children}
        </ThemeProvider>
      </ThemeToggleContext.Provider>
    </div>
  );
}

export default IndexLayout;
