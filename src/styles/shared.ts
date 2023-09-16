import { css } from '@emotion/react';
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

export const SiteNavMain = css`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: saturate(180%) blur(20px);
  background: var(--nav-background);
  border-bottom: 1px solid var(--nav-border-color);
`;

export const SiteMain = css`
  flex-grow: 1;
  background: var(--background-color);
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

export const PostFeed = css`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
  background: var(--background-color);

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
  opacity: 0.8;
  transition: opacity 0.35s ease;

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
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  max-height: 340px;
`;

export const SiteHeaderStyles = css`
  position: relative;
  padding-bottom: 12px;
  color: #fff;
  background: var(--header-color) no-repeat center center;
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
    inset: 0;
    z-index: 10;
    display: block;
    background: var(--header-before);
  }

  :after {
    content: '';
    position: absolute;
    inset: 0 0 auto;
    z-index: 10;
    display: block;
    height: 100%;
    background: linear-gradient(rgb(0 0 0 / 0) 50%, var(--header-after));
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
    color: var(--home-header-color);
    background: var(--background-color);
    opacity: 1;
  }

  .no-image .site-description {
    color: ${colors.midgrey};
    opacity: 1;
  }

  .no-image .site-header-content {
    border-bottom: 1px solid var(--no-image-border);
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
