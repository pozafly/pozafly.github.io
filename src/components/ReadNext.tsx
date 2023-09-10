import { lighten } from 'polished';
import styled from '@emotion/styled';

import { colors } from '../styles/colors';
import { inner, outer } from '../styles/shared';
import type { PageContext } from '../templates/post';
import { PostCard } from './PostCard';
import { ReadNextCard } from './ReadNextCard';

type ReadNextProps = {
  tags: string[];
  currentPageSlug: string;
  relatedPosts: {
    totalCount: number;
    edges: Array<{
      node: {
        frontmatter: {
          date: string;
          title: string;
        };
        fields: {
          slug: string;
          readingTime: {
            text: string;
          };
        };
      };
    }>;
  };
  pageContext: {
    prev: PageContext;
    next: PageContext;
  };
};

export function ReadNext({ relatedPosts, currentPageSlug, tags, pageContext }: ReadNextProps) {
  const showRelatedPosts = relatedPosts.totalCount > 1;

  return (
    <ReadNextAside className="read-next" css={outer}>
      <div css={inner}>
        <ReadNextFeed className="read-next-feed">
          {showRelatedPosts && (
            <ReadNextCard
              currentPageSlug={currentPageSlug}
              tags={tags}
              relatedPosts={relatedPosts}
            />
          )}

          {pageContext.prev && <PostCard post={pageContext.prev} isNext={true} />}
          {pageContext.next && <PostCard post={pageContext.next} isNext={true} />}
        </ReadNextFeed>
      </div>
    </ReadNextAside>
  );
}

const ReadNextAside = styled.aside`
  background: ${lighten('-0.05', colors.darkgrey)};

  .post-card {
    padding-bottom: 0;
    border-bottom: none;
  }
  .post-card:after {
    display: none;
  }
  .post-card-primary-tag {
    color: #fff;
    opacity: 0.6;
  }
  .post-card-title {
    color: #fff;
    opacity: 0.8;
    transition: all 0.2s ease-in-out;
  }
  .post-card:hover .post-card-image {
    opacity: 1;
  }
  .post-card-excerpt {
    color: rgba(255, 255, 255, 0.6);
  }
  .static-avatar {
    border-color: #000;
  }
  .post-card-byline-content {
    color: rgba(255, 255, 255, 0.6);
  }
  .post-card-byline-content a {
    color: rgba(255, 255, 255, 0.8);
  }
  .author-avatar {
    border-color: ${lighten('-0.05', colors.darkgrey)};
  }
  .author-profile-image {
    background: ${lighten('-0.05', colors.darkgrey)};
  }

  @media (max-width: 650px) {
    .post-card {
      flex: 1 1 auto;
      margin: 25px;
      padding: 25px 0 0;
    }
  }
`;

const ReadNextFeed = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -25px;
  padding: 60px 0 0 0;
`;
