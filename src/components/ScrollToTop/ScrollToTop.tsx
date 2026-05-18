"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const ScrollToTop = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isPopState = useRef(false);

  useEffect(() => {
    const handlePopState = () => { isPopState.current = true; };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!window.location.hash && !isPopState.current) {
      window.scrollTo(0, 0);
    }
    isPopState.current = false;
  }, [pathname, searchParams]);

  return null;
};

export default ScrollToTop;
