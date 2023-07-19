import React, { createRef, useLayoutEffect } from 'react';

const src = 'https://giscus.app/client.js';

export interface IGiscusProps {
  repo: string;
}

const Giscus: React.FC<IGiscusProps> = React.memo(({ repo }) => {
  const containerRef = createRef<HTMLDivElement>();

  useLayoutEffect(() => {
    const giscus = document.createElement('script');

    const attributes = {
      src,
      'data-repo': repo,
      'data-repo-id': 'MDEwOlJlcG9zaXRvcnkyNjU3MTk2NDk=',
      'data-category': 'Comments',
      'data-category-id': 'DIC_kwDOD9aPYc4CX-sv',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': 'preferred_color_scheme',
      'data-lang': 'ko',
      'data-loading': 'lazy',
      crossorigin: 'anonymous',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      giscus.setAttribute(key, value);
    });

    containerRef.current?.appendChild(giscus);
  }, [repo]);

  return <div ref={containerRef} />;
});

export default Giscus;
