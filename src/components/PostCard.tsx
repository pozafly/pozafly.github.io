import { format } from 'date-fns';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { kebabCase } from 'lodash';
import { lighten } from 'polished';
import React from 'react';
import _ from 'lodash';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from '../styles/colors';
import type { PageContext } from '../templates/post';
import config from '../website-config';

export type PostCardProps = {
  post: PageContext;
  isLarge?: boolean;
  isNext?: boolean;
};

export function PostCard({
  post,
  isLarge = false,
  isNext = false,
}: PostCardProps) {
  const date = new Date(post.frontmatter.date);
  const datetime = format(date, 'yyyy-MM-dd');
  const displayDatetime = format(date, 'yyyy-MM-dd');

  return (
    <article
      className={`post-card ${post.frontmatter.image ? '' : 'no-image'} ${
        isLarge ? 'post-card-large' : ''
      }`}
      css={[PostCardStyles, isLarge && PostCardLarge]}
    >
      {post.frontmatter.image && (
        <Link
          className="post-card-image-link"
          css={PostCardImageLink}
          to={post.fields.slug}
        >
          <PostCardImage
            className={`post-card-image ${isNext ? 'is-next' : ''}`}
          >
            {post.frontmatter?.image && (
              <GatsbyImage
                image={getImage(post.frontmatter.image)!}
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
              <React.Fragment key={tag}>
                {idx > 0 && <>, &nbsp;</>}
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </React.Fragment>
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
        <Link
          className="post-card-content-link"
          css={PostCardContentLink}
          to={post.fields.slug}
        >
          <header>
            <PostCardTitle className="post-card-title">
              {post.frontmatter.title}
            </PostCardTitle>
          </header>
          <PostCardExcerpt className="post-card-excerpt">
            <p>{post.frontmatter.excerpt || post.excerpt}</p>
          </PostCardExcerpt>
        </Link>
        <PostCardMeta className="post-card-meta">
          <PostCardBylineContent className="post-card-byline-content">
            <span className="post-card-byline-date">
              <time dateTime={datetime}>{displayDatetime}</time>{' '}
              <span className="bull">&bull;</span>{' '}
              <span>{post.fields.readingTime.text}</span>
            </span>
          </PostCardBylineContent>
        </PostCardMeta>
      </PostCardContent>
    </article>
  );
}

const PostCardStyles = css`
  position: relative;
  flex: 1 1 301px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 20px 60px;
  min-height: 220px;
  background-size: cover;
  /* transition: 0.4s ease; */
`;

const PostCardLarge = css`
  p {
    display: block;
  }
  @media (min-width: 795px) {
    flex: 1 1 100%;
    flex-direction: row;
    padding-bottom: 40px;
    min-height: 280px;
    border-top: 0;

    :not(.no-image) .post-card-header {
      margin-top: 0;
    }

    .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      margin-bottom: 0;
      min-height: 380px;
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

    .post-card-content-link {
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
  display: block;
  overflow: hidden;
  border-radius: 12px;
  overflow: hidden;
`;

const PostCardImage = styled.div`
  width: auto;
  height: 200px;
  background-size: cover;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--image-border-color);
  background: var(--background-color);

  /* &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.2);
    transition: opacity 0.3s ease 0s;
  } */

  img {
    border-radius: 12px;
  }
  /* &:hover:after {
    opacity: 1;
  } */
  &.is-next {
    border: 1px solid hsl(230deg 6% 23%);
  }
`;

const PostCardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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
  color: ${lighten('0.1', colors.midgrey)};
  font-size: 1.2rem;
  font-weight: 500;
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
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 0.4em;
    font-size: 1.4rem;
  }
`;

const PostCardMeta = styled.footer`
  display: flex;
  align-items: flex-start;
  padding: 0;
`;

const PostCardBylineContent = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  color: ${lighten('0.1', colors.midgrey)};
  line-height: 1.4em;
  font-weight: 400;
  letter-spacing: 0.2px;

  time {
    font-size: 1.3rem;
  }
  span {
    margin: 0;
    font-size: 1.3rem;
  }

  a {
    color: var(--post-card-by-line);
    font-weight: 600;
  }
`;

export const AuthorProfileImage = css`
  display: block;
  width: 100%;
  height: 100%;
  background: ${lighten('0.1', colors.lightgrey)};
  border-radius: 100%;
  object-fit: cover;
  background: var(--background-color);
  img {
    border-radius: 100%;
  }
`;
