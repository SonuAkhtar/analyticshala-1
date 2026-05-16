import "./skills.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tagLogos = {
  Python: "/assets/marq/python.svg",
  Pandas: "/assets/marq/pandas.svg",
  NumPy: "/assets/marq/numpy.svg",
  PostgreSQL: "/assets/marq/postgresql.svg",
  Jupyter: "/assets/marq/jupyter.svg",
  "Scikit-learn": "/assets/marq/sklearn.svg",
  TensorFlow: "/assets/marq/tensorflow.svg",
  PyTorch: "/assets/marq/pytorch.svg",
  "Power BI": "/assets/marq/powerbi.svg",
  Tableau: "/assets/marq/tableau.svg",
  Excel: "/assets/marq/excel.svg",
};

const skillItems = [
  {
    icon: "fas fa-code",
    title: "Python & SQL Mastery",
    desc: "Learn the two most in-demand data languages from scratch. Write queries, build pipelines, and automate analysis like a pro.",
    color: "#16a34a",
    tags: ["Python", "Pandas", "NumPy", "MySQL", "PostgreSQL", "Jupyter"],
    features: [
      "Write Python scripts for data automation",
      "Query complex databases with advanced SQL",
      "Clean and transform messy real-world datasets",
      "Build reusable data pipelines from scratch",
    ],
  },
  {
    icon: "fas fa-brain",
    title: "Machine Learning & AI",
    desc: "Build predictive models and AI-powered systems. From linear regression to deep learning - understand, build, and deploy.",
    color: "#a855f7",
    tags: ["Scikit-learn", "TensorFlow", "PyTorch", "NLP", "Computer Vision"],
    features: [
      "Train and evaluate supervised & unsupervised models",
      "Build neural networks with TensorFlow and PyTorch",
      "Deploy ML models to production APIs",
      "Work on real-world AI capstone projects",
    ],
  },
  {
    icon: "fas fa-chart-bar",
    title: "Data Visualization & BI",
    desc: "Transform raw data into stunning dashboards and stories that influence decisions. Become the analyst every team wants.",
    color: "#06b6d4",
    tags: ["Power BI", "Tableau", "Excel", "Matplotlib", "Seaborn"],
    features: [
      "Build interactive Power BI & Tableau dashboards",
      "Design executive-ready data stories",
      "Master chart selection and visual hierarchy",
      "Present insights that drive business decisions",
    ],
  },
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);
  const active = skillItems[activeTab];

  return (
    <section className="skills" id="skills">
      <div className="skills__orb skills__orb--1" />
      <div className="skills__orb skills__orb--2" />

      <div className="container">
        <SectionHeader
          eyebrow="CURRICULUM"
          title="Skills That Get You Hired"
          subtitle="Industry-relevant curriculum built with hiring managers - not just theory, but real tools used in real data jobs."
        />

        <div className="skills__tabs">
          {skillItems.map((skill, i) => (
            <button
              key={i}
              className={`skills__tab${activeTab === i ? " skills__tab--active" : ""}`}
              style={{ "--color": skill.color }}
              onClick={() => setActiveTab(i)}
            >
              <i className={skill.icon} />
              {skill.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="skills__panel"
            style={{ "--color": active.color }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="skills__panel-left">
              <div className="skills__panel-icon">
                <i className={active.icon} />
              </div>
              <h3 className="skills__panel-title">{active.title}</h3>
              <p className="skills__panel-desc">{active.desc}</p>
              <ul className="skills__panel-features">
                {active.features.map((feat, i) => (
                  <li key={i}>
                    <i className="fas fa-check-circle" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="skills__panel-right">
              <p className="skills__panel-tools-label">
                Tools You&apos;ll Master
              </p>
              <div className="skills__panel-tags">
                {active.tags.map((tag, j) => (
                  <span key={j} className="skills__card-tag">
                    {tagLogos[tag] && (
                      <img
                        src={tagLogos[tag]}
                        alt={tag}
                        className="skills__card-tag-logo"
                      />
                    )}
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
