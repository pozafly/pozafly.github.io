import { css, Theme } from '@emotion/react';

export default (theme: Theme) => css`
  *:not(pre) > code[class*='language-'] {
    border-radius: 0.3em;
    background: var(--little-code-background);
    border: 1px solid var(--little-code-border);
    color: var(--main-color);
    padding: 0.15em 0.5em;
    white-space: normal;
    font-size: 13px;

    @media (max-width: 800px) {
      display: inline;
    }
  }

  .gatsby-highlight-code-line {
    display: block;
    margin-right: -1.3125rem;
    margin-left: -1.3125rem;
    padding-right: 1em;
    padding-left: 1.25em;
    background-color: var(--prism-background);
    border-left: 0.25em solid var(--prism-border-left);
    font-size: 1.4rem;
  }

  .gatsby-highlight {
    margin-bottom: 1.75rem;
    margin-left: -1.3125rem;
    margin-right: -1.3125rem;
    border-radius: 10px;
    background: var(--highlight-background);
    box-shadow: inset 0 0 0 1px var(--highlight-border);
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }

  .gatsby-highlight pre[class*='language-'] {
    float: left;
    min-width: 100%;
    font-size: 1.4rem;
    line-height: 24px;
  }

  pre[class*='language-'],
  code[class*='language-'] {
    color: var(--pre-code-color);
    text-shadow: none;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.8;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;

    &::-webkit-scrollbar {
      background-color: transparent;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: hsla(230, 5%, 35%, 1);
    }

    @media (max-width: 800px) {
      display: inline-block;
    }
  }

  pre[class*='language-'] {
    overflow: auto;
  }

  .token {
    font-size: 1.4rem;
  }

  pre[data-line] {
    padding: 1em 0 1em 3em;
    position: relative;
  }

  @media print {
    pre[class*='language-'],
    code[class*='language-'] {
      text-shadow: none;
    }
  }

  pre[class*='language-'] {
    padding: 1em;
    overflow: auto;
    margin: 0;
  }

  :not(pre) > code[class*='language-'] {
    padding: 0.1em 0.3em;
    border-radius: 0.3em;
    color: #c9d1d9;
    background: #343942;
  }
  /* Line highlighting */

  pre[data-line] {
    position: relative;
  }

  pre[class*='language-'] > code[class*='language-'] {
    position: relative;
    z-index: 1;
  }

  .line-highlight {
    position: absolute;
    left: 0;
    right: 0;
    padding: inherit 0;
    margin-top: 1em;
    background: #2f2a1e;
    box-shadow: inset 5px 0 0 #674c16;
    z-index: 0;
    pointer-events: none;
    line-height: inherit;
    white-space: pre;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #8b949e;
  }

  .token.punctuation {
    color: #c9d1d9;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #79c0ff;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #a5d6ff;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #a5d6ff;
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #a5d6ff;
  }

  .token.function {
    color: #d2a8ff;
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: #a8daff;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  ${theme.mode === 'light'
    ? `
  .token.comment,
  .token.prolog,
  .token.cdata {
    color: hsl(230, 4%, 64%);
  }

  .token.doctype,
  .token.punctuation,
  .token.entity {
    color: hsl(230, 8%, 24%);
  }

  .token.attr-name,
  .token.class-name,
  .token.boolean,
  .token.constant,
  .token.number,
  .token.atrule {
    color: hsl(35, 99%, 36%);
  }

  .token.keyword {
    color: hsl(301, 63%, 40%);
  }

  .token.property,
  .token.tag,
  .token.symbol,
  .token.deleted,
  .token.important {
    color: hsl(5, 74%, 59%);
  }

  .token.selector,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted,
  .token.regex,
  .token.attr-value,
  .token.attr-value > .token.punctuation {
    color: hsl(119, 34%, 47%);
  }

  .token.variable,
  .token.operator,
  .token.function {
    color: hsl(221, 87%, 60%);
  }

  .token.url {
    color: hsl(198, 99%, 37%);
  }

  .token.attr-value > .token.punctuation.attr-equals,
  .token.special-attr > .token.attr-value > .token.value.css {
    color: hsl(230, 8%, 24%);
  }

  .language-css .token.selector {
    color: hsl(5, 74%, 59%);
  }

  .language-css .token.property {
    color: hsl(230, 8%, 24%);
  }

  .language-css .token.function,
  .language-css .token.url > .token.function {
    color: hsl(198, 99%, 37%);
  }

  .language-css .token.url > .token.string.url {
    color: hsl(119, 34%, 47%);
  }

  .language-css .token.important,
  .language-css .token.atrule .token.rule {
    color: hsl(301, 63%, 40%);
  }

  .language-javascript .token.operator {
    color: hsl(301, 63%, 40%);
  }

  .language-javascript
    .token.template-string
    > .token.interpolation
    > .token.interpolation-punctuation.punctuation {
    color: hsl(344, 84%, 43%);
  }

  .language-json .token.operator {
    color: hsl(230, 8%, 24%);
  }

  .language-json .token.null.keyword {
    color: hsl(35, 99%, 36%);
  }

  .language-markdown .token.url,
  .language-markdown .token.url > .token.operator,
  .language-markdown .token.url-reference.url > .token.string {
    color: hsl(230, 8%, 24%);
  }

  .language-markdown .token.url > .token.content {
    color: hsl(221, 87%, 60%);
  }

  .language-markdown .token.url > .token.url,
  .language-markdown .token.url-reference.url {
    color: hsl(198, 99%, 37%);
  }

  .language-markdown .token.blockquote.punctuation,
  .language-markdown .token.hr.punctuation {
    color: hsl(230, 4%, 64%);
  }

  .language-markdown .token.code-snippet {
    color: hsl(119, 34%, 47%);
  }

  .language-markdown .token.bold .token.content {
    color: hsl(35, 99%, 36%);
  }

  .language-markdown .token.italic .token.content {
    color: hsl(301, 63%, 40%);
  }

  .language-markdown .token.strike .token.content,
  .language-markdown .token.strike .token.punctuation,
  .language-markdown .token.list.punctuation,
  .language-markdown .token.title.important > .token.punctuation {
    color: hsl(5, 74%, 59%);
  }

  .token.bold {
    font-weight: bold;
  }

  .token.entity {
    cursor: help;
  }

  .token.namespace {
    color: rgb(75 117 133);
  }

  .token.token.tab:not(:empty):before,
  .token.token.cr:before,
  .token.token.lf:before,
  .token.token.space:before {
    color: hsla(230, 8%, 24%, 0.2);
  }
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > button,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > a,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > span {
    background: hsl(230, 1%, 90%);
    color: hsl(230, 6%, 44%);
    padding: 0.1em 0.4em;
    border-radius: 0.3em;
  }

  div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus {
    background: hsl(230, 1%, 78%);
    color: hsl(230, 8%, 24%);
  }

  .line-highlight.line-highlight {
    background: hsla(230, 8%, 24%, 0.05);
  }

  .line-highlight.line-highlight:before,
  .line-highlight.line-highlight[data-end]:after {
    background: hsl(230, 1%, 90%);
    color: hsl(230, 8%, 24%);
    padding: 0.1em 0.6em;
    border-radius: 0.3em;
    box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2); /* same as Toolbar plugin default */
  }

  pre[id].linkable-line-numbers.linkable-line-numbers
    span.line-numbers-rows
    > span:hover:before {
    background-color: hsla(230, 8%, 24%, 0.05);
  }

  .line-numbers.line-numbers .line-numbers-rows,
  .command-line .command-line-prompt {
    border-right-color: hsla(230, 8%, 24%, 0.2);
  }

  .line-numbers .line-numbers-rows > span:before,
  .command-line .command-line-prompt > span:before {
    color: hsl(230, 1%, 62%);
  }

  .rainbow-braces .token.token.punctuation.brace-level-1,
  .rainbow-braces .token.token.punctuation.brace-level-5,
  .rainbow-braces .token.token.punctuation.brace-level-9 {
    color: hsl(5, 74%, 59%);
  }

  .rainbow-braces .token.token.punctuation.brace-level-2,
  .rainbow-braces .token.token.punctuation.brace-level-6,
  .rainbow-braces .token.token.punctuation.brace-level-10 {
    color: hsl(119, 34%, 47%);
  }

  .rainbow-braces .token.token.punctuation.brace-level-3,
  .rainbow-braces .token.token.punctuation.brace-level-7,
  .rainbow-braces .token.token.punctuation.brace-level-11 {
    color: hsl(221, 87%, 60%);
  }

  .rainbow-braces .token.token.punctuation.brace-level-4,
  .rainbow-braces .token.token.punctuation.brace-level-8,
  .rainbow-braces .token.token.punctuation.brace-level-12 {
    color: hsl(301, 63%, 40%);
  }

  pre.diff-highlight > code .token.token.deleted:not(.prefix),
  pre > code.diff-highlight .token.token.deleted:not(.prefix) {
    background-color: hsla(353, 100%, 66%, 0.15);
  }

  pre.diff-highlight > code .token.token.inserted:not(.prefix),
  pre > code.diff-highlight .token.token.inserted:not(.prefix) {
    background-color: hsla(137, 100%, 55%, 0.15);
  }

  .prism-previewer.prism-previewer:before,
  .prism-previewer-gradient.prism-previewer-gradient div {
    border-color: hsl(0, 0, 95%);
  }
  .prism-previewer.prism-previewer:after {
    border-top-color: hsl(0, 0, 95%);
  }

  .prism-previewer-flipped.prism-previewer-flipped.after {
    border-bottom-color: hsl(0, 0, 95%);
  }

  .prism-previewer-angle.prism-previewer-angle:before,
  .prism-previewer-time.prism-previewer-time:before,
  .prism-previewer-easing.prism-previewer-easing {
    background: hsl(0, 0%, 100%);
  }

  .prism-previewer-angle.prism-previewer-angle circle,
  .prism-previewer-time.prism-previewer-time circle {
    stroke: hsl(230, 8%, 24%);
    stroke-opacity: 1;
  }

  .prism-previewer-easing.prism-previewer-easing circle,
  .prism-previewer-easing.prism-previewer-easing path,
  .prism-previewer-easing.prism-previewer-easing line {
    stroke: hsl(230, 8%, 24%);
  }

  .prism-previewer-easing.prism-previewer-easing circle {
    fill: transparent;
  }
  `
    : ``}
`;
