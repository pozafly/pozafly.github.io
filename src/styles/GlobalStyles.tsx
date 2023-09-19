import { css, Global } from '@emotion/react';
import { lighten, setLightness } from 'polished';

import { colors } from './colors';

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

          .error-front-page {
            font-size: 1.6rem;
          }
        }

        body {
          overflow-x: hidden;
          background: var(--background-color);
          color: var(--body-color);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', 'Ubuntu',
            'Droid Sans', 'Helvetica Neue', sans-serif;
          font-size: 1.6rem;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-style: normal;
          -moz-font-feature-settings: 'liga' on;
          font-weight: 400;
          letter-spacing: 0;
          line-height: 1.6em;

          /* stylelint-disable-next-line */
          text-rendering: optimizeLegibility;
          word-break: keep-all;

          &::-webkit-scrollbar {
            width: 6px;
            background-color: transparent;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 8px;
            background-color: hsl(230 5% 35%);
          }

          &.light {
            --body-color: ${lighten('-0.3', colors.midgrey)};
            --background-color: #fff;
            --main-color: #000;
            --link-color: #0a0b0c;
            --border-top-color: ${lighten('0.1', colors.lightgrey)};
            --nav-background: rgb(255 255 255 / 0.4);
            --nav-border-color: rgb(0 0 0 / 0.1);
            --header-color: var(--background-color);
            --header-after: var(--background-color);
            --header-before: rgb(0 0 0 / 0.18);
            --author-border: #fff;
            --home-header-color: ${colors.darkgrey};
            --home-header-border-bottom: ${lighten('0.12', colors.lightgrey)};
            --header-author-link: ${colors.darkgrey};
            --no-image-border: ${lighten('0.12', colors.lightgrey)};
            --strong-font-weight: 600;
            --anchor-color: #768086;
            --loader-color: hsla(230 40% 10% / 0.8);
            --loader-color2: hsla(230 40% 10% / 0.2);
            --image-border-color: hsl(230 25% 94%);
            --post-card-title: rgb(21 23 26);
            --post-card-description: rgb(48 58 62);
            --post-card-by-line: ${lighten('0.2', colors.darkgrey)};
            --strong-color: ${lighten('-0.05', colors.darkgrey)};
            --figcaption-color: #000;
            --table-first-of-type: linear-gradient(
              to right,
              rgb(255 255 255) 50%,
              rgb(255 255 255 / 0) 100%
            );
            --table-last-of-type: linear-gradient(
              to left,
              rgb(255 255 255) 50%,
              rgb(255 255 255 / 0) 100%
            );
            --table-th-background: ${lighten('0.04', colors.whitegrey)};
            --table-th-border: ${lighten('-0.01', colors.whitegrey)};
            --tag-boxshadow: hsl(218 53% 10% / 0.12);
            --tag-background: #f5f5f5;
            --post-full-border: ${lighten('0.1', colors.lightgrey)};
            --post-full-meta-link: ${lighten('0.1', colors.darkgrey)};
            --post-full-meta-link-hover: ${colors.darkgrey};
            --post-full-title: ${setLightness('0.05', colors.darkgrey)};
            --highlight-background: #fafafa;
            --highlight-border: #d1d1d1;
            --pre-code-color: #000;
            --little-code-background: var(--highlight-background);
            --little-code-border: #d1d1d1;
            --prism-background: hsl(0 0% 90.66%);
            --prism-border-left: hsl(0 0% 82.88%);
            --about-box-shadow: 10px 10px 30px #bebebe, -10px -10px 30px #fff;
            --post-card-opacity: 0;
            --post-card-background: rgb(0 0 0 / 0.1);
            --post-card-after-opacity: 1;
          }

          &.dark {
            --body-color: rgba(255 255 255 / 0.75);
            --background-color: ${colors.darkmode};
            --main-color: #fff;
            --link-color: rgba(255 255 255 / 0.9);
            --border-top-color: ${lighten('0.08', colors.darkmode)};
            --nav-background: rgba(25 27 31 / 0.4);
            --nav-border-color: rgba(255 255 255 / 0.24);
            --header-color: ${lighten('-0.05', colors.darkgrey)};
            --header-after: #191b1f;
            --header-before: rgba(0 0 0 / 0.6);
            --author-border: ${lighten('0.02', colors.darkgrey)};
            --home-header-color: rgba(255 255 255 / 0.9);
            --home-header-border-bottom: #272a30;
            --header-author-link: rgba(255 255 255 / 0.75);
            --no-image-border: ${lighten('0.15', colors.darkmode)};
            --strong-font-weight: 500;
            --anchor-color: ${lighten('0.1', colors.midgrey)};
            --loader-color: hsl(230 40% 90% / 0.8);
            --loader-color2: hsl(230 40% 90% / 0.2);
            --image-border-color: hsl(230 6% 23%);
            --post-card-title: rgba(255 255 255 / 0.85);
            --post-card-description: #768086;
            --post-card-by-line: rgba(255 255 255 / 0.75);
            --strong-color: ${lighten('-0.05', '#fff')};
            --figcaption-color: rgba(255 255 255 / 0.6);
            --table-first-of-type: linear-gradient(
              to right,
              ${colors.darkmode} 50%,
              ${colors.darkmode} 100%
            );
            --table-last-of-type: linear-gradient(270deg, #191b1f 50%, rgb(25 27 31));
            --table-th-background: ${lighten('0.08', colors.darkmode)};
            --table-th-border: var(--table-th-background);
            --tag-boxshadow: #090f1a;
            --tag-background: #282b31;
            --post-full-border: ${lighten('0.15', colors.darkmode)};
            --post-full-meta-link: rgb(255 255 255 / 0.75);
            --post-full-meta-link-hover: #fff;
            --post-full-title: rgb(255 255 255 / 0.9);
            --highlight-background: rgb(32 36 39);
            --highlight-border: none;
            --pre-code-color: #c9d1d9;
            --little-code-background: rgb(96 98 100 / 0.4);
            --little-code-border: none;
            --prism-background: rgb(0 0 0 / 0.4);
            --prism-border-left: #818181;
            --about-box-shadow: 10px 20px 20px hsl(230 4% 8% / 0.3);
            --post-card-opacity: 0.6;
            --post-card-background: rgb(0 0 0 / 0.3);
            --post-card-after-opacity: 0.1;
          }
        }

        a {
          background-color: transparent;
          color: var(--anchor-color);
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }

          &:active,
          &:hover {
            outline: 0;
          }
        }

        ol,
        ul {
          max-width: 100%;
          padding-left: 1.3em;
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
          content: none;
        }

        table {
          border-spacing: 0;
          border-collapse: collapse;
        }

        img {
          max-width: 100%;
          border: 0;
        }

        html {
          box-sizing: border-box;
          overflow-x: hidden;
          overflow-y: scroll;
          font-family: sans-serif;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          font-size: 62.5%;
          -webkit-tap-highlight-color: rgb(0 0 0 / 0);
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
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

        mark {
          background-color: #fdffb6;
        }

        code,
        kbd,
        pre,
        samp {
          font-family: monospace;
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
          resize: vertical;
        }

        td,
        th {
          padding: 0;
        }

        hr {
          display: block;
          position: relative;
          width: 100%;
          height: 1px;
          margin: 2.5em 0 3.5em;
          padding: 0;
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

        svg:not(:root) {
          overflow: hidden;
        }

        fieldset {
          margin: 0;
          padding: 0;
          border: 0;
        }

        p,
        ul,
        ol,
        dl,
        blockquote {
          margin: 0 0 1.5em;
        }

        ul {
          list-style: disc;
        }

        ol {
          list-style: decimal;
        }

        ol ol,
        ul ul,
        ul ol,
        ol ul {
          margin: 0.5em 0 1em;
        }

        li {
          margin: 0.4em 0;
          padding-left: 0.3em;
          line-height: 1.6em;
        }

        dt {
          width: 120px;
          margin: 0 20px 0 0;
          float: left;
          color: ${colors.darkgrey};
          font-weight: 500;
          text-align: right;
        }

        dd {
          margin: 0 0 5px;
          text-align: left;
        }

        blockquote {
          margin: 1.5em 0;
          padding: 0 1.6em;
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
          opacity: 0.8;
          font-size: 0.9em;
        }

        blockquote cite {
          font-weight: 700;

          /* stylelint-disable-next-line */
          a {
            font-weight: 400;
          }
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin-top: 0;
          font-weight: 600;
          line-height: 1.15;

          /* stylelint-disable-next-line */
          text-rendering: optimizeLegibility;

          a.auto-link {
            box-shadow: none !important;

            &:hover {
              box-shadow: none !important;
            }

            svg {
              transition: 0.25s ease;
              opacity: 0;
              fill: var(--link-color) !important;
            }
          }

          &:hover {
            a.auto-link svg {
              opacity: 1;
            }
          }
        }

        /* stylelint-disable-next-line */
        h1 {
          margin: 0 0 0.5em;
          font-size: 5.5rem;
          font-weight: 600;

          @media (max-width: 500px) {
            font-size: 2.2rem;
          }
        }

        /* stylelint-disable-next-line */
        h2 {
          margin: 1.5em 0 0.5em;
          font-size: 2.2rem;

          @media (max-width: 500px) {
            font-size: 1.8rem;
          }
        }

        /* stylelint-disable-next-line */
        h3 {
          margin: 1.5em 0 0.5em;
          font-size: 1.8rem;
          font-weight: 500;

          @media (max-width: 500px) {
            font-size: 1.7rem;
          }
        }

        /* stylelint-disable-next-line */
        h4 {
          margin: 1.5em 0 0.5em;
          font-size: 1.6rem;
          font-weight: 500;
        }

        /* stylelint-disable-next-line */
        h5 {
          margin: 1.5em 0 0.5em;
          font-size: 1.4rem;
          font-weight: 500;
        }

        /* stylelint-disable-next-line */
        h6 {
          margin: 1.5em 0 0.5em;
          font-size: 1.4rem;
          font-weight: 500;
        }

        .medium-zoom-overlay {
          backdrop-filter: blur(8px);
        }

        .gatsby-resp-image-background-image {
          border-radius: 6px;
        }

        .gatsby-resp-image-wrapper {
          margin: 40px 0;

          @media (max-width: 800px) {
            width: 100%;
            margin: initial;
          }
        }

        .medium-zoom-image {
          box-shadow: none !important;
        }

        .copyright {
          font-size: 1.4rem;

          a {
            font-size: inherit;
          }
        }
      `}
    />
  );
}
