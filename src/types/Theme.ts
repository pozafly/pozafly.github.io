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
        postFeedBackground: string;
        navMainBackground: string;
        siteMainBackground: string;
        socialLinkSvg: string;
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
      };
      postCard: {
        postCardTitleColor: string;
        postCardExcerptColor: string;
        postCardBylineContentColor: string;
        PostCardImageBackground: string;
        PostCardImageBorderColor: string;
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
    nav: {
      linkColor: string;
    };
    tag: {
      tagColor: string;
      tagHoverBoxShadow: string;
      tagBackground: string;
      tagBorderColor: string;
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
        color: string;
        background: string;
        borderColor: string;
      };
    };
  }
}
