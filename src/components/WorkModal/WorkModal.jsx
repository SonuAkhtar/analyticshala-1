import React from "react";
import "./workModal.css";

const WorkModal = ({ openModal, setOpenModal, modalData }) => {
  return (
    <>
      <div className={`worksModal ${openModal && "show"}`}>
        <div className="worksModal_wrapper">
          <div className="worksModal_header">
            <h4>{modalData.name}</h4>
            <i className="fas fa-times" onClick={() => setOpenModal(false)} />
          </div>

          <div className="worksModal_main">
            <ul>
              {modalData.features?.map((data, i) => (
                <li key={i}>
                  <i className="far fa-check-square" />
                  <p>{data}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkModal;
