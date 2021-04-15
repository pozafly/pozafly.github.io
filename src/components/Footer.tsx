import { Link } from 'gatsby';
import { setLightness } from 'polished';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { colors } from '../styles/colors';
import { outer, inner } from '../styles/shared';
import config from '../website-config';

export const Footer: React.FC = () => {
  return (
    <footer css={[outer, SiteFooter]}>
      <div css={[inner, SiteFooterContent]}>
        <section className="copyright">
          {/* <Link to="/">{config.title}</Link> */}
          &copy; {new Date().getFullYear()}{' '}
          {config.footer && (
            <Link to="/">
              | {config.title} {config.footer}
            </Link>
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

          {/* <a href="https://github.com/scttcper/gatsby-casper" target="_blank" rel="noopener noreferrer">
            Casper
          </a> */}

          {/* <a href="https://hits.seeyoufarm.com">
            <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fpozafly.github.io&count_bg=%2343CA82&title_bg=%23555555&icon=atom.svg&icon_color=%23E7E7E7&title=hits&edge_flat=false" />
          </a> */}

          {/* <a href="/rss.xml">RSS</a> */}
        </SiteFooterNav>
      </div>
    </footer>
  );
};

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
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.3rem;
  a {
    color: rgba(255, 255, 255, 0.7);
  }
  a:hover {
    color: rgba(255, 255, 255, 1);
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

