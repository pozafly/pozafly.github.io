import { memo, useState } from 'react';

import styled from '@emotion/styled';

const FrameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 58vh;
`;

const Loading = styled.div`
  display: inline-block;
  position: absolute;
  &.loaded {
    display: none;
  }

  .loader,
  .loader:after {
    border-radius: 50%;
    width: 24px;
    height: 24px;
  }
  .loader {
    margin: 4px;
    position: relative;
    text-indent: -9999em;
    // outer
    border-top: 2px solid var(--loader-color);
    border-right: 2px solid var(--loader-color);
    border-bottom: 2px solid var(--loader-color);
    // inner
    border-left: 2px solid var(--loader-color2);

    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: loader 1.1s infinite linear;
    animation: loader 1.1s infinite linear;
  }
  @-webkit-keyframes loader {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Frame = styled.iframe`
  width: 100%;
  height: 58vh;
  border-radius: 10px;
  opacity: 0;
  transform: translateY(3px);
  transition: opacity 0.7s ease, transform 0.7s ease;
  box-shadow: 0 8px 18px 0 hsla(218, 53%, 10%, 0.05);

  &.frame-loaded {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ResumeFrame = memo(() => {
  const [isIframeLoad, setIsIframeLoad] = useState(false);
  const loaded = () => {
    setIsIframeLoad(true);
  };

  return (
    <FrameWrapper>
      <Loading className={isIframeLoad ? 'loaded' : ''}>
        <div className="loader"></div>
      </Loading>
      <Frame
        src="https://my.surfit.io/w/2082055482"
        onLoad={loaded}
        className={isIframeLoad ? 'frame-loaded' : ''}
      />
    </FrameWrapper>
  );
});

export default ResumeFrame;
