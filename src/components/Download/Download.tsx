"use client";

import { useState } from "react";
import styles from "./Download.module.css";

interface DownloadProps {
  showDownload: boolean;
  setShowDownload: (v: boolean) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const Download = ({ showDownload, setShowDownload }: DownloadProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
  });

  const downloadFile = () => {
    const anchor = document.createElement("a");
    anchor.href = "/AnalyticShala-Booklet.pdf";
    anchor.download = "AnalyticShala-Booklet.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const sendNotification = async () => {
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
          subject: "New Booklet Download — AnalyticShala",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Booklet download request from ${formData.name} (${formData.email}, ${formData.phone})`,
        }),
      });
    } catch {
      // Fail silently — download should still proceed
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    downloadFile();
    await sendNotification();
    setFormData({ name: "", email: "", phone: "" });
    setShowDownload(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div
      className={`${styles.download} ${showDownload ? styles.visible : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Download brochure"
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowDownload(false);
      }}
    >
      <div className={styles.wrapper}>
        <button
          className={styles.close}
          onClick={() => setShowDownload(false)}
          aria-label="Close"
          type="button"
        >
          <i className="fas fa-times" />
        </button>

        <div className={styles.header}>
          <span className={styles.headerIcon}>
            <i className="fas fa-file-pdf" />
          </span>
          <h1>Download Our Free Brochure</h1>
          <p>
            Get our full course catalogue, syllabus & fee details delivered
            instantly.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className={styles.form}>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="dl-name">Full Name</label>
              <input
                id="dl-name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="dl-email">Email Address</label>
              <input
                id="dl-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="dl-phone">Phone Number</label>
              <input
                id="dl-phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                required
                autoComplete="tel"
              />
            </div>
          </div>

          <button type="submit" className={styles.submit}>
            <i className="fas fa-download" /> Download Brochure
          </button>
        </form>
      </div>
    </div>
  );
};

export default Download;
