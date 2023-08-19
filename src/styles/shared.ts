import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from './colors';

export const outer = css`
  position: relative;
  padding: 0 5vw;
`;

// Centered content container blocks
export const inner = css`
  margin: 0 auto;
  max-width: 1040px;
  width: 100%;
`;

export const SiteNavMain = (theme: Theme) => css`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(8px);
  background: ${theme.global.main.navMainBackground};
`;

export const SiteMain = (theme: Theme) => css`
  flex-grow: 1;
  background: ${theme.global.main.siteMainBackground};
`;

export const SiteTitle = styled.h1`
  z-index: 110;
  margin: 0 0 0 -2px;
  padding: 0;
  font-size: 5rem;
  line-height: 1em;
  font-weight: 600;

  @media (max-width: 500px) {
    font-size: 4.2rem;
  }
`;

export const SiteDescription = styled.h2`
  z-index: 140;
  margin: 0;
  padding: 15px 0;
  font-size: 2.1rem;
  line-height: 1.4em;
  font-weight: 400;
  opacity: 0.8;

  @media (max-width: 500px) {
    font-size: 1.8rem;
  }
`;

export const Posts = css`
  overflow-x: hidden;
`;

export const PostFeed = (theme: Theme) =>
  css`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin: 0 -20px;
    padding: 50px 0 0;
    background: ${theme.global.main.postFeedBackground};

    padding: 120px 0 40px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;

    @media (max-width: 780px) {
      padding: 80px 0 40px;
    }
    @media (max-width: 500px) {
      padding: 40px 0;
    }
  `;

export const SocialLink = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 10px;
  opacity: 0.8;
  transition: opacity 0.35s ease;

  :hover {
    opacity: 1;
  }

  svg {
    height: 1.8rem;
    fill: ${theme.global.main.socialLinkSvg};
  }

  &.is-home {
    svg {
      fill: #fff;
    }
  }
`;

export const SocialLinkFb = css`
  svg {
    height: 1.6rem;
  }
`;

export const SiteHeader = css``;

export const SiteHeaderContent = styled.div`
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  max-height: 340px;
`;

export const SiteHeaderStyles = (theme: Theme) => css`
  position: relative;
  padding-bottom: 12px;
  color: #fff;
  background: ${theme.global.main.siteHeaderStyles};
  background-size: cover;
  height: 35rem;
  @media (max-width: 780px) {
    height: 28rem;
  }
  @media (max-width: 500px) {
    height: 25rem;
  }

  :before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: block;
    background: ${theme.global.main.siteHeaderStylesBefore};
  }
  :after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
    z-index: 10;
    display: block;
    height: 100%;
    background: ${theme.global.main.siteHeaderStylesAfter};
  }
`;

// tag and author post lists
export const SiteArchiveHeader = css`
  .site-header-content {
    position: relative;
    align-items: stretch;
    min-height: 200px;
    max-height: 600px;
  }
`;

export const SiteHeaderBackground = css`
  margin-top: 64px;
`;

export const ResponsiveHeaderBackground = styled.div<{
  backgroundImage?: string;
}>`
  ${({ backgroundImage, theme }) =>
    backgroundImage &&
    `
    position: relative;
    margin-top: 64px;
    padding-bottom: 12px;
    color: #fff;
    background-size: cover;
    background: #090a0b no-repeat 50%;
    background-image: url(${backgroundImage});

    :before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 10;
      display: block;
      background: ${theme.global.main.siteHeaderStylesBefore};
    }

    :after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: auto;
      left: 0;
      z-index: 10;
      display: block;
      height: 140px;
      background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0));
    }
  `}

  ${({ backgroundImage, theme }) =>
    !backgroundImage &&
    `
    padding-top: 0;
    padding-bottom: 0;
    color: ${theme.global.main.headerColor};
    background: ${theme.global.body.backgroundColor};
    opacity: 1;


  .site-description {
    color: ${colors.midgrey};
    opacity: 1;
  }

  .site-header-content {
    border-bottom: 1px solid ${theme.global.main.responsiveHeaderBorderBottomColor};
  }

  .author-bio {
    color: ${colors.midgrey};
    opacity: 1;
  }

  .author-meta {
    color: ${colors.midgrey};
    opacity: 1;
  }

  .author-social-link a {
    color: ${theme.global.main.responsiveHeaderAuthorLinkColor};
  }

  .author-social-link a:before {
    color: ${colors.midgrey};
  }

  .author-location + .author-stats:before,
  .author-stats + .author-social-link:before,
  .author-social-link + .author-social-link:before {
    color: ${colors.midgrey};
  }

  .author-header {
    padding-bottom: 20px;
  }

  @media (max-width: 500px) {
    .site-header-content {
      flex-direction: column;
      align-items: center;
      min-height: unset;
    }

    .site-title {
      font-size: 4.2rem;
      text-align: center;
    }

    .author-header {
      padding-bottom: 10px;
    }
  }
  `}
`;

export const NoImage = (theme: Theme) => css`
  .no-image {
    padding-top: 0;
    padding-bottom: 0;
    color: ${theme.global.main.headerColor};
    background: ${theme.global.main.postFeedBackground};
    opacity: 1;
  }

  .no-image .site-description {
    color: ${colors.midgrey};
    opacity: 1;
  }

  .no-image .site-header-content {
    border-bottom: 1px solid ${theme.global.main.noImageBorderBottomColor};
  }

  .no-image .author-bio {
    color: ${colors.midgrey};
    opacity: 1;
  }

  .no-image .author-meta {
    color: ${colors.midgrey};
    opacity: 1;
  }

  .no-image .author-social-link a {
    color: ${theme.global.main.responsiveHeaderAuthorLinkColor};
  }

  .no-image .author-social-link a:before {
    color: ${colors.midgrey};
  }

  .no-image .author-location + .author-stats:before,
  .no-image .author-stats + .author-social-link:before,
  .no-image .author-social-link + .author-social-link:before {
    color: ${colors.midgrey};
  }

  @media (max-width: 500px) {
    .site-header-content {
      flex-direction: column;
      align-items: center;
      min-height: unset;
    }

    .site-title {
      font-size: 4.2rem;
      text-align: center;
    }
  }
`;
