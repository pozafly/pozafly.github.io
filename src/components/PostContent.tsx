import React from 'react';
import styled from '@emotion/styled';
import RehypeReact from 'rehype-react';

import { colors } from '../styles/colors';
import prism from '../styles/prism';
import { Theme } from '@emotion/react';

const renderAst = new RehypeReact({
  createElement: React.createElement,
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
  margin: 0 auto;
  padding: 0 100px 6vw;
  min-height: 230px;
  font-size: 2rem;
  line-height: 1.6em;
  background: ${({ theme }: { theme: Theme }) =>
    theme.global.body.backgroundColor};
  border-radius: 6px;

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
    margin: 0 0 1.5em 0;
    min-width: 100%;
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
    color: ${({ theme }: { theme: Theme }) =>
      theme.global.postContent.strongColor};
  }

  small {
    display: inline-block;
    line-height: 1.6em;
  }

  img,
  video {
    display: block;
    margin: 2em auto;
    max-width: 840px;
    height: auto;
    border-radius: 6px;
    border: 1px solid
      ${({ theme }: { theme: Theme }) => theme.global.main.imageBorderColor};
  }
  @media (max-width: 1040px) {
    img,
    video {
      width: 100%;
    }
  }

  img[src$='#full'] {
    max-width: none;
    width: 100vw;
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
    border-left: 3px solid
      ${({ theme }: { theme: Theme }) => theme.global.main.imageBorderColor};
  }
  @media (max-width: 500px) {
    blockquote {
      padding: 0 1.3em;
    }
  }

  blockquote p {
    margin: 0 0 1em 0;
    color: inherit;
    font-size: inherit;
    line-height: inherit;
    font-style: italic;
  }

  blockquote p:last-child {
    margin-bottom: 0;
  }

  code {
    padding: 0 5px 2px;
    font-size: 0.8em;
    line-height: 1em;
    font-weight: 400 !important;
    background: ${({ theme }: { theme: Theme }) =>
      theme.global.postContent.codeColor};
    border-radius: 3px;
    color: ${({ theme }: { theme: Theme }) =>
      theme.global.postContent.codeColor};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  p code {
    word-break: keep-all;
  }

  pre {
    overflow-x: auto;
    padding: 20px;
    max-width: 100%;
    color: ${colors.whitegrey};
    font-size: 1.4rem;
    line-height: 1.5em;
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

  hr + p {
    margin-top: 1.2em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }: { theme: Theme }) => theme.global.main.headerColor};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  h1 {
    margin: 0.5em 0 0.4em;
    font-size: 4.2rem;
    line-height: 1.25em;
    font-weight: 600;
  }
  p + h1 {
    margin-top: 0.8em;
  }
  @media (max-width: 800px) {
    h1 {
      font-size: 3.2rem;
      line-height: 1.25em;
    }
  }

  h2 {
    margin: 0.5em 0 0.4em;
    font-size: 3.2rem;
    line-height: 1.25em;
    font-weight: 600;
  }
  p + h2 {
    margin-top: 0.8em;
  }
  @media (max-width: 800px) {
    h2 {
      margin-bottom: 0.3em;
      font-size: 2.8rem;
      line-height: 1.25em;
    }
  }

  h3 {
    margin: 0.5em 0 0.2em;
    font-size: 2.5rem;
    line-height: 1.3em;
    font-weight: 600;
  }
  h2 + h3 {
    margin-top: 0.7em;
  }
  @media (max-width: 800px) {
    h3 {
      margin-bottom: 0.3em;
      font-size: 2.4rem;
      line-height: 1.3em;
    }
  }

  h4 {
    margin: 0.5em 0 0.2em;
    font-size: 1.8rem;
    font-weight: 600;
  }
  h2 + h4 {
    margin-top: 0.7em;
  }
  h3 + h4 {
    margin-top: 0;
  }
  @media (max-width: 800px) {
    h4 {
      margin-bottom: 0.3em;
      font-size: 1.8rem;
      line-height: 1.3em;
    }
  }

  h5 {
    display: block;
    margin: 0.5em 0;
    padding: 0.4em 1em 0.9em;
    border: 0;
    color: ${colors.blue};
    font-size: 3.2rem;
    line-height: 1.35em;
    text-align: center;
  }
  @media (min-width: 1180px) {
    h5 {
      max-width: 1060px;
    }
  }
  @media (max-width: 800px) {
    h5 {
      margin-bottom: 1em;
      margin-left: 1.3em;
      padding: 0 0 0.5em;
      font-size: 2.4rem;
      text-align: initial;
    }
  }

  h6 {
    margin: 0.5em 0 0.2em 0;
    font-size: 2rem;
    font-weight: 700;
  }
  @media (max-width: 800px) {
    h6 {
      font-size: 1.8rem;
      line-height: 1.4em;
    }
  }

  table {
    display: inline-block;
    overflow-x: auto;
    margin: 0.5em 0 2.5em;
    max-width: 100%;
    width: auto;
    border-spacing: 0;
    border-collapse: collapse;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.6rem;
    white-space: nowrap;
    vertical-align: top;
  }

  table {
    -webkit-overflow-scrolling: touch;
    background: radial-gradient(
          ellipse at left,
          rgba(0, 0, 0, 0.2) 0%,
          rgba(0, 0, 0, 0) 75%
        )
        0 center,
      radial-gradient(
          ellipse at right,
          rgba(0, 0, 0, 0.2) 0%,
          rgba(0, 0, 0, 0) 75%
        )
        100% center;
    background-attachment: scroll, scroll;
    background-size: 10px 100%, 10px 100%;
    background-repeat: no-repeat;
  }

  table td:first-of-type {
    background-image: ${({ theme }: { theme: Theme }) =>
      theme.global.postContent.tableFirstOfTypeColor};
    background-size: 20px 100%;
    background-repeat: no-repeat;
  }

  table td:last-child {
    background-image: ${({ theme }: { theme: Theme }) =>
      theme.global.postContent.tableLastOfTypeColor};
    background-position: 100% 0;
    background-size: 20px 100%;
    background-repeat: no-repeat;
  }

  table th {
    color: ${({ theme }: { theme: Theme }) =>
      theme.global.postContent.tableThColor};
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.2px;
    text-align: left;
    text-transform: uppercase;
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.global.postContent.tableThBackground};
  }

  table th,
  table td {
    padding: 6px 12px;
    border: ${({ theme }: { theme: Theme }) =>
        theme.global.postContent.tableThBorderColor}
      1px solid;
  }

  figcaption {
    color: ${({ theme }: { theme: Theme }) =>
      theme.global.postContent.figcaptionColor};
  }
`;

export default PostContent;
