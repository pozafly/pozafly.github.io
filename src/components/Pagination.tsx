import { Link } from 'gatsby';
import React from 'react';
import { darken } from 'polished';
import { css } from '@emotion/react';

import { colors } from '../styles/colors';

export type PaginationProps = {
  currentPage: number;
  numPages: number;
};

function Pagination({ currentPage, numPages }: PaginationProps) {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/' : `../${(currentPage - 1).toString()}`;
  const nextPage = `../${(currentPage + 1).toString()}`;

  return (
    <nav css={navCss}>
      <div>
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            {/* << symbol */}
            {String.fromCharCode(171)}
          </Link>
        )}

        {Array.from({ length: numPages }, (_, i) => (
          <Link
            key={`pagination-number${i + 1}`}
            className={i + 1 === currentPage ? 'active' : ''}
            to={`/${i === 0 ? '' : i + 1}`}
          >
            {i + 1}
          </Link>
        ))}

        {!isLast && (
          <Link to={nextPage} rel="next">
            {/* >> symbol */}
            {String.fromCharCode(187)}
          </Link>
        )}
      </div>
    </nav>
  );
}

const navCss = css`
  text-align: center;
  div {
    display: inline-block;
  }

  a {
    font-family: -apple-system, BlinkMacSystemFont,'Segoe UI',Roboto,'Noto Sans','Ubuntu','Droid Sans','Helvetica Neue',sans-serif;
    font-size: 1.5rem;
    background: #fff;
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color 0.3s;
    margin: 0 4px;
    box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
    border-radius: 6px;
    margin-bottom: 5px;
    min-width: 50px;

    &.active {
      background-color: #b3b3b3;
    }

    &:hover:not(.active) {
      background-color: #ddd;
    }

    &:hover {
      text-decoration: none;
    }
  }
`;

export default Pagination;
