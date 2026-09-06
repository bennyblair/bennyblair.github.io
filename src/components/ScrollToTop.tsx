import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // Preserve the browser's initial/restored position when a prerendered page
    // mounts during a scroll. Only a later client-side route change resets it.
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;