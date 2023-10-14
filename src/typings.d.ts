// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/* eslint-disable  @typescript-eslint/no-explicit-any */
/// <reference types="@emotion/react/types/css-prop" />

type CSSModule = Record<string, string>;

// type shims for CSS modules

declare module '*.module.scss' {
  const cssModule: CSSModule;
  export = cssModule;
}

declare module '*.module.css' {
  const cssModule: CSSModule;
  export = cssModule;
}

declare module '*.ico' {
  const ico: any;
  export = ico;
}
