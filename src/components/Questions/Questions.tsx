"use client";

import { useState } from "react";
import { questionsData } from "@/data/appData";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./Questions.module.css";

const Questions = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className={styles.questions} id="faq">
      <div className="container">
        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <SectionHeader
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              subtitle="Got questions? We've got answers."
            />
            <div className={styles.sidebarStats}>
              <div className={styles.sidebarStat}>
                <span className={styles.sidebarNum}>24h</span>
                <span className={styles.sidebarLabel}>Response Time</span>
              </div>
              <div className={styles.sidebarStat}>
                <span className={styles.sidebarNum}>98%</span>
                <span className={styles.sidebarLabel}>Resolution Rate</span>
              </div>
            </div>
          </aside>

          {/* Accordion list */}
          <div className={styles.list}>
            {questionsData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id}
                  className={`${styles.item} ${isOpen ? styles.itemActive : ""}`}
                  onClick={() => toggle(index)}
                >
                  <div className={styles.itemHeader}>
                    <span className={styles.itemQuestion}>{faq.question}</span>
                    <span className={styles.itemToggle} aria-expanded={isOpen} aria-label={isOpen ? "Collapse" : "Expand"}>
                      <i className="fas fa-chevron-down" />
                    </span>
                  </div>
                  <div className={styles.itemAnswer}>
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;
