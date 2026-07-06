import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll window to top smoothly or immediately on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Instant is preferred to prevent weird scroll animations during page transitions
    });
  }, [pathname]);

  return null;
}
