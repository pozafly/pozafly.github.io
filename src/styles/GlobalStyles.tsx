import { Global, css } from '@emotion/react';
import { colors } from './colors';
import { lighten, setLightness } from 'polished';

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        html,
        body,
        div,
        span,
        applet,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        big,
        cite,
        code,
        del,
        dfn,
        em,
        img,
        ins,
        kbd,
        q,
        s,
        samp,
        small,
        strike,
        strong,
        sub,
        sup,
        tt,
        var,
        dl,
        dt,
        dd,
        ol,
        fieldset,
        form,
        label,
        legend,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        hgroup,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video {
          margin: 0;
          padding: 0;
          border: 0;
          font: inherit;
          font-size: 16px;
          vertical-align: baseline;

          .copyright {
            font-size: 1.4rem;
            a {
              font-size: inherit;
            }
          }
          .error-front-page {
            font-size: 1.6rem;
          }
        }
        body {
          line-height: 1;
          word-break: keep-all;
        }

        body {
          &.light {
            --body-color: ${lighten('-0.3', colors.midgrey)};
            --background-color: #fff;
            --main-color: #000;
            --link-color: #0a0b0c;
            --border-top-color: ${lighten('0.1', colors.lightgrey)};
            --nav-background: rgba(255, 255, 255, 0.4);
            --header-color: var(--background-color);
            --header-after: var(--background-color);
            --header-before: rgba(0, 0, 0, 0.18);
            --author-border: #fff;
            --home-header-color: ${colors.darkgrey};
            --home-header-border-bottom: ${lighten('0.12', colors.lightgrey)};
            --header-author-link: ${colors.darkgrey};
            --no-image-border: ${lighten('0.12', colors.lightgrey)};
            --strong-font-weight: 600;
            --anchor-color: #768086;
            --loader-color: hsla(230, 40%, 10%, 0.8);
            --loader-color2: hsla(230, 40%, 10%, 0.2);
            --image-border-color: hsl(230, 25%, 94%);
            --post-card-title: rgb(21, 23, 26);
            --post-card-description: rgb(48, 58, 62);
            --post-card-by-line: ${lighten('0.2', colors.darkgrey)};
            --strong-color: ${lighten('-0.05', colors.darkgrey)};
            --figcaption-color: #000;
            --table-first-of-type: linear-gradient(
              to right,
              rgba(255, 255, 255, 1) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            --table-last-of-type: linear-gradient(
              to left,
              rgba(255, 255, 255, 1) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            --table-th-background: ${lighten('0.04', colors.whitegrey)};
            --table-th-border: ${lighten('-0.01', colors.whitegrey)};
            --tag-boxshadow: hsla(218, 53%, 10%, 12%);
            --tag-background: #f5f5f5;
            --post-full-border: ${lighten('0.1', colors.lightgrey)};
            --post-full-meta-link: ${lighten('0.1', colors.darkgrey)};
            --post-full-meta-link-hover: ${colors.darkgrey};
            --post-full-title: ${setLightness('0.05', colors.darkgrey)};
            --highlight-background: #fafafa;
            --highlight-border: #d1d1d1;
            --pre-code-color: #000;
            --little-code-border: #d1d1d1;
            --prism-background: hsl(0, 0%, 90.66%);
            --prism-border-left: hsl(0, 0%, 82.88%);
          }
          &.dark {
            --body-color: rgba(255, 255, 255, 0.75);
            --background-color: ${colors.darkmode};
            --main-color: #fff;
            --link-color: rgba(255, 255, 255, 0.9);
            --border-top-color: ${lighten('0.08', colors.darkmode)};
            --nav-background: rgba(25, 27, 31, 0.4);
            --header-color: ${lighten('-0.05', colors.darkgrey)};
            --header-after: #191b1f;
            --header-before: rgba(0, 0, 0, 0.6);
            --author-border: ${lighten('0.02', colors.darkgrey)};
            --home-header-color: rgba(255, 255, 255, 0.9);
            --home-header-border-bottom: #272a30;
            --header-author-link: rgba(255, 255, 255, 0.75);
            --no-image-border: ${lighten('0.15', colors.darkmode)};
            --strong-font-weight: 500;
            --anchor-color: ${lighten('0.1', colors.midgrey)};
            --loader-color: hsla(230, 40%, 90%, 0.8);
            --loader-color2: hsla(230, 40%, 90%, 0.2);
            --image-border-color: hsl(230, 6%, 23%);
            --post-card-title: rgba(255, 255, 255, 0.85);
            --post-card-description: #768086;
            --post-card-by-line: rgba(255, 255, 255, 0.75);
            --strong-color: ${lighten('-0.05', '#fff')};
            --figcaption-color: rgba(255, 255, 255, 0.6);
            --table-first-of-type: linear-gradient(
              to right,
              ${colors.darkmode} 50%,
              ${colors.darkmode} 100%
            );
            --table-last-of-type: linear-gradient(
              270deg,
              #191b1f 50%,
              rgba(25, 27, 31, 0)
            );
            --table-th-background: ${lighten('0.08', colors.darkmode)};
            --table-th-border: var(--table-th-background);
            --tag-boxshadow: #090f1a;
            --tag-background: #282b31;
            --post-full-border: ${lighten('0.15', colors.darkmode)};
            --post-full-meta-link: rgba(255, 255, 255, 0.75);
            --post-full-meta-link-hover: #fff;
            --post-full-title: rgba(255, 255, 255, 0.9);
            --highlight-background: rgb(32 36 39);
            --highlight-border: none;
            --pre-code-color: #c9d1d9;
            --little-code-border: #515151;
            --prism-background: rgb(0 0 0 / 40%);
            --prism-border-left: #818181;
          }
        }

        ol,
        ul {
          list-style: none;
        }
        blockquote,
        q {
          quotes: none;
        }
        blockquote:before,
        blockquote:after,
        q:before,
        q:after {
          content: '';
          content: none;
        }
        table {
          border-spacing: 0;
          border-collapse: collapse;
        }
        img {
          max-width: 100%;
        }
        html {
          box-sizing: border-box;
          font-family: sans-serif;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        }
        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }
        a {
          background-color: transparent;
        }
        a:active,
        a:hover {
          outline: 0;
        }
        b,
        strong {
          font-weight: var(--strong-font-weight);
        }
        i,
        em,
        dfn {
          font-style: italic;
        }
        h1 {
          margin: 0.67em 0;
          font-size: 2em;
        }
        small {
          font-size: 80%;
        }
        sub,
        sup {
          position: relative;
          font-size: 75%;
          line-height: 0;
          vertical-align: baseline;
        }
        sup {
          top: -0.5em;
        }
        sub {
          bottom: -0.25em;
        }
        img {
          border: 0;
        }
        svg:not(:root) {
          overflow: hidden;
        }
        mark {
          background-color: #fdffb6;
        }
        code,
        kbd,
        pre,
        samp {
          font-family: monospace, monospace;
          font-size: 1em;
        }
        button,
        input,
        optgroup,
        select,
        textarea {
          margin: 0;
          color: inherit;
          font: inherit;
        }
        button {
          overflow: visible;
          border: none;
        }
        button,
        select {
          text-transform: none;
        }
        button,
        html input[type='button'],
        input[type='reset'],
        input[type='submit'] {
          cursor: pointer;
          -webkit-appearance: button;
        }
        button[disabled],
        html input[disabled] {
          cursor: default;
        }
        button::-moz-focus-inner,
        input::-moz-focus-inner {
          padding: 0;
          border: 0;
        }
        input {
          line-height: normal;
        }
        input:focus {
          outline: none;
        }
        input[type='checkbox'],
        input[type='radio'] {
          box-sizing: border-box;
          padding: 0;
        }
        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          height: auto;
        }
        input[type='search'] {
          box-sizing: content-box;
          -webkit-appearance: textfield;
        }
        input[type='search']::-webkit-search-cancel-button,
        input[type='search']::-webkit-search-decoration {
          -webkit-appearance: none;
        }
        legend {
          padding: 0;
          border: 0;
        }
        textarea {
          overflow: auto;
        }
        table {
          border-spacing: 0;
          border-collapse: collapse;
        }
        td,
        th {
          padding: 0;
        }

        html {
          overflow-x: hidden;
          overflow-y: scroll;
          font-size: 62.5%;

          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        body {
          overflow-x: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
          font-size: 1.6rem;
          line-height: 1.6em;
          font-weight: 400;
          font-style: normal;
          letter-spacing: 0;
          text-rendering: optimizeLegibility;
          background: var(--background-color);
          color: var(--body-color);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          -moz-font-feature-settings: 'liga' on;

          &::-webkit-scrollbar {
            background-color: transparent;
            width: 6px;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 8px;
            background-color: hsla(230, 5%, 35%, 1);
          }
        }

        hr {
          position: relative;
          display: block;
          width: 100%;
          margin: 2.5em 0 3.5em;
          padding: 0;
          height: 1px;
          border: 0;
          border-top: 1px solid var(--border-top-color);
        }

        audio,
        canvas,
        iframe,
        img,
        svg,
        video {
          vertical-align: middle;
        }

        fieldset {
          margin: 0;
          padding: 0;
          border: 0;
        }

        textarea {
          resize: vertical;
        }

        p,
        ul,
        ol,
        dl,
        blockquote {
          margin: 0 0 1.5em 0;
        }

        ol,
        ul {
          padding-left: 1.3em;
        }

        ol ol,
        ul ul,
        ul ol,
        ol ul {
          margin: 0.5em 0 1em;
        }

        ul {
          list-style: disc;
        }

        ol {
          list-style: decimal;
        }

        ul,
        ol {
          max-width: 100%;
        }

        li {
          margin: 0.5em 0;
          padding-left: 0.3em;
          line-height: 1.6em;
        }

        dt {
          float: left;
          margin: 0 20px 0 0;
          width: 120px;
          color: ${colors.darkgrey};
          font-weight: 500;
          text-align: right;
        }

        dd {
          margin: 0 0 5px 0;
          text-align: left;
        }

        blockquote {
          margin: 1.5em 0;
          padding: 0 1.6em 0 1.6em;
          border-left: ${colors.whitegrey} 0.5em solid;
        }

        blockquote p {
          margin: 0.8em 0;
          font-size: 1.2em;
          font-weight: 400;
        }

        blockquote small {
          display: inline-block;
          margin: 0.8em 0 0.8em 1.5em;
          font-size: 0.9em;
          opacity: 0.8;
        }

        blockquote cite {
          font-weight: bold;
        }
        blockquote cite a {
          font-weight: normal;
        }

        a {
          color: var(--anchor-color);
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin-top: 0;
          line-height: 1.15;
          font-weight: 600;
          text-rendering: optimizeLegibility;
        }

        h1 {
          margin: 0 0 0.5em 0;
          font-size: 5.5rem;
          font-weight: 600;
        }
        @media (max-width: 500px) {
          h1 {
            font-size: 2.2rem;
          }
        }

        h2 {
          margin: 1.5em 0 0.5em 0;
          font-size: 2.2rem;
        }
        @media (max-width: 500px) {
          h2 {
            font-size: 1.8rem;
          }
        }

        h3 {
          margin: 1.5em 0 0.5em 0;
          font-size: 1.8rem;
          font-weight: 500;
        }
        @media (max-width: 500px) {
          h3 {
            font-size: 1.7rem;
          }
        }

        h4 {
          margin: 1.5em 0 0.5em 0;
          font-size: 1.6rem;
          font-weight: 500;
        }

        h5 {
          margin: 1.5em 0 0.5em 0;
          font-size: 1.4rem;
          font-weight: 500;
        }

        h6 {
          margin: 1.5em 0 0.5em 0;
          font-size: 1.4rem;
          font-weight: 500;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          a.auto-link svg {
            opacity: 0;
            transition: 0.25s ease;
          }
          &:hover {
            a.auto-link svg {
              opacity: 1;
            }
          }
        }

        a.auto-link {
          box-shadow: none !important;
          &:hover {
            box-shadow: none !important;
          }
          svg {
            fill: var(--link-color) !important;
          }
        }

        .medium-zoom-overlay {
          backdrop-filter: blur(8px);
        }
        .gatsby-resp-image-background-image {
          border-radius: 6px;
        }
        .gatsby-resp-image-wrapper {
          width: 80%;
          @media (max-width: 800px) {
            width: 100%;
          }
        }
        .medium-zoom-image {
          box-shadow: none !important;
        }
      `}
    />
  );
}
