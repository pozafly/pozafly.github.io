import { memo, useState } from 'react';

import styled from '@emotion/styled';

const FrameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 58vh;
`;

const Loading = styled.div`
  position: absolute;
  display: inline-block;

  &.loaded {
    display: none;
  }

  .loader,
  .loader:after {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .loader {
    position: relative;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    margin: 4px;
    text-indent: -9999em;

    /* outer */
    border-top: 2px solid var(--loader-color);
    border-right: 2px solid var(--loader-color);
    border-bottom: 2px solid var(--loader-color);

    /* inner */
    border-left: 2px solid var(--loader-color2);
    -webkit-animation: loader 1.1s infinite linear;
    animation: loader 1.1s infinite linear;
  }

  @-webkit-keyframes loader {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes loader {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Frame = styled.iframe`
  transform: translateY(3px);
  width: 100%;
  height: 58vh;
  opacity: 0;
  border-radius: 10px;
  box-shadow: 0 8px 18px 0 hsl(218 53% 10% / 0.05);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;

  &.frame-loaded {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ResumeFrame = () => {
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
};

export default memo(ResumeFrame);
