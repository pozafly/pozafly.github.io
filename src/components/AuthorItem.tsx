import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { lighten } from 'polished';
import React from 'react';

import { css } from '@emotion/react';

import { colors } from '../styles/colors';
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
  border: #fff 2px solid;
  border-radius: 100%;
  transition: all 0.5s cubic-bezier(0.4, 0.01, 0.165, 0.99) 700ms;

  @media (max-width: 500px) {
    width: 36px;
    height: 36px;
  }

  @media (prefers-color-scheme: dark) {
    border-color: ${lighten('0.02', colors.darkgrey)};
  }
`;
