import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./homepage.css";

import Hero from "../../components/Hero/Hero";
import SocialProof from "../../components/SocialProof/SocialProof";
import Courses from "../../components/Courses/Courses";
import TrustedBy from "../../components/TrustedBy/TrustedBy";
import ScrollCards from "../../components/ScrollCards/ScrollCards";
import Skills from "../../components/Skills/Skills";
import LearningPath from "../../components/LearningPath/LearningPath";
import Testimony from "../../components/Testimony/Testimony";
import HomeTeam from "../../components/HomeTeam/HomeTeam";
import Questions from "../../components/Questions/Questions";
import Contact from "../../components/Contact/Contact";
import Download from "../../components/Download/Download";
import StickyEnroll from "../../components/StickyEnroll/StickyEnroll";

function Homepage() {
  const [showDownload, setShowDownload] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition =
            el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>AnalyticShala | Data Analytics &amp; AI Courses in India</title>
        <meta
          name="description"
          content="Learn Data Analytics, Data Science, AI & ML from industry experts. 4.9★ rated. Weekend batches. Real projects. India's most hands-on data education platform."
        />
        <meta
          property="og:title"
          content="AnalyticShala | Data Analytics & AI Courses in India"
        />
        <meta
          property="og:description"
          content="4.9★ rated. Industry-led curriculum. Join 300+ learners who built their data careers with AnalyticShala."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://analyticshala.in" />
        <link rel="canonical" href="https://analyticshala.in" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "AnalyticShala",
            url: "https://analyticshala.in",
            description: "India's most hands-on data & AI education platform",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-88826-41988",
              contactType: "customer service",
            },
          })}
        </script>
      </Helmet>
      <Download showDownload={showDownload} setShowDownload={setShowDownload} />

      <Hero />

      {/* Wave: red hero → light sections */}
      <div className="hp-wave hp-wave--hero-exit" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,40 C480,78 960,78 1440,40 L1440,80 L0,80 Z"
            fill="#fffbfb"
          />
        </svg>
      </div>

      <SocialProof />
      <Courses setShowDownload={setShowDownload} />
      <TrustedBy />
      <ScrollCards />
      <LearningPath />

      {/* Wave: light → dark testimony */}
      <div className="hp-wave hp-wave--to-blue" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,40 C480,2 960,2 1440,40 L1440,0 L0,0 Z" fill="#fffbfb" />
        </svg>
      </div>

      <div className="home-testimony">
        <Testimony />
      </div>

      {/* Wave: dark → light sections */}
      <div className="hp-wave hp-wave--to-cream" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,40 C480,78 960,78 1440,40 L1440,80 L0,80 Z"
            fill="#fffbfb"
          />
        </svg>
      </div>

      <HomeTeam />
      <Questions />
      <Contact />
      <StickyEnroll />
    </>
  );
}

export default Homepage;
