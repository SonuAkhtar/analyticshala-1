"use client";

import { useState, useRef } from "react";
import { contactData } from "@/data/appData";
import { GOOGLESHEET_WEB_APP_URL } from "@/config";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { motion, useInView, AnimatePresence } from "framer-motion";
import styles from "./Contact.module.css";

const qrCards = [
  {
    src: "/analyticShala-Insta-qr.jpeg",
    alt: "Instagram QR Code",
    accent: "#E1306C",
    iconClass: "fab fa-instagram",
    platform: "Instagram",
    handle: "@analyticshala",
    platformBg:
      "linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #F77737 100%)",
    hint: "Follow for free daily data tips",
  },
  {
    src: "/analyticShala-whatsapp-qr.jpeg",
    alt: "WhatsApp QR Code",
    accent: "#25D366",
    iconClass: "fab fa-whatsapp",
    platform: "WhatsApp",
    handle: "Join Community",
    platformBg: "#25D366",
    hint: "Get daily tips & study resources",
  },
];

type Status = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      if (GOOGLESHEET_WEB_APP_URL) {
        await fetch(GOOGLESHEET_WEB_APP_URL, {
          method: "POST",
          body: new URLSearchParams({ action: "contactInquiry", ...formData }),
        });
      }

      await fetch("/api/send-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className="container" ref={ref}>
        <SectionHeader
          eyebrow="CONTACT"
          title="Get a Free Career Counselling"
          subtitle="Fill in the form and our team will get back to you within 24 hours - or just scan a QR to reach us instantly."
        />

        <div className={styles.grid}>
          {/* ── Left: Form ── */}
          <motion.div
            className={styles.formWrap}
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.55,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  className={styles.success}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={styles.successIcon}>
                    <i className="fas fa-check" />
                  </div>
                  <h3>We&apos;ll be in touch soon!</h3>
                  <p>
                    Your message has been received. Our team will contact you
                    within 24 hours.
                  </p>
                  <button onClick={() => setStatus("idle")}>
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className={styles.form}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className={styles.formRow}>
                    <div className={styles.floatGroup}>
                      <input
                        type="text"
                        name="name"
                        id="c-name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder=" "
                        required
                      />
                      <label htmlFor="c-name">Full Name</label>
                    </div>
                    <div className={styles.floatGroup}>
                      <input
                        type="email"
                        name="email"
                        id="c-email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=" "
                        required
                      />
                      <label htmlFor="c-email">Email Address</label>
                    </div>
                  </div>

                  <div className={styles.floatGroup}>
                    <input
                      type="tel"
                      name="phone"
                      id="c-phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=" "
                    />
                    <label htmlFor="c-phone">Phone Number</label>
                  </div>

                  <div className={styles.floatGroup}>
                    <textarea
                      name="message"
                      id="c-message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder=" "
                      rows={4}
                    />
                    <label htmlFor="c-message">Message</label>
                  </div>

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <i className="fas fa-spinner fa-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane" /> Get Free
                        Counselling
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p className={styles.formError}>
                      Something went wrong. Please email us at
                      team@analyticshala.in
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Right: Info ── */}
          <motion.div
            className={styles.infoWrap}
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.55,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className={styles.chips}>
              {contactData.map((item, i) => (
                <motion.div
                  key={item.id}
                  className={styles.chip}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                >
                  <div className={styles.chipIcon}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.icon} alt={item.alt} />
                  </div>
                  <div className={styles.chipText}>
                    <span className={styles.chipLabel}>{item.name}</span>
                    {item.href ? (
                      <a href={item.href} className={styles.chipValue}>
                        {item.info}
                      </a>
                    ) : (
                      <span className={styles.chipValue}>{item.info}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.qrDivider}>
              <span className={styles.qrDividerLine} />
              <span className={styles.qrDividerText}>
                <i className="fas fa-qrcode" /> Scan to connect instantly
              </span>
              <span className={styles.qrDividerLine} />
            </div>

            <div className={styles.qrGrid}>
              {qrCards.map((qr, i) => (
                <motion.div
                  key={i}
                  className={styles.qrCard}
                  style={{ "--qr-accent": qr.accent } as React.CSSProperties}
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 14,
                    delay: 0.45 + i * 0.12,
                  }}
                  whileHover={{
                    y: -6,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                >
                  <div className={styles.qrFrame}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={qr.src} alt={qr.alt} className={styles.qrImage} />
                    <div className={styles.qrScanline} />
                    <span
                      className={`${styles.qrCorner} ${styles.qrCornerTl}`}
                    />
                    <span
                      className={`${styles.qrCorner} ${styles.qrCornerTr}`}
                    />
                    <span
                      className={`${styles.qrCorner} ${styles.qrCornerBl}`}
                    />
                    <span
                      className={`${styles.qrCorner} ${styles.qrCornerBr}`}
                    />
                  </div>

                  <p className={styles.qrHint}>
                    <i className="fas fa-users" /> {qr.hint}
                  </p>

                  <div className={styles.qrPlatform}>
                    <div
                      className={styles.qrPlatformIcon}
                      style={{ background: qr.platformBg }}
                    >
                      <i className={qr.iconClass} />
                    </div>
                    <div className={styles.qrPlatformText}>
                      <strong>{qr.platform}</strong>
                      <span>{qr.handle}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
