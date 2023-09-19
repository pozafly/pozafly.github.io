import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from './colors';

export const outer = css`
  position: relative;
  padding: 0 5vw;
`;

// Centered content container blocks
export const inner = css`
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
`;

export const SiteNavMain = css`
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  border-bottom: 1px solid var(--nav-border-color);
  background: var(--nav-background);
  backdrop-filter: saturate(180%) blur(20px);
`;

export const SiteMain = css`
  flex-grow: 1;
`;

export const SiteTitle = styled.h1`
  z-index: 110;
  margin: 0 0 0 -2px;
  padding: 0;
  font-size: 5rem;
  font-weight: 600;
  line-height: 1em;

  @media (max-width: 500px) {
    font-size: 4.2rem;
  }
`;

export const SiteDescription = styled.h2`
  z-index: 140;
  margin: 0;
  padding: 15px 0;
  opacity: 0.8;
  font-size: 2.1rem;
  font-weight: 400;
  line-height: 1.4em;

  @media (max-width: 500px) {
    font-size: 1.8rem;
  }
`;

export const Posts = css`
  overflow-x: hidden;
`;

export const PostFeed = css`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  margin: 0 -20px;

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

export const SocialLink = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 10px;
  transition: opacity 0.35s ease;
  opacity: 0.8;

  :hover {
    opacity: 1;
  }

  svg {
    height: 1.8rem;
    fill: var(--main-color);
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

export const SiteHeaderContent = styled.div`
  display: flex;
  z-index: 100;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  max-height: 340px;
`;

export const SiteHeaderStyles = css`
  position: relative;
  height: 35rem;
  padding-bottom: 12px;
  background: var(--header-color) no-repeat center center;
  background-size: cover;
  color: #fff;

  @media (max-width: 780px) {
    height: 28rem;
  }

  @media (max-width: 500px) {
    height: 25rem;
  }

  :before {
    content: '';
    display: block;
    position: absolute;
    z-index: 10;
    background: var(--header-before);
    inset: 0;
  }

  :after {
    content: '';
    display: block;
    position: absolute;
    z-index: 10;
    height: 100%;
    background: linear-gradient(rgb(0 0 0 / 0) 50%, var(--header-after));
    inset: 0 0 auto;
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
  ${({ backgroundImage }) =>
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
      background: var(--header-before);
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

  ${({ backgroundImage }) =>
    !backgroundImage &&
    `
    padding-top: 0;
    padding-bottom: 0;
    color: var(--home-header-color);
    background: var(--background-color);
    opacity: 1;


  .site-description {
    color: ${colors.midgrey};
    opacity: 1;
  }

  .site-header-content {
    border-bottom: 1px solid var(--border-top-color);
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
    color: var(--header-author-link);
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

export const NoImage = css`
  .no-image {
    padding-top: 0;
    padding-bottom: 0;
    opacity: 1;
    background: var(--background-color);
    color: var(--home-header-color);
  }

  .no-image .site-description {
    opacity: 1;
    color: ${colors.midgrey};
  }

  .no-image .site-header-content {
    border-bottom: 1px solid var(--no-image-border);
  }

  .no-image .author-bio {
    opacity: 1;
    color: ${colors.midgrey};
  }

  .no-image .author-meta {
    opacity: 1;
    color: ${colors.midgrey};
  }

  .no-image .author-social-link a {
    color: var(--header-author-link);
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
