import "./testimony.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import { testimonyData } from "../../../appData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ratingBars = [
  { star: 5, pct: 88 },
  { star: 4, pct: 8 },
  { star: 3, pct: 2 },
  { star: 2, pct: 1 },
  { star: 1, pct: 1 },
];

const Testimony = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="testimony" id="testimony">
      <div className="container" ref={ref}>
        <SectionHeader
          eyebrow="TESTIMONIALS"
          title="What Our Students Say"
          subtitle="Real results from real people who transformed their careers with us."
        />

        <motion.div
          className="testimony__top-row"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="testimony__featured">
            <div className="testimony__featured-quote">&ldquo;</div>
            <blockquote className="testimony__featured-text">
              AnalyticShala completely transformed my career. I went from a fresher to a
              Data Analyst at Deloitte in just 3 months. The mentorship was world-class
              and the curriculum was exactly what companies are looking for.
            </blockquote>
            <div className="testimony__featured-profile">
              <div className="testimony__featured-avatar">PM</div>
              <div>
                <strong>Priya Mehta</strong>
                <span>Data Analyst at Deloitte · ₹9.5 LPA</span>
              </div>
            </div>
          </div>

          <div className="testimony__rating-summary">
            <div className="testimony__rating-score">
              <span className="testimony__rating-num">4.9</span>
              <div className="testimony__rating-stars">★★★★★</div>
              <span className="testimony__rating-count">Based on 500+ reviews</span>
            </div>
            <div className="testimony__rating-bars">
              {ratingBars.map(({ star, pct }) => (
                <div key={star} className="testimony__rating-bar-row">
                  <span className="testimony__rating-bar-label">{star}★</span>
                  <div className="testimony__rating-bar-track">
                    <motion.div
                      className="testimony__rating-bar-fill"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${pct}%` } : {}}
                      transition={{ duration: 0.8, delay: 0.3 + (5 - star) * 0.08, ease: "easeOut" }}
                    />
                  </div>
                  <span className="testimony__rating-bar-pct">{pct}%</span>
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
          className="testimony__swiper"
        >
          {testimonyData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="testimony__card">
                <div className="testimony__stars">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star" />
                  ))}
                </div>
                <p className="testimony__review">{item.review}</p>
                <div className="testimony__profile">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <span className="testimony__name">{item.name}</span>
                    <span className="testimony__position">{item.position}</span>
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
