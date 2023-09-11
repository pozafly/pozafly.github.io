import { createRef, memo, useContext, useEffect } from 'react';

import { ThemeToggleContext } from '../layouts/ThemeToggleContext';

const src = 'https://giscus.app/client.js';
const repo = 'pozafly/blog-comments';

const Giscus = () => {
  const containerRef = createRef<HTMLDivElement>();
  const { theme } = useContext(ThemeToggleContext);

  useEffect(() => {
    const scriptElement = document.createElement('script');

    scriptElement.src = src;
    scriptElement.async = true;
    scriptElement.crossOrigin = 'anonymous';
    scriptElement.setAttribute('data-repo', repo);
    scriptElement.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkyNjU3MTk2NDk=');
    scriptElement.setAttribute('data-category', 'Comments');
    scriptElement.setAttribute('data-category-id', 'DIC_kwDOD9aPYc4CX-sv');
    scriptElement.setAttribute('data-mapping', 'pathname');
    scriptElement.setAttribute('data-strict', '0');
    scriptElement.setAttribute('data-reactions-enabled', '1');
    scriptElement.setAttribute('data-emit-metadata', '0');
    scriptElement.setAttribute('data-input-position', 'top');
    scriptElement.setAttribute('data-theme', document.body.className === 'dark' ? 'dark' : 'light');

    containerRef.current?.appendChild(scriptElement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
  }, [theme]);

  return <div ref={containerRef} />;
};

export default memo(Giscus);
