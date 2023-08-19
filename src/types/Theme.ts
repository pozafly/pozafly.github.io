import '@emotion/react'; // it's important to use ThemeProvider
declare module '@emotion/react' {
  export interface Theme {
    mode: 'light' | 'dark';
  }
}
