import { Fragment } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image';
import { kebabCase } from 'lodash-es';

import type { ImageDataLike } from 'gatsby-plugin-image';

import { AuthorItem } from '@/components/AuthorItem.tsx';
import { Footer } from '@/components/Footer.tsx';
import Giscus from '@/components/Giscus.tsx';
import SiteNav from '@/components/header/SiteNav.tsx';
import PostContent from '@/components/PostContent.tsx';
import { ReadNext } from '@/components/ReadNext.tsx';
import { Wrapper } from '@/components/Wrapper.tsx';
import IndexLayout from '@/layouts/index.tsx';
import { colors } from '@/styles/colors.ts';
import { inner, outer, SiteMain, SiteNavMain } from '@/styles/shared.ts';
import config from '@/website-config.ts';

export type Author = {
  name: string;
  bio: string;
  avatar: ImageDataLike;
};

type PageTemplateProps = {
  location: Location;
  data: {
    markdownRemark: {
      html: string;
      htmlAst: unknown;
      excerpt: string;
      frontmatter: {
        title: string;
        date: string;
        userDate: string;
        image: ImageDataLike;
        excerpt: string;
        tags: string[];
        author: Author[];
      };
      fields: {
        readingTime: {
          text: string;
        };
      };
    };
    relatedPosts: {
      totalCount: number;
      edges: Array<{
        node: {
          frontmatter: {
            title: string;
            date: string;
          };
          fields: {
            readingTime: {
              text: string;
            };
            slug: string;
          };
        };
      }>;
    };
  };
  pageContext: {
    prev: PageContext;
    next: PageContext;
  };
};

export type PageContext = {
  excerpt: string;
  fields: {
    slug: string;
    readingTime: {
      text: string;
    };
  };
  frontmatter: {
    image: ImageDataLike;
    excerpt: string;
    title: string;
    date: string;
    draft?: boolean;
    tags: string[];
    author: Author[];
  };
};

export const Head = ({ data, location }: PageTemplateProps) => {
  const post = data.markdownRemark;
  const imageData = post.frontmatter.image;
  let width: number | undefined;
  let height: number | undefined;
  if (imageData) {
    width = getImage(imageData)?.width;
    height = getImage(imageData)?.height;
  }

  const date = new Date(post.frontmatter.date);
  const publishedTime = date.toISOString();

  return (
    <Fragment>
      <title>{post.frontmatter.title}</title>

      <meta name="description" content={post.frontmatter.excerpt || post.excerpt} />
      <meta property="og:site_name" content={config.title} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.frontmatter.title} />
      <meta property="og:description" content={post.frontmatter.excerpt || post.excerpt} />
      <meta property="og:url" content={config.siteUrl + location.pathname} />
      {imageData && <meta property="og:image" content={`${config.siteUrl}${getSrc(imageData)}`} />}
      <meta property="article:published_time" content={publishedTime} />
      {/* not sure if modified time possible */}
      {/* <meta property="article:modified_time" content="2018-08-20T15:12:00.000Z" /> */}
      {post.frontmatter.tags && <meta property="article:tag" content={post.frontmatter.tags[0]} />}

      {config.instagram && <meta property="article:publisher" content={config.instagram} />}
      {config.instagram && <meta property="article:author" content={config.instagram} />}
      <meta name="github:card" content="summary_large_image" />
      <meta name="github:title" content={post.frontmatter.title} />
      <meta name="github:description" content={post.frontmatter.excerpt || post.excerpt} />
      <meta name="github:url" content={config.siteUrl + location.pathname} />
      {imageData && <meta name="github:image" content={`${config.siteUrl}${getSrc(imageData)}`} />}
      <meta name="github:label1" content="Written by" />
      <meta name="github:data1" content={post.frontmatter.author[0].name} />
      <meta name="github:label2" content="Filed under" />
      {post.frontmatter.tags && <meta name="github:data2" content={post.frontmatter.tags[0]} />}
      {config.github && (
        <meta name="github:site" content={`@${config.github.split('https://github.com/')[1]}`} />
      )}
      {config.github && (
        <meta name="github:creator" content={`@${config.github.split('https://github.com/')[1]}`} />
      )}
      {width && <meta property="og:image:width" content={width?.toString()} />}
      {height && <meta property="og:image:height" content={height?.toString()} />}
    </Fragment>
  );
};

function PageTemplate({ data, pageContext, location }: PageTemplateProps) {
  const post = data.markdownRemark;

  const imageData = post.frontmatter.image;
  const imageSource = getImage(imageData);

  const date = new Date(post.frontmatter.date);
  const datetime = format(date, 'yyyy-MM-dd');
  const displayDatetime = format(date, 'yyyy-MM-dd');

  return (
    <IndexLayout className="post-template">
      <Wrapper css={PostTemplate}>
        <header className="site-header">
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isPost post={post.frontmatter} />
            </div>
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            {/* TODO: no-image css tag? */}
            <article css={[PostFull, !imageData && NoImage]}>
              <PostFullHeader className="post-full-header">
                <PostFullTags className="post-full-tags">
                  {post.frontmatter.tags &&
                    post.frontmatter.tags.length > 0 &&
                    config.showAllTags &&
                    post.frontmatter.tags.map((tag, idx) => (
                      <Fragment key={tag}>
                        {idx > 0 && <Fragment>, &nbsp;</Fragment>}
                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                      </Fragment>
                    ))}
                  {post.frontmatter.tags &&
                    post.frontmatter.tags.length > 0 &&
                    !config.showAllTags && (
                      <Link to={`/tags/${kebabCase(post.frontmatter.tags[0])}/`}>
                        {post.frontmatter.tags[0]}
                      </Link>
                    )}
                </PostFullTags>
                <PostFullTitle className="post-full-title">{post.frontmatter.title}</PostFullTitle>
                <PostFullCustomExcerpt className="post-full-custom-excerpt">
                  {post.frontmatter.excerpt}
                </PostFullCustomExcerpt>
                <PostFullByline className="post-full-byline">
                  <section className="post-full-byline-content">
                    <AuthorListUl className="author-list">
                      <AuthorItem
                        key={post.frontmatter.author[0].name}
                        author={post.frontmatter.author[0]}
                      />
                    </AuthorListUl>

                    <section className="post-full-byline-meta">
                      <div className="author-name">
                        {post.frontmatter.author.map((author) => (
                          <Link key={author.name} to={'/about'}>
                            {author.name}
                          </Link>
                        ))}
                      </div>
                      <div className="byline-meta-content">
                        <time className="byline-meta-date" dateTime={datetime}>
                          {displayDatetime}
                        </time>
                        <span className="byline-reading-time">
                          <span className="bull">&bull;</span>
                          {post.fields.readingTime.text}
                        </span>
                      </div>
                    </section>
                  </section>
                </PostFullByline>
              </PostFullHeader>

              {imageSource && (
                <PostFullImage>
                  <GatsbyImage
                    image={imageSource}
                    style={{ height: '100%' }}
                    alt={post.frontmatter.title}
                  />
                </PostFullImage>
              )}
              <PostContent html={post.html} />
            </article>
            <div css={GiscusStyle}>
              <Giscus />
            </div>
          </div>
        </main>

        <ReadNext
          currentPageSlug={location.pathname}
          tags={post.frontmatter.tags}
          relatedPosts={data.relatedPosts}
          pageContext={pageContext}
        />

        <Footer />
      </Wrapper>
    </IndexLayout>
  );
}

const GiscusStyle = css`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 760px;
  margin-right: auto;
  margin-left: auto;
`;

const PostTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: var(--background-color);
  }
`;

export const PostFull = css`
  position: relative;
`;

export const NoImage = css`
  .post-full-content {
    padding-top: 0;
    padding-bottom: 0;
  }

  .post-full-content:before,
  .post-full-content:after {
    display: none;
  }
`;

export const PostFullHeader = styled.header`
  position: relative;
  margin: 0 auto;
  padding: 70px 100px 50px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  @media (max-width: 1170px) {
    padding: 60px 11vw 50px;
  }

  @media (max-width: 800px) {
    padding-right: 5vw;
    padding-left: 5vw;
  }

  @media (max-width: 500px) {
    padding: 20px 0 35px;
  }
`;

const PostFullTags = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.4em;
  color: ${colors.midgrey};

  a {
    font-size: 1.2rem;
  }
`;

export const AuthorListUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 4px;
  padding: 0;
  list-style: none;
`;

const PostFullCustomExcerpt = styled.p`
  margin: 20px 0 0;
  font-size: 2rem;
  font-weight: 360;
  line-height: 1.4em;
  color: var(--post-card-description);

  @media (max-width: 500px) {
    font-size: 1.9rem;
    line-height: 1.5em;
  }
`;

const PostFullByline = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px 0 0;
  padding-top: 15px;
  border-top: 1px solid var(--post-full-border);

  .post-full-byline-content {
    display: flex;
    flex-grow: 1;
    align-items: flex-start;
  }

  .post-full-byline-content .author-list {
    justify-content: flex-start;
    padding: 0 12px 0 0;
  }

  .post-full-byline-meta {
    margin: 2px 0 0;
    font-size: 1.4rem;
    line-height: 1.2em;
    color: #768086;
    letter-spacing: 0.2px;
  }

  .post-full-byline-meta .author-name {
    margin: 0 0 3px;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.3em;
  }

  .post-full-byline-meta .author-name a {
    font-size: 13px;
    color: var(--post-full-meta-link);
  }

  .post-full-byline-meta .author-name a:hover {
    color: var(--post-full-meta-link-hover);
  }

  .post-full-byline-meta .byline-reading-time,
  .post-full-byline-meta .byline-meta-date {
    font-size: 13px;
  }

  .post-full-byline-meta .bull {
    display: inline-block;
    margin: 0 4px;
    opacity: 0.6;
  }
`;

export const PostFullTitle = styled.h1`
  margin: 0 0 0.2em;
  color: var(--post-full-title);

  @media (max-width: 500px) {
    margin-top: 0.2em;
    font-size: 3.3rem;
  }
`;

const PostFullImage = styled.figure`
  width: 80%;
  max-height: 800px;
  margin: 25px auto 50px;
  background-size: cover;
  border: 1px solid var(--image-border-color);
  border-radius: 8px;

  img {
    border-radius: 8px;
  }

  @media (max-width: 1170px) {
    img {
      max-width: 1170px;
    }
  }

  @media (max-width: 800px) {
    width: 100%;
  }

  @media (max-width: 500px) {
    margin-bottom: 4vw;
  }
`;

export const query = graphql`
  query ($slug: String, $primaryTag: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      excerpt
      fields {
        readingTime {
          text
        }
      }
      frontmatter {
        title
        userDate: date(formatString: "D MMMM YYYY")
        date
        tags
        excerpt
        image {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
        author {
          name
          bio
          avatar {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, breakpoints: [40, 80, 120])
            }
          }
        }
      }
    }
    relatedPosts: allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$primaryTag] }, draft: { ne: true } } }
      limit: 5
      sort: { frontmatter: { date: DESC } }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            date
          }
          fields {
            readingTime {
              text
            }
            slug
          }
        }
      }
    }
  }
`;

export default PageTemplate;
