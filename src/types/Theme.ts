import '@emotion/react'; // it's important to use ThemeProvider
declare module '@emotion/react' {
  export interface Theme {
    mode: 'light' | 'dark';
    global: {
      body: {
        color: string;
        backgroundColor: string;
        autoLinkSvg: string;
      };
      main: {
        borderTopColor: string;
        navMainBackground: string;
        siteMainBackground: string;
        mainColor: string;
        siteHeaderStyles: string;
        siteHeaderStylesBefore: string;
        siteHeaderStylesAfter: string;
        authorProfileImage: string;
        authorBorderColor: string;
        headerColor: string;
        responsiveHeaderBorderBottomColor: string;
        responsiveHeaderAuthorLinkColor: string;
        noImageBorderBottomColor: string;
        strongFontWeight: number;
        anchorColor: string;
        loaderColor: string;
        loaderColor2: string;
        imageBorderColor: string;
      };
      postCard: {
        postCardTitleColor: string;
        postCardExcerptColor: string;
        postCardBylineContentColor: string;
        PostCardImageBackground: string;
      };
      postContent: {
        headerColor: string;
        strongColor: string;
        blockquoteColor: string;
        codeColor: string;
        codeBackground: string;
        figcaptionColor: string;
        tableFirstOfTypeColor: string;
        tableLastOfTypeColor: string;
        tableThColor: string;
        tableThBackground: string;
        tableThBorderColor: string;
      };
    };
    tag: {
      tagHoverBoxShadow: string;
      tagBackground: string;
    };
    post: {
      excerptColor: string;
      postFullBorderColor: string;
      postFullMetaLink: string;
      postFullMetaLinkHover: string;
      postFullTitleColor: string;
    };
    prism: {
      background: string;
      borderLeft: string;
      highlightBackground: string;
      highlightBorder: string;
      preCodeColor: string;
      small: {
        borderColor: string;
      };
    };
  }
}
