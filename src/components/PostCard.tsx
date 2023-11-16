import { Fragment } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { kebabCase } from 'lodash-es';
import { lighten } from 'polished';

import type { PageContext } from '@/templates/post.tsx';

import { colors } from '@/styles/colors.ts';
import config from '@/website-config.ts';

export type PostCardProps = {
  post: PageContext;
  isLarge?: boolean;
  isNext?: boolean;
};

export function PostCard({ post, isLarge = false, isNext = false }: PostCardProps) {
  const date = new Date(post.frontmatter.date);
  const datetime = format(date, 'yyyy-MM-dd');
  const displayDatetime = format(date, 'yyyy-MM-dd');

  const imageData = post.frontmatter.image;
  const imageSource = getImage(imageData);

  return (
    <article
      className={`post-card ${imageData ? '' : 'no-image'} ${isLarge ? 'post-card-large' : ''} ${
        isNext ? 'is-next' : ''
      }`}
      css={[PostCardStyles, isLarge && PostCardLarge]}
    >
      {imageData && (
        <Link className="post-card-image-link" css={PostCardImageLink} to={post.fields.slug}>
          <PostCardImage className="post-card-image">
            {imageSource && (
              <GatsbyImage
                image={imageSource}
                alt={`${post.frontmatter.title} cover image`}
                style={{ height: '100%' }}
                loading={isLarge ? 'eager' : 'lazy'}
              />
            )}
          </PostCardImage>
        </Link>
      )}
      <PostCardContent className="post-card-content">
        {post.frontmatter.tags && config.showAllTags && (
          <PostCardPrimaryTag className="post-card-primary-tag">
            {post.frontmatter.tags.map((tag, idx) => (
              <Fragment key={tag}>
                {idx > 0 && <Fragment>, &nbsp;</Fragment>}
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </Fragment>
            ))}
          </PostCardPrimaryTag>
        )}
        {post.frontmatter.tags && !config.showAllTags && (
          <PostCardPrimaryTag className="post-card-primary-tag">
            <Link to={`/tags/${kebabCase(post.frontmatter.tags[0])}/`}>
              {post.frontmatter.tags[0]}
            </Link>
          </PostCardPrimaryTag>
        )}
        <Link className="post-card-content-link" css={PostCardContentLink} to={post.fields.slug}>
          <header>
            <PostCardTitle className="post-card-title">{post.frontmatter.title}</PostCardTitle>
          </header>
          <PostCardExcerpt className="post-card-excerpt">
            <p>{post.frontmatter.excerpt || post.excerpt}</p>
          </PostCardExcerpt>
        </Link>
        <PostCardMeta className="post-card-meta">
          <PostCardBylineContent className="post-card-byline-content">
            <span className="post-card-byline-date">
              <time dateTime={datetime}>{displayDatetime}</time>{' '}
              <span className="bull">&bull;</span> <span>{post.fields.readingTime.text}</span>
            </span>
          </PostCardBylineContent>
        </PostCardMeta>
      </PostCardContent>
    </article>
  );
}

const PostCardStyles = css`
  position: relative;
  overflow: hidden;
  display: flex;
  flex: 1 1 301px;
  flex-direction: column;
  min-height: 220px;
  margin: 0 20px 60px;
  background-size: cover;

  img {
    transform: scale(1) !important;
    transition:
      opacity 0.3s ease-out 0s,
      transform 0.5s ease 0s !important;
  }

  &:hover {
    .post-card-image:after {
      opacity: var(--post-card-after-opacity);
    }

    img[data-main-image] {
      transform: scale(1.03) !important;
    }
  }

  &.is-next {
    .post-card-image {
      background: #191b1f;
      border: 1px solid hsl(230 6% 23%);
    }

    .post-card-primary-tag {
      a {
        color: #90a2aa;
      }
    }

    .post-card-excerpt {
      color: #768086;
    }

    .post-card-byline-content {
      color: #90a2aa;
    }
  }
`;

const PostCardLarge = css`
  p {
    display: block;
  }

  @media (min-width: 795px) {
    flex: 1 1 100%;
    flex-direction: row;
    min-height: 280px;
    border-top: 0;

    :not(.no-image) .post-card-header {
      margin-top: 0;
    }

    .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      min-height: 380px;
      margin-bottom: 0;
    }

    .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .post-card-content {
      flex: 0 1 361px;
      justify-content: center;
      padding: 0 0 0 40px;
    }

    .post-card-title {
      margin-top: 0;
      font-size: 3.2rem;
    }

    .post-card-excerpt p {
      margin-bottom: 1.5em;
      font-size: 1.8rem;
      line-height: 1.5em;
    }
  }
`;

const PostCardImageLink = css`
  position: relative;
  overflow: hidden;
  display: block;
  border-radius: 12px;
`;

const PostCardImage = styled.div`
  overflow: hidden;
  width: auto;
  height: 200px;
  background-color: var(--background-color);
  background-size: cover;
  border: 1px solid var(--image-border-color);
  border-radius: 12px;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    opacity: var(--post-card-opacity);
    background-color: var(--post-card-background);
    transition: all 0.3s ease 0s;
  }

  img {
    border-radius: 12px;
  }
`;

const PostCardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const PostCardContentLink = css`
  position: relative;
  display: block;
  color: ${colors.darkgrey};

  :hover {
    text-decoration: none;
  }
`;

const PostCardPrimaryTag = styled.div`
  margin: 15px 0 0.2em;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${lighten('0.1', colors.midgrey)};
  letter-spacing: 0.2px;

  a {
    font-size: 1.2rem;
  }
`;

const PostCardTitle = styled.h2`
  margin: 0 0 0.4em;
  line-height: 1.15em;
  color: var(--post-card-title);
`;

const PostCardExcerpt = styled.section`
  font-size: 1.6rem;
  color: var(--post-card-description);

  p {
    overflow: hidden;
    display: -webkit-box;
    width: 100%;
    margin-bottom: 0.4em;
    font-size: 1.4rem;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

const PostCardMeta = styled.footer`
  display: flex;
  align-items: flex-start;
  padding: 0;
`;

const PostCardBylineContent = styled.div`
  display: flex;
  flex: 1 1 50%;
  flex-direction: column;
  font-weight: 400;
  line-height: 1.4em;
  color: ${lighten('0.1', colors.midgrey)};
  letter-spacing: 0.2px;

  time {
    font-size: 1.3rem;
  }

  span {
    margin: 0;
    font-size: 1.3rem;
  }

  a {
    font-weight: 600;
    color: var(--post-card-by-line);
  }
`;

export const AuthorProfileImage = css`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: var(--background-color);
  border-radius: 100%;

  img {
    border-radius: 100%;
  }
`;
