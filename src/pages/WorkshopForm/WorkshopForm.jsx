import { useState } from "react";
import "./WorkshopForm.css";

import { useNavigate, useSearchParams } from "react-router-dom";
import { workshopData, workshopFees } from "../../../appData";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const INPUT_FIELDS = [
  { name: "name", type: "text", placeholder: "Full Name" },
  { name: "email", type: "text", placeholder: "Email Address" },
  { name: "phone", type: "text", placeholder: "Phone Number" },
  { name: "age", type: "number", placeholder: "Age" },
];

const CHOICE_FIELDS = [
  {
    key: "status",
    label: "Professional Status",
    options: ["Student", "Working Professional", "Graduate", "Career Switcher"],
  },
  {
    key: "mode",
    label: "Workshop Mode",
    options: ["Offline", "Online"],
  },
  {
    key: "analyticshalaStudent",
    label: "Current student of AnalyticShala?",
    options: ["Yes", "No"],
  },
];

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  age: "",
  status: "",
  mode: "",
  analyticshalaStudent: "",
};

const WorkshopForm = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = Number(params.get("id"));
  const workshop =
    workshopData.upcoming.find((w) => w.id === id) || workshopData.upcoming[0];

  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value ? undefined : "Required" }));
  };

  const handleChoice = (key, value) => {
    setFormValue((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const err = {};
    if (!formValue.name.trim()) err.name = "Full name is required";
    if (!formValue.email.trim()) {
      err.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formValue.email)) {
      err.email = "Enter a valid email";
    }
    if (!formValue.phone.trim()) {
      err.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formValue.phone)) {
      err.phone = "Enter a valid 10-digit number";
    }
    if (!formValue.age) err.age = "Age is required";
    if (!formValue.status) err.status = "Select your status";
    if (!formValue.mode) err.mode = "Select a mode";
    if (!formValue.analyticshalaStudent)
      err.analyticshalaStudent = "Please select";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const validation = validate();
    setErrors(validation);

    if (Object.keys(validation).length) {
      document
        .querySelector(
          ".workshop-form__input--error, .workshop-form__choice-row--error",
        )
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const fees = workshopFees[workshop.id];
    const priceINR =
      fees?.price ?? parseInt(workshop.price.replace(/[₹,\s]/g, ""), 10);

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/create-order.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: priceINR * 100,
          itemId: String(workshop.id),
        }),
      });

      const result = await res.json();
      if (!result.success)
        throw new Error(result.message || "Order creation failed");

      navigate("/payment", {
        state: {
          orderId: result.orderId,
          amount: result.amount,
          coursePrice: null,
          user: {
            ...formValue,
            workshopId: String(workshop.id),
            workshopTitle: workshop.title,
            workshopDate: workshop.date,
            workshopTime: workshop.time,
            workshopMode: workshop.eventMode?.join(" / ") || "",
          },
        },
      });
    } catch (err) {
      console.error(err);
      setSubmitError("Unable to connect. Please try again or contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Workshops", href: "/workshops" },
          {
            label: workshop.title,
            href: `/workshop-details?id=${workshop.id}`,
          },
          { label: "Register" },
        ]}
      />
      <div className="workshop-form" id="workshopForm">
        <div className="workshop-form__card">
          <h1>Workshop Registration</h1>
          <p className="workshop-form__subtitle">
            Secure your seat in under 30 seconds.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="workshop-form__grid">
              {INPUT_FIELDS.map(({ name, type, placeholder }) => (
                <div key={name}>
                  <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={formValue[name]}
                    onChange={handleChange}
                    className={
                      errors[name] ? "workshop-form__input--error" : ""
                    }
                  />
                  {errors[name] && (
                    <span className="workshop-form__error-text">
                      {errors[name]}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {CHOICE_FIELDS.map(({ key, label, options }) => (
              <div key={key}>
                <label className="workshop-form__section-label">{label}</label>
                <div
                  className={`workshop-form__choice-row ${errors[key] ? "workshop-form__choice-row--error" : ""}`}
                >
                  {options.map((opt) => (
                    <div
                      key={opt}
                      className={`workshop-form__choice-card ${formValue[key] === opt ? "workshop-form__choice-card--active" : ""}`}
                      onClick={() => handleChoice(key, opt)}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
                {errors[key] && (
                  <span className="workshop-form__error-text">
                    {errors[key]}
                  </span>
                )}
              </div>
            ))}

            {submitError && (
              <p className="workshop-form__submit-error">{submitError}</p>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Preparing Payment..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default WorkshopForm;
