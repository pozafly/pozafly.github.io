import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import { css } from '@emotion/react';
import kebabCase from 'lodash/kebabCase';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../styles/shared';
import {
  NoImage,
  PostFull,
  PostFullHeader,
  PostFullTitle,
} from '../templates/post';
import { colors } from '../styles/colors';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

const TagArea = css`
  ul {
    padding-left: initial;
    li {
      display: inline-block;
      list-style: none;
      background: #f5f5f5;
      border: 1px solid hsl(230deg 25% 94%);
      border-radius: 6px;
      margin-right: 12px;
      color: #000;
      padding: 2px 4px;
      transform: translateY(0);
      transition: all 0.4s ease;

      &:hover {
        box-shadow: 0px 8px 20px hsla(218, 53%, 10%, 12%);
        transform: translateY(-3px);
      }

      @media (prefers-color-scheme: dark) {
        background: #282b31;
        border: 1px solid hsl(230deg 6% 23%);
        &:hover {
          /* box-shadow: 0px 8px 20px hsla(218,53%,10%,12%); */
          box-shadow: 0px 8px 20px #090f1a;
        }
      }

      a {
        padding: 6px;
        text-decoration: none;
        color: #000;
        box-shadow: none;
        &:hover {
          box-shadow: none;
        }
        @media (prefers-color-scheme: dark) {
          color: #fff;
        }
      }
    }
  }
`;

const Tags: React.FC = ({ data }: any) => {
  return (
    <IndexLayout>
      <Helmet>
        <title>Tags</title>
      </Helmet>
      <Wrapper css={PageTemplate}>
        <header
          className="site-archive-header no-image"
          css={[SiteHeader, SiteArchiveHeader]}
        >
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isHome={false} />
            </div>
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <article className="post page" css={[PostFull, NoImage]}>
              <PostFullHeader className="post-full-header">
                <PostFullTitle className="post-full-title">Tags</PostFullTitle>
              </PostFullHeader>

              <PostFullContent className="post-full-content">
                <div className="post-content">
                  <div css={TagArea}>
                    <ul>
                      {data.allMarkdownRemark.group.map((tag: any) => (
                        <li key={tag.fieldValue}>
                          <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                            {tag.fieldValue} ({tag.totalCount})
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </PostFullContent>
            </article>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { frontmatter: { date: DESC } }
      limit: 2000
    ) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default Tags;
