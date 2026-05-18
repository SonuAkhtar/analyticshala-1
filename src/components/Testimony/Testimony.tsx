"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { testimonyData } from "@/data/appData";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./Testimony.module.css";

const ratingBars = [
  { star: 5, pct: 88 },
  { star: 4, pct: 8 },
  { star: 3, pct: 2 },
  { star: 2, pct: 1 },
  { star: 1, pct: 1 },
];

const Testimony = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className={styles.testimony} id="testimony">
      <div className="container" ref={ref}>
        <SectionHeader
          eyebrow="TESTIMONIALS"
          title="What Our Students Say"
          subtitle="Real results from real people who transformed their careers with us."
        />

        <motion.div
          className={styles.topRow}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Featured testimonial */}
          <div className={styles.featured}>
            <div className={styles.featuredQuote}>&ldquo;</div>
            <blockquote className={styles.featuredText}>
              AnalyticShala completely transformed my career. I went from a fresher
              to a Data Analyst at Deloitte in just 3 months. The mentorship was
              world-class and the curriculum was exactly what companies are looking for.
            </blockquote>
            <div className={styles.featuredProfile}>
              <div className={styles.featuredAvatar}>PM</div>
              <div>
                <strong>Priya Mehta</strong>
                <span>Data Analyst at Deloitte · ₹9.5 LPA</span>
              </div>
            </div>
          </div>

          {/* Rating summary */}
          <div className={styles.ratingSummary}>
            <div className={styles.ratingScore}>
              <span className={styles.ratingNum}>4.9</span>
              <div className={styles.ratingStars}>★★★★★</div>
              <span className={styles.ratingCount}>Based on 500+ reviews</span>
            </div>
            <div className={styles.ratingBars}>
              {ratingBars.map(({ star, pct }) => (
                <div key={star} className={styles.ratingBarRow}>
                  <span className={styles.ratingBarLabel}>{star}★</span>
                  <div className={styles.ratingBarTrack}>
                    <motion.div
                      className={styles.ratingBarFill}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${pct}%` } : {}}
                      transition={{
                        duration: 0.8,
                        delay: 0.3 + (5 - star) * 0.08,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                  <span className={styles.ratingBarPct}>{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
          }}
          className={styles.swiper}
        >
          {testimonyData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className={styles.card}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star" />
                  ))}
                </div>
                <p className={styles.review}>{item.review}</p>
                <div className={styles.profile}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <span className={styles.name}>{item.name}</span>
                    <span className={styles.position}>{item.position}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimony;
