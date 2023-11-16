import { Fragment, memo, useContext } from 'react';
import { css, Global } from '@emotion/react';

import { ThemeToggleContext } from '@/layouts/ThemeToggleContext.ts';

function ThemeModeSwitch({ isHome }: { isHome: boolean }) {
  const { themeToggler } = useContext(ThemeToggleContext);
  return (
    <Fragment>
      <Global styles={BodyStyle} />
      <button
        onClick={themeToggler}
        className={`theme-toggler ${isHome ? 'is-home' : ''}`}
        aria-label="theme toggle button"
        type="button"
      >
        <div id="switch">
          <div className="mode"></div>
        </div>
      </button>
    </Fragment>
  );
}

export default memo(ThemeModeSwitch);

const BodyStyle = css`
  body {
    .theme-toggler {
      overflow: hidden;
      margin: 6px;
      padding: 2px;
      background: rgb(215 215 215 / 0.6);
      border-radius: 50%;
      transition: all 0.3s ease;

      #switch {
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 21px;
        height: 21px;
        padding: 0;
        background: transparent;
        border: 0;
      }

      .mode {
        position: relative;
        overflow: hidden;
        width: 18px;
        height: 18px;
        opacity: 0.8;
        background: #000;
        border-radius: 50%;
        transition: all 0.45s ease;

        &:before {
          /* sun */
          content: '';
          position: absolute;
          z-index: -1;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 5px;
          height: 5px;
          opacity: 0;
          background: inherit;
          border-radius: 50%;
          transition: box-shadow 0.4s 0s ease;
        }

        &:after {
          /* moon */
          content: '';
          position: absolute;
          top: -20%;
          left: 30%;
          width: 90%;
          height: 90%;
          background: rgb(255 255 255 / 0.9);
          border-radius: 50%;
          transition: transform 0.45s ease;
        }

        &:hover {
          opacity: 1;
        }
      }

      &:hover {
        background: rgb(215 215 215 / 0.9);
      }

      &.is-home {
        .mode {
          background: #fff;

          &:after {
            background: rgb(95 131 162);
          }
        }
      }
    }

    &.dark {
      .theme-toggler {
        background: transparent;

        &:hover {
          background: rgb(255 255 255 / 0.1);
        }

        .mode {
          transform: scale(0.5);
          overflow: initial;
          opacity: 0.8;
          background: white;

          &:before {
            opacity: 1;
            box-shadow:
              0 -16px 0 0 white,
              0 16px 0 0 white,
              -16px 0 0 0 white,
              16px 0 0 0 white,
              12px 12px 0 0 white,
              12px -12px 0 0 white,
              -12px 12px 0 0 white,
              -12px -12px 0 0 white;
          }

          &:after {
            transform: translateX(50%) translateY(-50%);
            opacity: 0;
            transition: background 0.45s ease;
          }
        }

        &.is-home {
          .mode {
            &:before {
              box-shadow:
                0 -16px 0 0 white,
                0 16px 0 0 white,
                -16px 0 0 0 white,
                16px 0 0 0 white,
                12px 12px 0 0 white,
                12px -12px 0 0 white,
                -12px 12px 0 0 white,
                -12px -12px 0 0 white;
            }

            &:after {
              background: rgb(46 64 79);
            }
          }
        }
      }
    }
  }
`;
