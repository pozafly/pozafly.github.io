import { Link } from 'gatsby';
import React from 'react';
import { css } from '@emotion/react';

export type PaginationProps = {
  currentPage: number;
  numPages: number;
};

function Pagination({ currentPage, numPages }: PaginationProps) {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const isEndFirst = currentPage > 3;
  const isEndLast = currentPage <= numPages - 3;
  const prevPage =
    currentPage - 1 === 1 ? '/' : `../${(currentPage - 1).toString()}`;
  const nextPage = `../${(currentPage + 1).toString()}`;

  return (
    <nav css={navCss}>
      <div>
        {isEndFirst && (
          <Link to="/" rel="prev">
            {/* << symbol */}
            {String.fromCharCode(171)}
          </Link>
        )}

        {!isFirst && (
          <Link to={prevPage} rel="prev">
            {'‹'}
          </Link>
        )}

        {Array.from(
          { length: numPages },
          (_, i) =>
            i > currentPage - 4 &&
            i < currentPage + 2 && (
              <Link
                key={`pagination-number${i + 1}`}
                className={i + 1 === currentPage ? 'active' : ''}
                to={`/${i === 0 ? '' : i + 1}`}
              >
                {i + 1}
              </Link>
            )
        )}

        {!isLast && (
          <Link to={nextPage} rel="next">
            {'›'}
          </Link>
        )}

        {isEndLast && (
          <Link to={`/${numPages}`} rel="next">
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
  margin-bottom: 32px;
  div {
    display: inline-block;
    padding: 10px;
    background: rgba(25, 27, 31, 0.1);
    border-radius: 100px;
  }

  a {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.5rem;
    background: #fff;
    color: black;
    float: left;
    text-decoration: none;
    transition: background-color 0.3s;
    margin: 0 4px;
    box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px,
      rgba(39, 44, 49, 0.03) 1px 3px 8px;
    border-radius: 100px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

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

  @media (prefers-color-scheme: dark) {
    div {
      background: rgba(255, 255, 255, 0.1);
    }
    a {
      background: #000;
      color: #fff;

      &.active {
        background-color: #626262;
      }
      &:hover:not(.active) {
        background-color: #272727;
      }
    }
  }

  @media (max-width: 650px) {
    a {
      margin: 0 2px;
      width: 32px;
      height: 32px;
    }
  }
`;

export default Pagination;
