import { Link } from 'gatsby';
import React from 'react';

import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';

import { SocialLink, SocialLinkFb } from '../../styles/shared';
import config from '../../website-config';
import { Instagram } from '../icons/instagram';
import { Github } from '../icons/github';
import { SiteNavLogo } from './SiteNavLogo';
import ThemeModeSwitch from './ThemeModeSwitch';

type SiteNavProps = {
  isHome?: boolean;
  isPost?: boolean;
  post?: any;
};

type SiteNavState = {
  showTitle: boolean;
};

class SiteNav extends React.PureComponent<SiteNavProps, SiteNavState> {
  titleRef = React.createRef<HTMLSpanElement>();
  lastScrollY = 0;
  ticking = false;
  state = { showTitle: false };

  componentDidMount(): void {
    this.lastScrollY = window.scrollY;
    if (this.props.isPost) {
      window.addEventListener('scroll', this.onScroll, { passive: true });
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    if (!this.titleRef || !this.titleRef.current) {
      return;
    }

    if (!this.ticking) {
      requestAnimationFrame(this.update);
    }

    this.ticking = true;
  };

  update = () => {
    if (!this.titleRef || !this.titleRef.current) {
      return;
    }

    this.lastScrollY = window.scrollY;

    const trigger = this.titleRef.current.getBoundingClientRect().top;
    const triggerOffset = this.titleRef.current.offsetHeight + 35;

    // show/hide post title
    if (this.lastScrollY >= trigger + triggerOffset) {
      this.setState({ showTitle: true });
    } else {
      this.setState({ showTitle: false });
    }

    this.ticking = false;
  };

  render() {
    const { isHome = false, isPost = false, post = {} } = this.props;
    return (
      <>
        <nav css={SiteNavStyles}>
          <SiteNavLeft className={`site-nav-left ${isHome ? 'is-home' : ''}`}>
            <SiteNavLogo />
            <SiteNavContent css={[this.state.showTitle ? HideNav : '']}>
              <ul css={NavStyles} role="menu">
                <li role="menuitem">
                  <Link
                    to="/"
                    activeClassName="nav-current"
                    className={`${isHome ? 'is-home' : ''}`}
                  >
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
                <NavPostTitle ref={this.titleRef} className="nav-post-title">
                  {post.title}
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
      </>
    );
  }
}

const SiteNavStyles = css`
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow-y: hidden;
  height: 64px;
  font-size: 1.3rem;
`;

const SiteNavLeft = styled.div`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin-right: 10px;
  padding: 10px 0 80px;
  font-weight: 500;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  white-space: nowrap;

  -ms-overflow-scrolling: touch;

  @media (max-width: 700px) {
    margin-right: 0;
  }
`;

const SiteNavContent = styled.div`
  position: relative;
  align-self: flex-start;
`;

const NavStyles = (theme: Theme) => css`
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
    font-size: 1.2rem;
    position: relative;
    display: block;
    padding: 10px 12px;
    color: var(--main-color);
    opacity: 0.8;
    transition: opacity 0.35s ease-in-out;

    @media (max-width: 700px) {
      padding: 10px 8px;
    }
  }

  li a:hover {
    text-decoration: none;
    opacity: 1;
  }

  li a:before {
    content: '';
    position: absolute;
    right: 100%;
    bottom: 8px;
    left: 12px;
    height: 1px;
    background: var(--main-color);
    opacity: 0.25;
    transition: all 0.35s ease-in-out;
  }

  li a:hover:before {
    right: 12px;
    opacity: 0.5;
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
  flex: 0 1 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0;
  height: 64px;
`;

const SocialLinks = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;

  @media (max-width: 700px) {
    .not-mobile {
      display: none;
    }
  }
`;

const NavPostTitle = styled.span`
  visibility: hidden;
  position: absolute;
  top: 9px;
  color: var(--main-color);
  font-size: 1.7rem;
  font-weight: 400;
  text-transform: none;
  opacity: 0;
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
  transform: translateY(175%);

  @media (max-width: 700px) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: calc(100vw - 110px);
  }

  .dash {
    left: -25px;
  }

  .dash:before {
    content: '– ';
    opacity: 0.5;
  }
`;

const HideNav = css`
  ul {
    visibility: hidden;
    opacity: 0;
    transform: translateY(-175%);
  }
  .nav-post-title {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
`;

export default SiteNav;
