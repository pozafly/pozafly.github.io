import { Fragment } from 'react';

import { graphql, Link } from 'gatsby';

import { css } from '@emotion/react';
import { kebabCase } from 'lodash-es';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import { inner, outer, SiteArchiveHeader, SiteMain, SiteNavMain } from '../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
  }
`;

const TagArea = css`
  ul {
    padding-left: initial;

    li {
      transform: translateY(0);
      display: inline-block;
      margin-right: 12px;
      padding: 2px 4px;
      color: var(--main-color);
      list-style: none;
      background: var(--tag-background);
      border: 1px solid var(--image-border-color);
      border-radius: 6px;
      transition: all 0.4s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px var(--tag-boxshadow);
      }

      a {
        padding: 6px;
        color: var(--main-color);
        text-decoration: none;
        box-shadow: none;

        &:hover {
          box-shadow: none;
        }
      }
    }
  }
`;

type Props = {
  data: {
    allMarkdownRemark: {
      group: Array<{
        fieldValue: string;
        totalCount: number | string;
      }>;
    };
  };
};

export const Head = () => (
  <Fragment>
    <title>Tags</title>
    <meta name="robots" content="noindex" />
  </Fragment>
);

const Tags = ({ data }: Props) => {
  return (
    <IndexLayout>
      <Wrapper css={PageTemplate}>
        <header className="site-archive-header no-image" css={[SiteArchiveHeader]}>
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
                      {data.allMarkdownRemark.group.map((tag) => (
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
