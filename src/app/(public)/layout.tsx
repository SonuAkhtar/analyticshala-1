"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar/AnnouncementBar";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Loader from "@/components/Loader/Loader";
import ScrollProgress from "@/components/ScrollProgress/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import PageThemeSync from "@/components/PageThemeSync/PageThemeSync";
import { Suspense } from "react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [loaderDone, setLoaderDone] = useState(() => {
    if (typeof window === "undefined") return true;
    if (pathname !== "/") return true;
    return sessionStorage.getItem("loader-shown") === "true";
  });

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
