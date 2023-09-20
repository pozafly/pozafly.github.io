import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { AuthorProfileImage } from './PostCard';

import type { Author } from '../templates/post';

type AuthorItemProps = {
  author: Author;
};

export function AuthorItem({ author }: AuthorItemProps) {
  const imageSrc = getImage(author.avatar);

  return (
    <AuthorItemLi className="author-list-item">
      <Link css={AuthorAvatar} className="author-avatar" to={'/about'}>
        {imageSrc && (
          <GatsbyImage
            image={imageSrc}
            css={AuthorProfileImage}
            className="author-profile-image"
            alt={author.name}
          />
        )}
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
    transform: translate(-10px, -2px);
    opacity: 1;
  }
`;

const AuthorAvatar = css`
  overflow: hidden;
  display: block;
  width: 40px;
  height: 40px;
  margin: 0 -4px;
  border: 2px solid var(--author-border);
  border-radius: 100%;

  @media (max-width: 500px) {
    width: 36px;
    height: 36px;
  }
`;
