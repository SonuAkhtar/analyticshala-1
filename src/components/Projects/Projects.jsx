import React, { useState } from "react";

// imported Data
import { projectsData } from "../../../appData";

// imported CSS
import "./projects.css";

const Projects = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleViewClick = (data) => {
    setOpenModal(true);
    setModalData(data);
  };

  return (
    <>
      <section className="projects even" id="projects">
        <div className="container">
          <h2 className="section_title">Projects</h2>
          <span className="section_subtitle">Let's see</span>

          <main className="projects_main">
            {projectsData.map((data, i) => (
              <div key={i} className="project_card">
                <img src={data.image} alt="project-img" />
                <div className="card_data_wrapper">
                  <div className="card_data">
                    <div className="card_name">{data.name}</div>
                    <div className="card_desc">{data.desc}</div>
                    <div className="card_btn">
                      <a href={data.github} target="_blank">
                        <i className="fab fa-github" />
                      </a>
                      <a href={data.live} target="_blank">
                        <i className="fas fa-external-link-alt" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>
      </section>
    </>
  );
};

export default Projects;
