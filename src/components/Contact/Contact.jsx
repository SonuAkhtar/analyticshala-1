import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { contactData } from "../../../appData";
import { GOOGLESHEET_WEB_APP_URL, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from "../../config";
import "./contact.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import { motion, useInView, AnimatePresence } from "framer-motion";

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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // 1. Save to Google Sheets
      await fetch(GOOGLESHEET_WEB_APP_URL, {
        method: "POST",
        body: new URLSearchParams({ action: "contactInquiry", ...formData }),
      });

      // 2. Send confirmation email via EmailJS (if configured)
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name:    formData.name,
            from_email:   formData.email,
            phone:        formData.phone || "Not provided",
            message:      formData.message || "Free counselling request",
            reply_to:     formData.email,
          },
          EMAILJS_PUBLIC_KEY
        );
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__orb contact__orb--1" />
      <div className="contact__orb contact__orb--2" />

      <div className="container" ref={ref}>
        <SectionHeader
          eyebrow="CONTACT"
          title="Get a Free Career Counselling"
          subtitle="Fill in the form and our team will get back to you within 24 hours - or just scan a QR to reach us instantly."
        />

        <div className="contact__grid">
          <motion.div
            className="contact__form-wrap"
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
                  className="contact__success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="contact__success-icon">
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
                  className="contact__form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="contact__form-row">
                    <div className="contact__form-group contact__form-group--float">
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
                    <div className="contact__form-group contact__form-group--float">
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
                  <div className="contact__form-group contact__form-group--float">
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
                  <div className="contact__form-group contact__form-group--float">
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
                    className="contact__form-submit"
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
                    <p className="contact__form-error">
                      Something went wrong. Please email us at
                      team@analyticshala.in
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="contact__info-wrap"
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.55,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="contact__chips">
              {contactData.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="contact__chip"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                >
                  <div className="contact__chip-icon">
                    <img src={item.icon} alt={item.alt} />
                  </div>
                  <div className="contact__chip-text">
                    <span className="contact__chip-label">{item.name}</span>
                    {item.href ? (
                      <a href={item.href} className="contact__chip-value">
                        {item.info}
                      </a>
                    ) : (
                      <span className="contact__chip-value">{item.info}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="contact__qr-divider">
              <span className="contact__qr-divider-line" />
              <span className="contact__qr-divider-text">
                <i className="fas fa-qrcode" /> Scan to connect instantly
              </span>
              <span className="contact__qr-divider-line" />
            </div>

            <div className="contact__qr-grid">
              {qrCards.map((qr, i) => (
                <motion.div
                  key={i}
                  className="contact__qr-card"
                  style={{ "--qr-accent": qr.accent }}
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
                  <div className="contact__qr-frame">
                    <img
                      src={qr.src}
                      alt={qr.alt}
                      className="contact__qr-image"
                    />
                    <div className="contact__qr-scanline" />
                    <span className="contact__qr-corner contact__qr-corner--tl" />
                    <span className="contact__qr-corner contact__qr-corner--tr" />
                    <span className="contact__qr-corner contact__qr-corner--bl" />
                    <span className="contact__qr-corner contact__qr-corner--br" />
                  </div>

                  <p className="contact__qr-hint">
                    <i className="fas fa-users" /> {qr.hint}
                  </p>

                  <div className="contact__qr-platform">
                    <div
                      className="contact__qr-platform-icon"
                      style={{ background: qr.platformBg }}
                    >
                      <i className={qr.iconClass} />
                    </div>
                    <div className="contact__qr-platform-text">
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
