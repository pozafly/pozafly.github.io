import { Link } from 'gatsby';

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
  const prevPage = currentPage - 1 === 1 ? '/' : `../${(currentPage - 1).toString()}`;
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
            ),
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
  margin-bottom: 32px;
  text-align: center;

  div {
    display: inline-block;
    padding: 10px;
    background: rgb(25 27 31 / 0.1);
    border-radius: 100px;
  }

  a {
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin: 0 4px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', 'Ubuntu',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.5rem;
    color: black;
    text-decoration: none;
    background: #fff;
    border-radius: 100px;
    box-shadow:
      rgb(39 44 49 / 0.06) 8px 14px 38px,
      rgb(39 44 49 / 0.03) 1px 3px 8px;
    transition: background-color 0.3s;

    &.active {
      background-color: #b3b3b3;
    }

    &:hover {
      text-decoration: none;
    }

    &:hover:not(.active) {
      background-color: #ddd;
    }
  }

  @media (prefers-color-scheme: dark) {
    div {
      background: rgb(255 255 255 / 0.1);
    }

    a {
      color: #fff;
      background: #000;

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
      width: 32px;
      height: 32px;
      margin: 0 2px;
    }
  }
`;

export default Pagination;
