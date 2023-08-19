import { lighten, setLightness } from 'polished';
import { colors } from '../colors';
import { Theme } from '@emotion/react';

const lightTheme: Theme = {
  mode: 'light',
  global: {
    body: {
      color: lighten('-0.3', colors.midgrey),
      backgroundColor: '#fff',
      autoLinkSvg: '#0a0b0c',
    },
    main: {
      borderTopColor: lighten('0.1', colors.lightgrey),
      navMainBackground: 'rgba(255, 255, 255, 0.4)',
      siteMainBackground: 'none',
      mainColor: '#000',
      siteHeaderStyles: '#fff no-repeat center center',
      siteHeaderStylesAfter: '#fff',
      siteHeaderStylesBefore: 'rgba(0, 0, 0, 0.18)',
      authorProfileImage: 'none',
      authorBorderColor: '#fff',
      headerColor: colors.darkgrey,
      responsiveHeaderBorderBottomColor: lighten('0.12', colors.lightgrey),
      responsiveHeaderAuthorLinkColor: colors.darkgrey,
      noImageBorderBottomColor: lighten('0.12', colors.lightgrey),
      strongFontWeight: 600,
      anchorColor: '#768086',
      loaderColor: 'hsla(230, 40%, 10%, 0.8)',
      loaderColor2: 'hsla(230, 40%, 10%, 0.2)',
      imageBorderColor: 'hsl(230 25% 94%)',
    },
    postCard: {
      postCardTitleColor: 'none',
      postCardExcerptColor: 'none',
      postCardBylineContentColor: lighten('0.2', colors.darkgrey),
      PostCardImageBackground: 'none',
    },
    postContent: {
      headerColor: lighten('-0.05', colors.darkgrey),
      strongColor: lighten('-0.05', colors.darkgrey),
      blockquoteColor: '#e0e0e0',
      codeColor: 'none',
      codeBackground: colors.whitegrey,
      figcaptionColor: 'none',
      tableFirstOfTypeColor: `linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 50%,
        rgba(255, 255, 255, 0) 100%
      )`,
      tableLastOfTypeColor: `linear-gradient(
        to left,
        rgba(255, 255, 255, 1) 50%,
        rgba(255, 255, 255, 0) 100%
      )`,
      tableThColor: colors.darkgrey,
      tableThBackground: lighten('0.04', colors.whitegrey),
      tableThBorderColor: lighten('-0.01', colors.whitegrey),
    },
  },
  tag: {
    tagHoverBoxShadow: 'hsla(218, 53%, 10%, 12%)',
    tagBackground: '#f5f5f5',
  },
  post: {
    excerptColor: 'rgb(48, 58, 62)',
    postFullBorderColor: lighten('0.1', colors.lightgrey),
    postFullMetaLink: lighten('0.1', colors.darkgrey),
    postFullMetaLinkHover: colors.darkgrey,
    postFullTitleColor: setLightness('0.05', colors.darkgrey),
  },
  prism: {
    background: 'hsl(0 0% 90.66%)',
    borderLeft: 'hsl(0 0% 82.88%)',
    highlightBackground: '#fafafa',
    highlightBorder: '#d1d1d1',
    preCodeColor: '#000',
    small: {
      borderColor: '#d1d1d1',
    },
  },
};

export default lightTheme;
