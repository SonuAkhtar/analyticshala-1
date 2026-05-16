import { useEffect, useState } from "react";
import "./download.css";

const Download = ({ showDownload, setShowDownload }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    downloadFile();
    sendNotification();
    setFormData({
      name: "",
      email: "",
      phone: "",
    });
    setShowDownload(false);
  };

  const downloadFile = () => {
    const fileUrl = "/AnalyticShala-Booklet.pdf";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "analyticShala-brochure.pdf";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const sendNotification = async () => {
    const tempFormData = formData;
    tempFormData.access_key = import.meta.env.VITE_WEB3FORMS_KEY;

    const json = JSON.stringify(tempFormData);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
  };

  return (
    <div className={`download ${showDownload ? "download--visible" : ""}`}>
      <div className="download__wrapper">
        <button className="download__close" onClick={() => setShowDownload(false)}>
          <i className="fas fa-times" />
        </button>

        <div className="download__header">
          <h1>Download Brochure</h1>
          <h3>Please fill the form to download the Brochure</h3>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="download__fields">
            <div className="download__field">
              <input
                type="text"
                name="name"
                placeholder="Please enter your name"
                value={formData.name}
                onChange={handleFormChange}
                required
                pattern="^[A-Za-z]{3,}(?: [A-Za-z]{1,})*$"
                title="Name should be more than 3 letters"
              />
            </div>
            <div className="download__field">
              <input
                type="email"
                name="email"
                placeholder="Please enter your email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="download__field">
              <input
                type="text"
                name="phone"
                placeholder="Please enter your phone"
                value={formData.phone}
                onChange={handleFormChange}
                required
                pattern="^(\+91|91)?[789]\d{9}$"
                title="eg: +919876543210, 9876543210"
              />
            </div>
          </div>

          <button type="submit">Download</button>
        </form>
      </div>
    </div>
  );
};

export default Download;
