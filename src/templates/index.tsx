import { Fragment } from 'react';

import { css } from '@emotion/react';
import { graphql } from 'gatsby';
import { getImage, getSrc } from 'gatsby-plugin-image';

import type { PageContext } from '@/templates/post.tsx';
import type { ImageDataLike } from 'gatsby-plugin-image';

import { Footer } from '@/components/Footer.tsx';
import SiteNav from '@/components/header/SiteNav.tsx';
import Pagination from '@/components/Pagination.tsx';
import { PostCard } from '@/components/PostCard.tsx';
import { Wrapper } from '@/components/Wrapper.tsx';
import IndexLayout from '@/layouts/index.tsx';
import {
  inner,
  outer,
  PostFeed,
  Posts,
  SiteDescription,
  SiteHeaderContent,
  SiteHeaderStyles,
  SiteMain,
  SiteTitle,
} from '@/styles/shared.ts';
import config from '@/website-config.ts';

export type IndexProps = {
  children: React.ReactNode;
  pageContext: {
    currentPage: number;
    numPages: number;
  };
  data: {
    logo: ImageDataLike;
    header: ImageDataLike;
    allMarkdownRemark: {
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
};

export const Head = ({ data }: IndexProps) => {
  const width = getImage(data.header)?.width;
  const height = getImage(data.header)?.height;

  return (
    <Fragment>
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      <meta property="og:site_name" content={config.title} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:url" content={config.siteUrl} />
      <meta property="og:image" content={`${config.siteUrl}${getSrc(data.header)}`} />
      {config.instagram && <meta property="article:publisher" content={config.instagram} />}
      {config.googleSiteVerification && (
        <meta name="google-site-verification" content={config.googleSiteVerification} />
      )}
      <meta name="github:card" content="summary_large_image" />
      <meta name="github:title" content={config.title} />
      <meta name="github:description" content={config.description} />
      <meta name="github:url" content={config.siteUrl} />
      <meta name="github:image" content={`${config.siteUrl}${getSrc(data.header)}`} />
      {config.github && (
        <meta name="github:site" content={`@${config.github.split('https://github.com/')[1]}`} />
      )}
      <meta property="og:image:width" content={width?.toString()} />
      <meta property="og:image:height" content={height?.toString()} />
      <meta name="google-site-verification" content="X7fnDr_T5GGmrn97A919fAd2I_t2ghdL_ZkDjcR1Y8Q" />
      <meta name="naver-site-verification" content="896eb3f6e2c58669212193addb6978a4bb0d80c1" />
    </Fragment>
  );
};

function IndexPage(props: IndexProps) {
  return (
    <IndexLayout css={HomePosts}>
      <Wrapper>
        <div
          css={[outer, SiteHeaderStyles]}
          className="site-header-background"
          style={{
            backgroundImage: `url('${getSrc(props.data.header)}')`,
          }}
        >
          <div css={inner}>
            <SiteNav isHome />
            <SiteHeaderContent className="site-header-content">
              <SiteTitle className="site-title">
                {props.data.logo ? (
                  <img
                    style={{ maxHeight: '55px', height: '55px' }}
                    src={getSrc(props.data.logo)}
                    alt={config.title}
                  />
                ) : (
                  config.title
                )}
              </SiteTitle>
              <SiteDescription>{config.description}</SiteDescription>
            </SiteHeaderContent>
          </div>
        </div>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={[inner, Posts]}>
            <div css={[PostFeed]}>
              {props.data.allMarkdownRemark.edges.map(
                (post, index) =>
                  // filter out drafts in production
                  (post.node.frontmatter.draft !== true ||
                    (post.node.frontmatter.tags[0] !== 'Diary' &&
                      process.env.NODE_ENV !== 'production')) && (
                    <PostCard key={post.node.fields.slug} post={post.node} isLarge={index === 0} />
                  ),
              )}
            </div>
          </div>
        </main>
        {props.children}
        {props.pageContext.numPages > 1 && (
          <Pagination
            currentPage={props.pageContext.currentPage}
            numPages={props.pageContext.numPages}
          />
        )}
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
}

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    header: file(relativePath: { eq: "img/common/back3.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 2000
          quality: 100
          layout: FIXED
          formats: [AUTO, WEBP, AVIF]
          placeholder: BLURRED
        )
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { draft: { ne: true }, tags: { ne: "" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            tags
            draft
            excerpt
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH
                  formats: [AUTO, WEBP, AVIF]
                  placeholder: BLURRED
                )
              }
            }
          }
          excerpt
          fields {
            readingTime {
              text
            }
            layout
            slug
          }
        }
      }
    }
  }
`;

const HomePosts = css`
  @media (min-width: 795px) {
    .post-card-large {
      flex: 1 1 100%;
      flex-direction: row;
      min-height: 280px;
      margin-bottom: 100px;
      border-top: 0;
    }

    .post-card-large .post-card-title {
      margin-top: 0;
      font-size: 3.2rem;
    }

    .post-card-large:not(.no-image) .post-card-header {
      margin-top: 0;
    }

    .post-card-large .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      min-height: 380px;
      margin-bottom: 0;
    }

    .post-card-large .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .post-card-large .post-card-content {
      flex: 0 1 361px;
      justify-content: center;
    }

    .post-card-large .post-card-excerpt p {
      display: block;
      margin-bottom: 1.5em;
      font-size: 1.8rem;
      line-height: 1.5em;
    }
  }
`;

export default IndexPage;
