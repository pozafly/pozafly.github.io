import { Fragment } from 'react';

import { graphql } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';

import type { PageContext } from '@/templates/post.tsx';
import type { ImageDataLike } from 'gatsby-plugin-image';

import { Footer } from '@/components/Footer.tsx';
import SiteNav from '@/components/header/SiteNav.tsx';
import { PostCard } from '@/components/PostCard.tsx';
import { Wrapper } from '@/components/Wrapper.tsx';
import IndexLayout from '@/layouts/index.tsx';
import {
  inner,
  outer,
  PostFeed,
  ResponsiveHeaderBackground,
  SiteArchiveHeader,
  SiteDescription,
  SiteHeaderBackground,
  SiteHeaderContent,
  SiteMain,
  SiteNavMain,
  SiteTitle,
} from '@/styles/shared.ts';
import config from '@/website-config.ts';

type TagData = {
  allTagYaml: {
    edges: Array<{
      node: {
        yamlId: string;
        description: string;
        image?: ImageDataLike;
      };
    }>;
  };
  allMarkdownRemark: {
    totalCount: number;
    edges: Array<{
      node: PageContext;
    }>;
  };
};

type TagTemplateProps = {
  pageContext: {
    tag: string;
  };
  data: TagData;
};

type TagHeadTemplateProps = {
  location: Location;
  data: TagData;
  pageContext: {
    tag: string;
  };
};

export const Head = ({ data, pageContext, location }: TagHeadTemplateProps) => {
  const tag = pageContext.tag ? pageContext.tag : '';
  const tagData = data.allTagYaml.edges.find(
    (n) => n.node.yamlId.toLowerCase() === tag.toLowerCase(),
  );

  return (
    <Fragment>
      <title>{tag}</title>
      <meta name="description" content={tagData?.node ? tagData.node.description : ''} />
      <meta property="og:site_name" content={config.title} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${tag} - ${config.title}`} />
      <meta property="og:url" content={config.siteUrl + location.pathname} />
      {config.instagram && <meta property="article:publisher" content={config.instagram} />}
      <meta name="github:card" content="summary_large_image" />
      <meta name="github:title" content={`${tag} - ${config.title}`} />
      <meta name="github:url" content={config.siteUrl + location.pathname} />
      {config.github && (
        <meta name="github:site" content={`@${config.github.split('https://github.com/')[1]}`} />
      )}
    </Fragment>
  );
};

function Tags({ pageContext, data }: TagTemplateProps) {
  const tag = pageContext.tag ? pageContext.tag : '';
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagData = data.allTagYaml.edges.find(
    (n) => n.node.yamlId.toLowerCase() === tag.toLowerCase(),
  );

  const tagForImage = tagData?.node.image;
  /* eslint-disable  @typescript-eslint/no-non-null-assertion */
  const backgroundImageData = getSrc(tagForImage!);

  return (
    <IndexLayout>
      <Wrapper>
        <header className="site-archive-header" css={[SiteArchiveHeader]}>
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isHome={false} />
            </div>
          </div>
          <ResponsiveHeaderBackground
            css={[outer, SiteHeaderBackground]}
            backgroundImage={backgroundImageData}
            className="site-header-background"
          >
            <SiteHeaderContent css={inner} className="site-header-content">
              <SiteTitle className="site-title">{tag}</SiteTitle>
              <SiteDescription className="site-description">
                {tagData?.node.description ? (
                  tagData.node.description
                ) : (
                  <Fragment>
                    A collection of {totalCount > 1 && `${totalCount} posts`}
                    {totalCount === 1 && '1 post'}
                    {totalCount === 0 && 'No posts'}
                  </Fragment>
                )}
              </SiteDescription>
            </SiteHeaderContent>
          </ResponsiveHeaderBackground>
        </header>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={[PostFeed]}>
              {edges.map(({ node }) => (
                <PostCard key={node.fields.slug} post={node} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
}

export default Tags;

export const pageQuery = graphql`
  query ($tag: String) {
    allTagYaml {
      edges {
        node {
          yamlId
          description
          image {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          frontmatter {
            title
            excerpt
            tags
            date
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
              }
            }
          }
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
