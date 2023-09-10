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
  border-radius: 50%;
  overflow: hidden;
  background: transparent;
  background: rgba(215, 215, 215, 0.6);
  transition: all 0.3s ease;

  #switch {
    position: relative;
    background: transparent;
    border: 0;
    width: 21px;
    height: 21px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .mode {
    position: relative;
    width: 18px;
    height: 18px;

    transition: all 0.45s ease;
    border-radius: 50%;
    background: #000;
    opacity: 0.8;
    overflow: hidden;

    &::before {
      // sun
      content: '';
      position: absolute;

      width: 5px;
      height: 5px;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      border-radius: 50%;

      background: inherit;

      z-index: -1;
      opacity: 0;

      transition: box-shadow 0.4s 0s ease;
    }
    &::after {
      // moon
      content: '';
      position: absolute;
      width: 90%;
      height: 90%;

      top: -20%;
      left: 30%;

      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);

      transition: transform 0.45s ease;
    }

    &:hover {
      opacity: 1;
    }
  }

  &:hover {
    background: rgba(215, 215, 215, 0.9);
  }

  &.dark {
    background: transparent;
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .mode {
      transform: scale(0.5);
      background: white;
      opacity: 1;
      opacity: 0.8;
      overflow: initial;

      &::before {
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

      &::after {
        opacity: 0;
        transition: background 0.45s ease;
        transform: translateX(50%) translateY(-50%);
      }
    }
  }

  &.is-home {
    .mode {
      background: #fff;
      &::after {
        background: rgba(95, 131, 162);
      }
    }
    &.dark {
      .mode {
        &::before {
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
        &::after {
          background: rgba(46, 64, 79);
        }
      }
    }
  }
`;
