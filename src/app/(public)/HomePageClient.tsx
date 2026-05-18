"use client";

import { useState } from "react";
import Hero from "@/components/Hero/Hero";
import SocialProof from "@/components/SocialProof/SocialProof";
import Courses from "@/components/Courses/Courses";
import TrustedBy from "@/components/TrustedBy/TrustedBy";
import ScrollCards from "@/components/ScrollCards/ScrollCards";
import LearningPath from "@/components/LearningPath/LearningPath";
import Testimony from "@/components/Testimony/Testimony";
import HomeTeam from "@/components/HomeTeam/HomeTeam";
import Questions from "@/components/Questions/Questions";
import Contact from "@/components/Contact/Contact";
import Download from "@/components/Download/Download";
import StickyEnroll from "@/components/StickyEnroll/StickyEnroll";
import styles from "./home.module.css";

export default function HomePageClient() {
  const [showDownload, setShowDownload] = useState(false);

  return (
    <>
      <Download showDownload={showDownload} setShowDownload={setShowDownload} />
      <Hero />

      <div className={`${styles.hpWave} ${styles.hpWaveHeroExit}`} aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C480,78 960,78 1440,40 L1440,80 L0,80 Z" fill="var(--bg-secondary)" />
        </svg>
      </div>

      <SocialProof />
      <Courses setShowDownload={setShowDownload} />
      <TrustedBy />
      <ScrollCards />
      <LearningPath />

      <div className={`${styles.hpWave} ${styles.hpWaveToBlue}`} aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C480,2 960,2 1440,40 L1440,0 L0,0 Z" fill="var(--bg-secondary)" />
        </svg>
      </div>

      <div className={styles.homeTestimony}>
        <Testimony />
      </div>

      <div className={`${styles.hpWave} ${styles.hpWaveToCream}`} aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C480,78 960,78 1440,40 L1440,80 L0,80 Z" fill="var(--bg-primary)" />
        </svg>
      </div>

      <HomeTeam />
      <Questions />
      <Contact />
      <StickyEnroll />
    </>
  );
}
