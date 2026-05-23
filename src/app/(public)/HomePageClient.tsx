"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero/Hero";
import SocialProof from "@/components/SocialProof/SocialProof";
import Courses from "@/components/Courses/Courses";
import TrustedBy from "@/components/TrustedBy/TrustedBy";
import ScrollCards from "@/components/ScrollCards/ScrollCards";
import styles from "./home.module.css";

const LearningPath = dynamic(() => import("@/components/LearningPath/LearningPath"));
const Testimony = dynamic(() => import("@/components/Testimony/Testimony"));
const HomeTeam = dynamic(() => import("@/components/HomeTeam/HomeTeam"));
const Questions = dynamic(() => import("@/components/Questions/Questions"));
const Contact = dynamic(() => import("@/components/Contact/Contact"));
const StickyEnroll = dynamic(() => import("@/components/StickyEnroll/StickyEnroll"));

export default function HomePageClient() {
  return (
    <>
      <Hero />

      <div className={`${styles.hpWave} ${styles.hpWaveHeroExit}`} aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C480,78 960,78 1440,40 L1440,80 L0,80 Z" fill="var(--bg-secondary)" />
        </svg>
      </div>

      <SocialProof />
      <Courses />
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
