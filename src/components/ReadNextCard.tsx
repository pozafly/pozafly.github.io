import { Link } from 'gatsby';

import styled from '@emotion/styled';
import { format } from 'date-fns';
import { kebabCase } from 'lodash-es';
import { lighten } from 'polished';

import { colors } from '../styles/colors';

export type ReadNextProps = {
  tags: string[];
  currentPageSlug: string;
  relatedPosts: {
    totalCount: number;
    edges: Array<{
      node: {
        frontmatter: {
          title: string;
          date: string;
        };
        fields: {
          readingTime: {
            text: string;
          };
          slug: string;
        };
      };
    }>;
  };
};

export function ReadNextCard(props: ReadNextProps) {
  // filter out current post and limit to 3 related posts
  const relatedPosts = props.relatedPosts.edges
    .filter((post) => post.node.fields.slug !== props.currentPageSlug)
    .slice(0, 3);

  return (
    <ReadNextCardArticle className="read-next-card">
      <header className="read-next-card-header">
        <ReadNextCardHeaderTitle>
          <span>More in</span>{' '}
          <Link to={`/tags/${kebabCase(props.tags[0])}/`}>{props.tags[0]}</Link>
        </ReadNextCardHeaderTitle>
      </header>
      <ReadNextCardContent className="read-next-card-content">
        <ul>
          {relatedPosts.map((n) => {
            const date = new Date(n.node.frontmatter.date);
            const datetime = format(date, 'yyyy-MM-dd');
            const displayDatetime = format(date, 'yyyy-MM-dd');

            return (
              <li key={n.node.frontmatter.title}>
                <h4>
                  <Link to={n.node.fields.slug}>{n.node.frontmatter.title}</Link>
                </h4>
                <ReadNextCardMeta className="read-next-card-meta">
                  <p>
                    <time dateTime={datetime}>{displayDatetime}</time> -{' '}
                    {n.node.fields.readingTime.text}
                  </p>
                </ReadNextCardMeta>
              </li>
            );
          })}
        </ul>
      </ReadNextCardContent>
      <ReadNextCardFooter className="read-next-card-footer">
        <Link to={`/tags/${kebabCase(props.tags[0])}/`}>
          {props.relatedPosts.totalCount > 1 && `See all ${props.relatedPosts.totalCount} posts`}
          {props.relatedPosts.totalCount === 1 && '1 post'}
          {props.relatedPosts.totalCount === 0 && 'No posts'} →
        </Link>
      </ReadNextCardFooter>
    </ReadNextCardArticle>
  );
}

const ReadNextCardArticle = styled.article`
  display: flex;
  position: relative;
  flex: 0 1 326px;
  flex-direction: column;
  margin: 0 25px 50px;
  padding: 25px;
  overflow: hidden;
  border-radius: 3px;
  background: linear-gradient(
    ${lighten('0.02', colors.darkgrey)},
    ${lighten('-0.05', colors.darkgrey)}
  );

  a {
    transition: all 0.2s ease-in-out;
  }

  a:hover {
    text-decoration: none;
  }

  @media (max-width: 1170px) {
    flex: 1 1 261px;
    margin-bottom: 5vw;
  }

  @media (max-width: 650px) {
    display: none;

    flex: 1 1 auto;
    margin: 0 25px;
    padding: 0;
    background: none;
  }
`;

const ReadNextCardHeaderTitle = styled.h3`
  margin: 0;
  color: rgb(255 255 255 / 0.6);
  font-size: 1.3rem;
  font-weight: 300;
  letter-spacing: 0.4px;
  line-height: 1em;

  span,
  a {
    font-size: inherit;
  }

  a {
    opacity: 0.8;
    color: #fff;
    font-weight: 500;
    text-decoration: none;
  }

  a:hover {
    opacity: 1;
  }
`;

const ReadNextCardContent = styled.div`
  font-size: 1.3rem;

  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
    padding: 20px 0;
    border-bottom: rgb(255 255 255 / 0.1);
  }

  li:last-of-type {
    padding-bottom: 5px;
    border: none;
  }

  h4 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 1.6em;
  }

  li a {
    display: block;
    opacity: 0.8;
    color: #fff;
    font-size: inherit;
  }

  li a:hover {
    opacity: 1;
  }
`;

const ReadNextCardMeta = styled.div`
  margin-top: 2px;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.4em;

  p {
    margin: 0;
    color: rgb(255 255 255 / 0.6);
    font-size: inherit;

    time {
      font-size: inherit;
    }
  }
`;

const ReadNextCardFooter = styled.footer`
  position: relative;
  margin: 40px 0 5px;

  a {
    padding: 7px 12px 8px 14px;
    transition: all 0.35s ease-in-out;
    border: 1px solid rgb(255 255 255 / 0.6);
    border-radius: 999px;
    color: rgb(255 255 255 / 0.6);
    font-size: 1.3rem;
  }

  a:hover {
    border-color: ${colors.yellow};
    color: ${colors.yellow};
    text-decoration: none;
  }
`;
