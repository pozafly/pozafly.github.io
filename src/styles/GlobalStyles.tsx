import { Global, Theme, css } from '@emotion/react';
import { colors } from './colors';

export default function GlobalStyles({ theme }: { theme: Theme }) {
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
          font-weight: ${theme.global.main.strongFontWeight};
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
          background: ${theme.global.body.backgroundColor};
          color: ${theme.global.body.color};
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
          border-top: 1px solid ${theme.global.main.borderTopColor};
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
          color: ${theme.global.main.anchorColor};
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
            fill: ${theme.global.body.autoLinkSvg} !important;
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
