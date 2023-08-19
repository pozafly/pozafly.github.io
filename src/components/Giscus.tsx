import React, {
  createRef,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react';
import { ThemeToggleContext } from '../layouts/ThemeToggleContext';

const src = 'https://giscus.app/client.js';

export interface IGiscusProps {
  repo: string;
}

const Giscus: React.FC<IGiscusProps> = React.memo(({ repo }) => {
  const containerRef = createRef<HTMLDivElement>();
  const { theme } = useContext(ThemeToggleContext);

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
      'data-theme': theme === 'light' ? 'light' : 'dark',
      crossorigin: 'anonymous',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      giscus.setAttribute(key, value);
    });

    containerRef.current?.appendChild(giscus);
  }, [repo]);

  useEffect(() => {
    const iFrameEl = containerRef.current?.querySelector(
      'iframe.giscus-frame'
    ) as HTMLIFrameElement;
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
  }, [theme]);

  return <div ref={containerRef} />;
});

export default Giscus;
