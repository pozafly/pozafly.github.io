import styled from '@emotion/styled';
import React, { useState } from 'react';

export default function ThemeModeSwich({ isHome }: { isHome: boolean }) {
  const [mode, setMode] = useState(false);
  const switchTheme = () => {
    // TODO: theme 변경로직
    setMode((prev) => !prev);
  };

  return (
    <SwitchContainer
      onClick={switchTheme}
      className={`${mode ? 'dark' : ''} ${isHome ? 'is-home' : ''}`}
    >
      <div id="switch">
        <div className="mode"></div>
      </div>
    </SwitchContainer>
  );
}

const SwitchContainer = styled.button`
  padding: 6px;
  border-radius: 50%;
  overflow: hidden;
  background: transparent;

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

    transition: transform 0.45s ease;
    border-radius: 50%;
    background: #000;
    opacity: 0.8;
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
      background: #fff;

      transition: transform 0.45s ease;
    }
  }

  &.dark {
    .mode {
      transform: scale(0.5);
      background: white;
      opacity: 1;
      opacity: 0.8;

      &::before {
        opacity: 1;
        box-shadow: 0 -16px 0 0 white, 0 16px 0 0 white, -16px 0 0 0 white,
          16px 0 0 0 white, 12px 12px 0 0 white, 12px -12px 0 0 white,
          -12px 12px 0 0 white, -12px -12px 0 0 white;
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
          box-shadow: 0 -16px 0 0 white, 0 16px 0 0 white, -16px 0 0 0 white,
            16px 0 0 0 white, 12px 12px 0 0 white, 12px -12px 0 0 white,
            -12px 12px 0 0 white, -12px -12px 0 0 white;
        }
      }
    }
  }
`;
