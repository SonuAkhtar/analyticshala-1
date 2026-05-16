import "./imageCards.css";

// imported Data
import { imagesData } from "../../../appData";
import { useState } from "react";

const ImageCards = () => {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <section className="imageCards" id="imageCards">
      <div className="container">
        <h2 className="section_title">Cards</h2>
        <span className="section_subtitle">Image</span>

        <main className="imageCards_main">
          {imagesData.map((image, index) => (
            <div
              key={index}
              className={`image_wrapper ${
                index === activeImage ? "active" : ""
              }`}
              onClick={() => {
                setActiveImage(index);
              }}
            >
              <div className="title">Professionals</div>
              <p className="card_info">
                You get Professionals helps anytime, anywhere
              </p>
              <span className="image_number">{index + 1}</span>
            </div>
          ))}
        </main>
      </div>
    </section>
  );
};

export default ImageCards;
