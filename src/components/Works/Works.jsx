import React, { useState } from "react";

// imported Data
import { worksData } from "../../../appData";

// imported Component
import WorkModal from "../WorkModal/WorkModal";

// imported CSS
import "./works.css";

const Works = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleViewClick = (data) => {
    setOpenModal(true);
    setModalData(data);
  };

  return (
    <>
      <section className="works even" id="works">
        <div className="container">
          <h2 className="section_title">Work</h2>
          <span className="section_subtitle">What i do</span>

          <main className="works_main">
            {worksData.map((data, i) => (
              <div key={i} className="work_card">
                <div className="name_n_icon">
                  <i className={data.icon} />
                  <span className="works_title">{data.name}</span>
                </div>

                <span
                  className="button button-flex button-small button-link works_button"
                  onClick={() => handleViewClick(data)}
                >
                  View More
                  <i className="fas fa-arrow-right button_icon" />
                </span>
              </div>
            ))}
          </main>
        </div>

        {/* works modal */}
        <WorkModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalData={modalData}
        />
      </section>
    </>
  );
};

export default Works;
