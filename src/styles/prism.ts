import { css } from '@emotion/react';

export default css`
  /* Start Syntax Highlighting */
  /* Taken from overreacted https://github.com/gaearon/overreacted.io/blob/942b41555f5e5ccbb5f93f6c26142cd90b314236/src/utils/global.css#L68 */
  code[class*='language-'],
  pre[class*='language-'] {
    color: white;
    @media (prefers-color-scheme: light) {
      color: black;
    }
    background: none;
    font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New,
      monospace;
    font-feature-settings: normal;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    margin-bottom: 0;

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

  /* Code blocks */
  pre[class*='language-'] {
    overflow: auto;
  }

  pre[class*='language-']::-moz-selection {
    /* Firefox */
    background: hsl(207, 4%, 16%);
  }

  pre[class*='language-']::selection {
    /* Safari */
    background: hsl(207, 4%, 16%);
  }

  /* Text Selection colour */
  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection {
    text-shadow: none;
    background: hsla(0, 0%, 100%, 0.15);
  }

  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection {
    text-shadow: none;
    background: hsla(0, 0%, 100%, 0.15);
  }

  /* Inline code */
  *:not(pre) > code[class*='language-'] {
    border-radius: 0.3em;
    /* background: #dcdcdc; */
    background: rgb(235, 235, 235);
    border: 1px solid rgb(236, 237, 244);
    color: #000;
    padding: 0.15em 0.5em;
    white-space: normal;

    @media (max-width: 800px) {
      display: inline;
    }

    @media (prefers-color-scheme: dark) {
      background: #3c4148;
      color: white;
      border: none;
      font-weight: 500 !important;
    }
  }

  .token {
    font-size: 1.4rem;
  }

  .token.attr-name {
    color: rgb(173, 219, 103);
    font-style: italic;
  }

  .token.comment {
    color: rgb(128, 147, 147);
  }

  .token.string,
  .token.url {
    color: rgb(173, 219, 103);
  }

  .token.variable {
    color: rgb(214, 222, 235);
  }

  .token.number {
    color: rgb(247, 140, 108);
  }

  .token.builtin,
  .token.char,
  .token.constant,
  .token.function {
    color: rgb(130, 170, 255);
  }

  .token.punctuation {
    color: rgb(199, 146, 234);
  }

  .token.selector,
  .token.doctype {
    color: rgb(199, 146, 234);
    font-style: 'italic';
  }

  .token.class-name {
    color: rgb(255, 203, 139);
  }

  .token.tag,
  .token.operator,
  .token.keyword {
    color: #ffa7c4;
  }

  .token.boolean {
    color: rgb(255, 88, 116);
  }

  .token.property {
    color: rgb(128, 203, 196);
  }

  .token.namespace {
    color: rgb(178, 204, 214);
  }

  pre[data-line] {
    padding: 1em 0 1em 3em;
    position: relative;
  }

  .gatsby-highlight-code-line {
    display: block;
    margin-right: -1.3125rem;
    margin-left: -1.3125rem;
    padding-right: 1em;
    padding-left: 1.25em;
    background-color: hsl(0deg 0% 20.82%);
    border-left: 0.25em solid #818181;
    @media (prefers-color-scheme: light) {
      background-color: hsl(0deg 0% 90.66%);
      border-left: 0.25em solid hsl(0deg 0% 82.88%);
    }
  }

  .gatsby-highlight {
    margin-bottom: 1.75rem;
    margin-left: -1.3125rem;
    margin-right: -1.3125rem;
    border-radius: 10px;
    background: rgb(32 36 39);
    @media (prefers-color-scheme: light) {
      background-color: #fafafa;
      border: 1px solid #d1d1d1;
    }
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }

  .gatsby-highlight pre[class*='language-'] {
    float: left;
    min-width: 100%;
    font-size: 1.5rem;
  }
  /* End Syntax Highlighting */

  @media (prefers-color-scheme: light) {
    code[class*='language-']::-moz-selection,
    code[class*='language-'] *::-moz-selection,
    pre[class*='language-'] *::-moz-selection {
      background: hsl(230, 1%, 90%);
      color: inherit;
    }

    code[class*='language-']::selection,
    code[class*='language-'] *::selection,
    pre[class*='language-'] *::selection {
      background: hsl(230, 1%, 90%);
      color: inherit;
    }
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

    /* HTML overrides */
    .token.attr-value > .token.punctuation.attr-equals,
    .token.special-attr > .token.attr-value > .token.value.css {
      color: hsl(230, 8%, 24%);
    }

    /* CSS overrides */
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

    /* JS overrides */
    .language-javascript .token.operator {
      color: hsl(301, 63%, 40%);
    }

    .language-javascript
      .token.template-string
      > .token.interpolation
      > .token.interpolation-punctuation.punctuation {
      color: hsl(344, 84%, 43%);
    }

    /* JSON overrides */
    .language-json .token.operator {
      color: hsl(230, 8%, 24%);
    }

    .language-json .token.null.keyword {
      color: hsl(35, 99%, 36%);
    }

    /* MD overrides */
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
      font-style: italic;
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

    /* General */
    .token.bold {
      font-weight: bold;
    }

    .token.comment,
    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }

    .token.namespace {
      /* opacity: 0.8; */
      color: rgb(75 117 133);
    }

    /* Plugin overrides */
    /* Selectors should have higher specificity than those in the plugins' default stylesheets */

    /* Show Invisibles plugin overrides */
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
      background: hsl(230, 1%, 78%); /* custom: darken(--syntax-bg, 20%) */
      color: hsl(230, 8%, 24%);
    }

    /* Line Highlight plugin overrides */
    /* The highlighted line itself */
    .line-highlight.line-highlight {
      background: hsla(230, 8%, 24%, 0.05);
    }

    /* Default line numbers in Line Highlight plugin */
    .line-highlight.line-highlight:before,
    .line-highlight.line-highlight[data-end]:after {
      background: hsl(230, 1%, 90%);
      color: hsl(230, 8%, 24%);
      padding: 0.1em 0.6em;
      border-radius: 0.3em;
      box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2); /* same as Toolbar plugin default */
    }

    /* Hovering over a linkable line number (in the gutter area) */
    /* Requires Line Numbers plugin as well */
    pre[id].linkable-line-numbers.linkable-line-numbers
      span.line-numbers-rows
      > span:hover:before {
      background-color: hsla(230, 8%, 24%, 0.05);
    }

    /* Line Numbers and Command Line plugins overrides */
    /* Line separating gutter from coding area */
    .line-numbers.line-numbers .line-numbers-rows,
    .command-line .command-line-prompt {
      border-right-color: hsla(230, 8%, 24%, 0.2);
    }

    /* Stuff in the gutter */
    .line-numbers .line-numbers-rows > span:before,
    .command-line .command-line-prompt > span:before {
      color: hsl(230, 1%, 62%);
    }

    /* Match Braces plugin overrides */
    /* Note: Outline colour is inherited from the braces */
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

    /* Diff Highlight plugin overrides */
    /* Taken from https://github.com/atom/github/blob/master/styles/variables.less */
    pre.diff-highlight > code .token.token.deleted:not(.prefix),
    pre > code.diff-highlight .token.token.deleted:not(.prefix) {
      background-color: hsla(353, 100%, 66%, 0.15);
    }

    pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection,
    pre.diff-highlight
      > code
      .token.token.deleted:not(.prefix)
      *::-moz-selection,
    pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection,
    pre
      > code.diff-highlight
      .token.token.deleted:not(.prefix)
      *::-moz-selection {
      background-color: hsla(353, 95%, 66%, 0.25);
    }

    pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection,
    pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection,
    pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection,
    pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection {
      background-color: hsla(353, 95%, 66%, 0.25);
    }

    pre.diff-highlight > code .token.token.inserted:not(.prefix),
    pre > code.diff-highlight .token.token.inserted:not(.prefix) {
      background-color: hsla(137, 100%, 55%, 0.15);
    }

    pre.diff-highlight
      > code
      .token.token.inserted:not(.prefix)::-moz-selection,
    pre.diff-highlight
      > code
      .token.token.inserted:not(.prefix)
      *::-moz-selection,
    pre
      > code.diff-highlight
      .token.token.inserted:not(.prefix)::-moz-selection,
    pre
      > code.diff-highlight
      .token.token.inserted:not(.prefix)
      *::-moz-selection {
      background-color: hsla(135, 73%, 55%, 0.25);
    }

    pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection,
    pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection,
    pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection,
    pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection {
      background-color: hsla(135, 73%, 55%, 0.25);
    }

    /* Previewers plugin overrides */
    /* Based on https://github.com/atom-community/atom-ide-datatip/blob/master/styles/atom-ide-datatips.less and https://github.com/atom/atom/blob/master/packages/one-light-ui */
    /* Border around popup */
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

    /* Background colour within the popup */
    .prism-previewer-angle.prism-previewer-angle:before,
    .prism-previewer-time.prism-previewer-time:before,
    .prism-previewer-easing.prism-previewer-easing {
      background: hsl(0, 0%, 100%);
    }

    /* For angle, this is the positive area (eg. 90deg will display one quadrant in this colour) */
    /* For time, this is the alternate colour */
    .prism-previewer-angle.prism-previewer-angle circle,
    .prism-previewer-time.prism-previewer-time circle {
      stroke: hsl(230, 8%, 24%);
      stroke-opacity: 1;
    }

    /* Stroke colours of the handle, direction point, and vector itself */
    .prism-previewer-easing.prism-previewer-easing circle,
    .prism-previewer-easing.prism-previewer-easing path,
    .prism-previewer-easing.prism-previewer-easing line {
      stroke: hsl(230, 8%, 24%);
    }

    /* Fill colour of the handle */
    .prism-previewer-easing.prism-previewer-easing circle {
      fill: transparent;
    }
  }
`;
