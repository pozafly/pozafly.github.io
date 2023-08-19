import React, { createRef, useContext, useEffect } from 'react';
import { ThemeToggleContext } from '../layouts/ThemeToggleContext';

const src = 'https://giscus.app/client.js';
const repo = 'pozafly/blog-comments';

const Giscus: React.FC = React.memo(() => {
  const containerRef = createRef<HTMLDivElement>();
  const { theme } = useContext(ThemeToggleContext);

  useEffect(() => {
    const createIframe = () => {
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
        'data-theme': theme === 'light' ? 'light' : 'dark',
        crossorigin: 'anonymous',
        async: 'true',
      };

      Object.entries(attributes).forEach(([key, value]) => {
        giscus.setAttribute(key, value);
      });

      containerRef.current?.appendChild(giscus);
    };

    const postMessage = () => {
      if (!iFrameEl) return;

      iFrameEl.contentWindow?.postMessage(
        {
          giscus: {
            setConfig: {
              theme,
            },
          },
        },
        'https://giscus.app'
      );
    };

    const iFrameEl = containerRef.current?.querySelector(
      'iframe.giscus-frame'
    ) as HTMLIFrameElement;

    iFrameEl ? postMessage() : createIframe();
  }, [theme]);
  return <div ref={containerRef} />;
});

export default Giscus;
