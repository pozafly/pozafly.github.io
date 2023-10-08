/* eslint-disable  @typescript-eslint/no-explicit-any */
import { createElement } from 'react';

import styled from '@emotion/styled';
import RehypeReact from 'rehype-react';

import { colors } from '../styles/colors';
import prism from '../styles/prism';

const renderAst = new RehypeReact({
  createElement: createElement,
  components: {},
}).Compiler;

const Ast = ({ ast, ...props }: any) => {
  ast.properties = props;
  return renderAst(ast);
};

export type PostContentProps = {
  htmlAst: any;
};

function PostContent({ htmlAst }: PostContentProps) {
  return (
    <PostFullContent className="post-full-content" css={prism}>
      <Ast className="post-content" ast={htmlAst} />
    </PostFullContent>
  );
}

export const PostFullContent = styled.section`
  position: relative;
  min-height: 230px;
  margin: 0 auto;
  padding: 0 100px 6vw;
  font-size: 2rem;
  line-height: 1.6em;
  background: var(--background-color);
  border-radius: 6px;

  .no-image {
    padding-top: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  dl,
  pre,
  blockquote,
  .post-full-comments,
  .footnotes {
    min-width: 100%;
    margin: 0 0 1.5em;
  }

  li > ul,
  li > ol {
    margin: 0;
  }

  li {
    word-break: break-word;
  }

  li p {
    margin: 0;
  }

  a {
    color: #0a84ff;
  }

  a[class*='image'],
  a[class*='image']:hover {
    box-shadow: none;

    span[class*='image'] {
      border-radius: 6px;
    }
  }

  strong,
  em {
    color: var(--strong-color);
  }

  small {
    display: inline-block;
    line-height: 1.6em;
  }

  img,
  video {
    display: block;
    max-width: 840px;
    height: auto;
    margin: 2em auto;
    border: 1px solid var(--image-border-color);
    border-radius: 8px;
  }

  hr + p {
    margin-top: 1.2em;
  }

  img[src$='#full'] {
    width: 100vw;
    max-width: none;
  }

  img + br + small {
    display: block;
    margin-top: -3em;
    margin-bottom: 1.5em;
    text-align: center;
  }

  iframe {
    margin: 10px auto 20px;
  }

  blockquote {
    margin: 0 0 1.5em;
    padding: 0 1.5em;
    border-left: 3px solid var(--image-border-color);
  }

  blockquote p {
    margin: 0 0 1em;
    font-size: inherit;
    font-style: italic;
    line-height: inherit;
    color: inherit;
  }

  blockquote p:last-child {
    margin-bottom: 0;
  }

  code {
    padding: 0 5px 2px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', 'Ubuntu',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 0.8em;
    font-weight: 400 !important;
    line-height: 1em;
    border-radius: 3px;
  }

  p code {
    word-break: keep-all;
  }

  pre {
    overflow-x: auto;
    max-width: 100%;
    padding: 20px;
    font-size: 1.4rem;
    line-height: 1.5em;
    color: ${colors.whitegrey};
    border-radius: 5px;
  }

  pre code {
    padding: 0;
    font-size: inherit;
    line-height: inherit;
    background: transparent;
  }

  pre code :not(span) {
    color: inherit;
  }

  .fluid-width-video-wrapper {
    margin: 1.5em 0 3em;
  }

  hr {
    margin: 2em 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', 'Ubuntu',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    color: var(--home-header-color);
  }

  h1 {
    margin: 0.5em 0 0.4em;
    font-size: 4.2rem;
    font-weight: 600;
    line-height: 1.25em;
  }

  p + h1 {
    margin-top: 0.8em;
  }

  h2 {
    margin: 1.2em 0 0.6em;
    font-size: 3.4rem;
    font-weight: 600;
    line-height: 1.25em;
  }

  p + h2 {
    margin-top: 0.8em;
  }

  h3 {
    margin: 1rem 0 0.2em;
    padding-top: 1.8rem;
    font-size: 2.6rem;
    font-weight: 600;
    line-height: 1.3em;
  }

  h2 + h3 {
    margin-top: 0.7em;
  }

  h4 {
    margin: 1em 0 0.2em;
    font-size: 1.8rem;
    font-weight: 600;
  }

  h2 + h4 {
    margin-top: 0.7em;
  }

  h3 + h4 {
    margin-top: 0;
  }

  h5 {
    display: block;
    margin: 0.5em 0;
    padding: 0.4em 1em 0.9em;
    font-size: 1.4rem;
    line-height: 1.35em;

    /* color: ${colors.blue}; */

    /* text-align: center; */
    border: 0;
  }

  h6 {
    margin: 0.5em 0 0.2em;
    font-size: 2rem;
    font-weight: 700;
  }

  table {
    overflow-x: auto;
    display: inline-block;
    border-spacing: 0;
    border-collapse: collapse;
    width: auto;
    max-width: 100%;
    margin: 0.5em 0 2.5em;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', 'Ubuntu',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.6rem;
    white-space: nowrap;
    vertical-align: top;
    background:
      radial-gradient(ellipse at left, rgb(0 0 0 / 0.2) 0%, rgb(0 0 0 / 0) 75%) 0 center,
      radial-gradient(ellipse at right, rgb(0 0 0 / 0.2) 0%, rgb(0 0 0 / 0) 75%) 100% center;
    background-repeat: no-repeat;
    background-attachment: scroll, scroll;
    background-size:
      10px 100%,
      10px 100%;
    -webkit-overflow-scrolling: touch;
  }

  table th {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--home-header-color);
    text-align: left;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    background-color: var(--table-th-background);
  }

  table th,
  table td {
    padding: 6px 12px;
    border: var(--table-th-border) 1px solid;
  }

  table td:first-of-type {
    background-image: var(--table-first-of-type);
    background-repeat: no-repeat;
    background-size: 20px 100%;
  }

  table td:last-child {
    background-image: var(--table-last-of-type);
    background-repeat: no-repeat;
    background-position: 100% 0;
    background-size: 20px 100%;
  }

  figcaption {
    color: var(--figcaption-color);
  }

  @media (max-width: 1170px) {
    padding: 0 11vw;
  }

  @media (max-width: 800px) {
    padding: 0 5vw;
    font-size: 1.8rem;
  }

  @media (max-width: 500px) {
    padding: 0;
  }

  @media (max-width: 500px) {
    .post-full-custom-excerpt {
      font-size: 1.9rem;
      line-height: 1.5em;
    }
  }

  @media (max-width: 500px) {
    p,
    ul,
    ol,
    dl,
    pre,
    .post-full-comments,
    .footnotes {
      margin-bottom: 1.28em;
    }
  }

  @media (max-width: 1040px) {
    img,
    video {
      width: 100%;
    }
  }

  @media (max-width: 500px) {
    blockquote {
      padding: 0 1.3em;
    }
  }

  @media (max-width: 800px) {
    h1 {
      font-size: 3.2rem;
      line-height: 1.25em;
    }

    h2 {
      margin: 0.5rem 0 0.3em;
      font-size: 2.8rem;
      line-height: 1.25em;
    }

    h3 {
      margin: 0.5rem 0 0.3em;
      font-size: 2.4rem;
      line-height: 1.3em;
    }

    h4 {
      margin-bottom: 0.3em;
      font-size: 1.8rem;
      line-height: 1.3em;
    }

    h5 {
      max-width: 1060px;
      padding: 0 0 0.5em;
      font-size: 2.4rem;
      text-align: initial;
    }

    h6 {
      font-size: 1.8rem;
      line-height: 1.4em;
    }
  }
`;

export default PostContent;
