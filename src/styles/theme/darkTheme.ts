import { Theme } from '@emotion/react';
import { colors } from '../colors';
import { lighten } from 'polished';

const darkTheme: Theme = {
  mode: 'dark',
  global: {
    body: {
      color: 'rgba(255, 255, 255, 0.75)',
      backgroundColor: colors.darkmode,
      autoLinkSvg: 'rgba(255, 255, 255, 0.9)',
    },
    main: {
      borderTopColor: lighten('0.08', colors.darkmode),
      postFeedBackground: colors.darkmode,
      navMainBackground: 'rgba(25, 27, 31, 0.4)',
      siteMainBackground: colors.darkmode,
      socialLinkSvg: '#fff',
      siteHeaderStyles: `${lighten(
        '-0.05',
        colors.darkgrey
      )} no-repeat center center`,
      siteHeaderStylesAfter: 'linear-gradient(rgba(0, 0, 0, 0) 50%, #191b1f)',
      siteHeaderStylesBefore: 'rgba(0, 0, 0, 0.6)',
      authorProfileImage: colors.darkmode,
      authorBorderColor: lighten('0.02', colors.darkgrey),
      headerColor: 'rgba(255, 255, 255, 0.9)',
      responsiveHeaderBorderBottomColor: '#272a30',
      responsiveHeaderAuthorLinkColor: 'rgba(255, 255, 255, 0.75)',
      noImageBorderBottomColor: lighten('0.15', colors.darkmode),
      strongFontWeight: 500,
      anchorColor: lighten('0.1', colors.midgrey),
      loaderColor: 'hsla(230, 40%, 90%, 0.8)',
      loaderColor2: 'hsla(230, 40%, 90%, 0.2)',
    },
    postCard: {
      postCardTitleColor: 'rgba(255, 255, 255, 0.85)',
      postCardExcerptColor: '#768086',
      postCardBylineContentColor: 'rgba(255, 255, 255, 0.75)',
      PostCardImageBackground: colors.darkmode,
      PostCardImageBorderColor: 'hsl(230 6% 23%)',
    },
    postContent: {
      headerColor: 'rgba(255, 255, 255, 0.9)',
      strongColor: '#fff',
      blockquoteColor: '#2c2c2c',
      codeColor: '#fff',
      codeBackground: '#000',
      figcaptionColor: 'rgba(255, 255, 255, 0.6)',
      tableFirstOfTypeColor: `linear-gradient(
        to right,
        ${colors.darkmode} 50%,
        ${colors.darkmode} 100%
      )`,
      tableLastOfTypeColor: `
      linear-gradient(
        270deg,
        #191b1f 50%,
        rgba(25, 27, 31, 0)
      )`,
      tableThColor: 'rgba(255, 255, 255, 0.85)',
      tableThBackground: lighten('0.08', colors.darkmode),
      tableThBorderColor: lighten('0.08', colors.darkmode),
    },
  },
  nav: {
    linkColor: '#fff',
  },
  tag: {
    tagColor: '#fff',
    tagHoverBoxShadow: '#090f1a',
    tagBackground: '#282b31',
    tagBorderColor: 'hsl(230 6% 23%)',
  },
  post: {
    excerptColor: '#768086',
    postFullBorderColor: lighten('0.15', colors.darkmode),
    postFullMetaLink: 'rgba(255, 255, 255, 0.75)',
    postFullMetaLinkHover: '#fff',
    postFullTitleColor: 'rgba(255, 255, 255, 0.9)',
  },
  prism: {
    background: 'rgb(0 0 0 / 40%)',
    borderLeft: '#818181',
    highlightBackground: 'rgb(32 36 39)',
    highlightBorder: 'none',
    preCodeColor: '#c9d1d9',
    small: {
      color: 'white',
      background: 'rgb(32 36 39)',
      borderColor: '#515151',
    },
  },
};

export default darkTheme;
