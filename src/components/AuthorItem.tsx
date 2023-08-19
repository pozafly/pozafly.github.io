import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

import { css } from '@emotion/react';

import type { Author } from '../templates/post';
import { AuthorProfileImage } from './PostCard';
import styled from '@emotion/styled';

type AuthorItemProps = {
  author: Author;
};

export function AuthorItem({ author }: AuthorItemProps) {
  return (
    <AuthorItemLi className="author-list-item">
      <Link css={AuthorAvatar} className="author-avatar" to={'/about'}>
        <GatsbyImage
          image={getImage(author.avatar)!}
          css={AuthorProfileImage}
          className="author-profile-image"
          alt={author.name}
        />
      </Link>
    </AuthorItemLi>
  );
}

const AuthorItemLi = styled.li`
  position: relative;
  flex-shrink: 0;
  margin: 0;
  padding: 0;

  :hover .author-name-tooltip {
    opacity: 1;
    transform: translate(-10px, -2px);
  }
`;

const AuthorAvatar = css`
  display: block;
  overflow: hidden;
  margin: 0 -4px;
  width: 40px;
  height: 40px;
  border: 2px solid var(--author-border);
  border-radius: 100%;

  @media (max-width: 500px) {
    width: 36px;
    height: 36px;
  }
`;
