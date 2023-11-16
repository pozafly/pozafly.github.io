import { Fragment } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { setLightness } from 'polished';

import { colors } from '@/styles/colors.ts';
import { inner, outer } from '@/styles/shared.ts';
import config from '@/website-config.ts';

export function Footer() {
  return (
    <footer css={[outer, SiteFooter]}>
      <div css={[inner, SiteFooterContent]}>
        <section className="copyright">
          &copy; {new Date().getFullYear()}{' '}
          {config.footer && (
            <Fragment>
              <span>| &nbsp;</span>
              <a href="https://www.gatsbyjs.com/" target="_blank" rel="nofollow noreferrer">
                {config.title} {config.footer}
              </a>
            </Fragment>
          )}
        </section>
        <SiteFooterNav>
          <Link to="/">Latest Posts</Link>
          {config.instagram && (
            <a href={config.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          )}
          {config.github && (
            <a href={config.github} target="_blank" rel="noopener noreferrer">
              Github
            </a>
          )}

          <a href="/rss.xml">RSS</a>
        </SiteFooterNav>
      </div>
    </footer>
  );
}

const SiteFooter = css`
  position: relative;
  padding-top: 20px;
  padding-bottom: 22px;
  color: #fff;
  background: ${setLightness('0.0015', colors.darkgrey)};
`;

const SiteFooterContent = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  font-size: 1.3rem;
  color: rgb(255 255 255 / 0.7);

  a {
    color: rgb(255 255 255 / 0.7);
  }

  a:hover {
    color: rgb(255 255 255 / 1);
    text-decoration: none;
  }

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const SiteFooterNav = styled.nav`
  display: flex;

  a {
    position: relative;
    margin-left: 20px;
    font-size: 1.3rem;
  }

  a:before {
    content: '';
    position: absolute;
    top: 11px;
    left: -11px;
    display: block;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 100%;
  }

  a:first-of-type:before {
    display: none;
  }

  @media (max-width: 650px) {
    a:first-of-type {
      margin-left: 0;
    }
  }
`;
