import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    // Don't override scroll when navigating to a hash anchor
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
