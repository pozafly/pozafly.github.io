import { useContext } from 'react';

import styled from '@emotion/styled';

import { ThemeToggleContext } from '../../layouts/ThemeToggleContext';

export default function ThemeModeSwitch({ isHome }: { isHome: boolean }) {
  const { theme, themeToggler } = useContext(ThemeToggleContext);

  return (
    <SwitchContainer
      onClick={themeToggler}
      className={`${theme === 'dark' ? 'dark' : ''} ${isHome ? 'is-home' : ''}`}
      aria-label="theme toggle button"
    >
      <div id="switch">
        <div className="mode"></div>
      </div>
    </SwitchContainer>
  );
}

const SwitchContainer = styled.button`
  margin: 6px;
  padding: 2px;
  overflow: hidden;

  transition: all 0.3s ease;
  border-radius: 50%;

  background: rgb(215 215 215 / 0.6);

  #switch {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;

    width: 21px;
    height: 21px;
    padding: 0;

    overflow: hidden;
    border: 0;

    background: transparent;
  }

  .mode {
    position: relative;

    width: 18px;
    height: 18px;

    overflow: hidden;

    transition: all 0.45s ease;
    border-radius: 50%;

    opacity: 0.8;
    background: #000;

    &:before {
      /* sun */
      content: '';

      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;

      width: 5px;
      height: 5px;
      transform: translateX(-50%) translateY(-50%);

      transition: box-shadow 0.4s 0s ease;
      border-radius: 50%;

      opacity: 0;
      background: inherit;
    }

    &:after {
      /* moon */
      content: '';

      position: absolute;
      top: -20%;
      left: 30%;

      width: 90%;
      height: 90%;

      transition: transform 0.45s ease;
      border-radius: 50%;

      background: rgb(255 255 255 / 0.9);
    }

    &:hover {
      opacity: 1;
    }
  }

  &:hover {
    background: rgb(215 215 215 / 0.9);
  }

  &.dark {
    background: transparent;

    &:hover {
      background: rgb(255 255 255 / 0.1);
    }

    .mode {
      overflow: initial;
      transform: scale(0.5);
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
        transition: background 0.45s ease;
        opacity: 0;
      }
    }
  }

  &.is-home {
    .mode {
      background: #fff;

      &:after {
        background: rgb(95 131 162);
      }
    }

    &.dark {
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
`;
