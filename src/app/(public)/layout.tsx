"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar/AnnouncementBar";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollProgress from "@/components/ScrollProgress/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import PageThemeSync from "@/components/PageThemeSync/PageThemeSync";

const Loader = dynamic(() => import("@/components/Loader/Loader"), {
  ssr: false,
});

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [loaderDone, setLoaderDone] = useState(true);

  useEffect(() => {
    if (pathname === "/" && sessionStorage.getItem("loader-shown") !== "true") {
      setLoaderDone(false);
    }
  }, [pathname]);

  return (
    <>
      {!loaderDone && (
        <Loader
          onDone={() => {
            setLoaderDone(true);
            sessionStorage.setItem("loader-shown", "true");
          }}
        />
      )}
      <Suspense>
        <ScrollToTop />
      </Suspense>
      <ScrollProgress />
      <PageThemeSync />
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
