import { useState } from "react";
import "./questions.css";
import { questionsData } from "../../../appData";
import SectionHeader from "../SectionHeader/SectionHeader";

const Questions = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="questions" id="faq">
      <div className="container">
        <div className="questions__layout">
          <div className="questions__sidebar">
            <SectionHeader
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              subtitle="Got questions? We've got answers."
            />
            <div className="questions__sidebar-stats">
              <div className="questions__sidebar-stat">
                <span className="questions__sidebar-num">24h</span>
                <span className="questions__sidebar-label">Average response time</span>
              </div>
              <div className="questions__sidebar-stat">
                <span className="questions__sidebar-num">98%</span>
                <span className="questions__sidebar-label">Query resolution rate</span>
              </div>
            </div>
          </div>

          <div className="questions__list">
            {questionsData.map((q, index) => (
              <div
                key={index}
                className={`questions__item${openIndex === index ? " questions__item--active" : ""}`}
                onClick={() => toggle(index)}
              >
                <div className="questions__item-header">
                  <h3 className="questions__item-question">{q.question}</h3>
                  <span className="questions__item-toggle">
                    <i className="fas fa-chevron-down" />
                  </span>
                </div>
                <div className="questions__item-answer">
                  <div>
                    <p>{q.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;
