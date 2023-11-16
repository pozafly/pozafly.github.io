import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import type { Author } from '@/templates/post.tsx';
import type { ImageDataLike } from 'gatsby-plugin-image';

import { SiteNavLogo } from '@/components/header/SiteNavLogo.tsx';
import ThemeModeSwitch from '@/components/header/ThemeModeSwitch.tsx';
import { Github } from '@/components/icons/github.tsx';
import { Instagram } from '@/components/icons/instagram.tsx';
import { SocialLink, SocialLinkFb } from '@/styles/shared.ts';
import config from '@/website-config.ts';

type SiteNavProps = {
  isHome?: boolean;
  isPost?: boolean;
  post?: {
    title: string;
    date: string;
    userDate: string;
    image: ImageDataLike;
    excerpt: string;
    tags: string[];
    author: Author[];
  };
};

export default function SiteNav({ isHome = false, isPost, post }: SiteNavProps) {
  const [showTitle, setShowTitle] = useState(false);
  const titleRef = useRef<HTMLSpanElement>(null);
  const lastScrollY = useRef<number>(0);
  const ticking = useRef<boolean>(false);

  const onScroll = useCallback(() => {
    if (!titleRef || !titleRef.current) {
      return;
    }
    if (!ticking.current) {
      requestAnimationFrame(update);
    }
    ticking.current = true;
  }, []);

  const update = () => {
    if (!titleRef || !titleRef.current) {
      return;
    }
    lastScrollY.current = window.scrollY;
    const trigger = titleRef.current.getBoundingClientRect().top;
    const triggerOffset = titleRef.current.offsetHeight + 35;

    // show/hide post title
    if (lastScrollY.current >= trigger + triggerOffset) {
      setShowTitle(true);
    } else {
      setShowTitle(false);
    }
    ticking.current = false;
  };

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    if (isPost) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, [isPost, onScroll]);

  return (
    <Fragment>
      <nav css={SiteNavStyles}>
        <SiteNavLeft className={`site-nav-left ${isHome ? 'is-home' : ''}`}>
          <SiteNavLogo />
          <SiteNavContent css={[showTitle ? HideNav : '']}>
            <ul css={NavStyles} role="menu">
              <li role="menuitem">
                <Link to="/" activeClassName="nav-current" className={`${isHome ? 'is-home' : ''}`}>
                  Home
                </Link>
              </li>
              <li role="menuitem">
                <Link
                  to="/about"
                  activeClassName="nav-current"
                  className={`${isHome ? 'is-home' : ''}`}
                >
                  About
                </Link>
              </li>
              <li role="menuitem">
                <Link
                  to="/tags"
                  activeClassName="nav-current"
                  className={`${isHome ? 'is-home' : ''}`}
                >
                  Tags
                </Link>
              </li>
              <li role="menuitem">
                <Link
                  to="/tags/diary/"
                  activeClassName="nav-current"
                  className={`${isHome ? 'is-home' : ''}`}
                >
                  Diary
                </Link>
              </li>
            </ul>
            {isPost && (
              <NavPostTitle ref={titleRef} className="nav-post-title">
                {post?.title || ''}
              </NavPostTitle>
            )}
          </SiteNavContent>
        </SiteNavLeft>
        <SiteNavRight>
          <SocialLinks>
            {config.instagram && (
              <a
                className={`${isHome ? 'is-home' : ''} not-mobile`}
                css={[SocialLink, SocialLinkFb]}
                href={config.instagram}
                target="_blank"
                title="Instagram"
                rel="noopener noreferrer"
              >
                <Instagram />
              </a>
            )}
            {config.github && (
              <a
                className={`${isHome ? 'is-home' : ''} not-mobile`}
                css={SocialLink}
                href={config.github}
                title="Github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
              </a>
            )}
            <ThemeModeSwitch isHome={isHome} />
          </SocialLinks>
        </SiteNavRight>
      </nav>
    </Fragment>
  );
}

const SiteNavStyles = css`
  position: relative;
  z-index: 100;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  font-size: 1.3rem;
`;

const SiteNavLeft = styled.div`
  overflow: auto hidden;
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  margin-right: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  -ms-overflow-scrolling: touch;

  @media (max-width: 700px) {
    margin-right: 0;
  }
`;

const SiteNavContent = styled.div`
  position: relative;
  align-self: flex-start;
`;

const NavStyles = css`
  position: absolute;
  z-index: 1000;
  display: flex;
  margin: 0 0 0 -12px;
  padding: 0;
  list-style: none;
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);

  li {
    display: block;
    margin: 0;
    padding: 0;
  }

  li a {
    position: relative;
    display: block;
    padding: 10px 12px;
    font-size: 1.2rem;
    color: var(--main-color);
    opacity: 0.7;
    transition: opacity 0.2s ease-in-out;

    @media (max-width: 700px) {
      padding: 10px 8px;
    }
  }

  li a:hover {
    text-decoration: none;
    opacity: 1;
  }

  li a.is-home {
    color: #fff;

    &:before {
      background: #fff;
    }
  }

  .nav-current {
    opacity: 1;
  }
`;

const SiteNavRight = styled.div`
  display: flex;
  flex: 0 1 auto;
  align-items: center;
  justify-content: flex-end;
`;

const SocialLinks = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;

  @media (max-width: 700px) {
    .not-mobile {
      display: none;
    }
  }
`;

const NavPostTitle = styled.span`
  position: absolute;
  top: 9px;
  transform: translateY(175%);
  font-size: 1.7rem;
  font-weight: 400;
  color: var(--main-color);
  text-transform: none;
  visibility: hidden;
  opacity: 0;
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);

  .dash {
    left: -25px;
  }

  .dash:before {
    content: '- ';
    opacity: 0.5;
  }

  @media (max-width: 700px) {
    overflow: hidden;
    max-width: calc(100vw - 126px);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const HideNav = css`
  ul {
    transform: translateY(-175%);
    visibility: hidden;
    opacity: 0;
  }

  .nav-post-title {
    transform: translateY(0);
    visibility: visible;
    opacity: 1;
  }
`;
