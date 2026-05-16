import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./CourseForm.css";
import { GOOGLESHEET_WEB_APP_URL } from "../../config";
import { courseListData, courseRegData } from "../../../appData";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const CHOICE_FIELDS = [
  {
    key: "experience",
    label: "Your Experience Level",
    options: ["Fresher", "1–2 Years", "3–5 Years", "5+ Years"],
  },
  {
    key: "goal",
    label: "Your Learning Goal",
    options: ["Get a Job", "Upskill", "Freelancing", "Personal Interest"],
  },
];

const INITIAL_FORM = {
  name: "", email: "", phone: "",
  experience: "", goal: "",
};

const STEPS = [
  { num: 1, label: "Your Info" },
  { num: 2, label: "Preferences" },
];

const CourseForm = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const courseId = params.get("id") || "analytics";

  const course = courseListData.find((c) => c.id === courseId) || courseListData[0];
  const reg = courseRegData[course.id] || courseRegData[courseListData[0].id];

  const [step, setStep]                  = useState(1);
  const [formValue, setFormValue]        = useState(INITIAL_FORM);
  const [errors, setErrors]              = useState({});
  const [isSubmitting, setIsSubmitting]  = useState(false);
  const [submitError, setSubmitError]    = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleChoice = (key, value) => {
    setFormValue((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateStep1 = () => {
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
    return err;
  };

  const validateStep2 = () => {
    const err = {};
    if (!formValue.experience) err.experience = "Select your experience";
    if (!formValue.goal)       err.goal       = "Select your learning goal";
    return err;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const validation = validateStep1();
    setErrors(validation);
    if (!Object.keys(validation).length) setStep(2);
  };

  const handleBack = () => {
    setErrors({});
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const validation = validateStep2();
    setErrors(validation);
    if (Object.keys(validation).length) return;

    const priceNum = parseInt(reg.regFee.replace(/[₹,\s]/g, ""), 10);

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/create-order.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: priceNum * 100, itemId: courseId }),
      });

      const result = await res.json();
      if (!result.success) throw new Error(result.message || "Order creation failed");

      navigate("/payment", {
        state: {
          orderId: result.orderId,
          amount: result.amount,
          coursePrice: reg.price,
          user: { ...formValue, courseId, courseTitle: course.title },
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
    <div className="course-form">
      <Breadcrumb items={[
        { label: "Courses", href: "/courses" },
        { label: course.title, href: `/courses/${course.slug || course.id}` },
        { label: "Register" },
      ]} />
      <div className="course-form__body">
        <div className="course-form__card">
          {/* Course strip */}
          <div className="course-form__course-strip">
            <div className="course-form__course-icon">
              <i className={course.icon} />
            </div>
            <div className="course-form__course-info">
              <p className="course-form__course-label">Enrolling in</p>
              <h2 className="course-form__course-title">{course.title}</h2>
              <div className="course-form__course-meta">
                <span className="course-form__course-price">
                  {reg.regFee} <em>Registration Fee</em>
                </span>
                <span className="course-form__mode-badge">
                  <i className="fas fa-wifi" /> Online Only
                </span>
              </div>
            </div>
          </div>

          {/* Step indicator */}
          <div className="course-form__steps">
            {STEPS.map((s, i) => (
              <div key={s.num} className="course-form__step-wrap">
                <div
                  className={`course-form__step-node ${
                    step === s.num
                      ? "course-form__step-node--active"
                      : step > s.num
                        ? "course-form__step-node--done"
                        : ""
                  }`}
                >
                  {step > s.num ? (
                    <i className="fas fa-check" />
                  ) : (
                    s.num
                  )}
                </div>
                <span
                  className={`course-form__step-label ${
                    step === s.num ? "course-form__step-label--active" : ""
                  }`}
                >
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className={`course-form__step-line ${
                      step > s.num ? "course-form__step-line--done" : ""
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <form onSubmit={handleNext} noValidate>
              <h1>Your Details</h1>
              <p className="course-form__subtitle">
                We'll use this to send your confirmation and batch details.
              </p>

              <div className="course-form__grid">
                {[
                  { name: "name",  type: "text",  placeholder: "Full Name",       icon: "fas fa-user" },
                  { name: "email", type: "email", placeholder: "Email Address",   icon: "fas fa-envelope" },
                  { name: "phone", type: "tel",   placeholder: "Phone Number (10 digits)", icon: "fas fa-phone" },
                ].map(({ name, type, placeholder, icon }) => (
                  <div key={name} className="course-form__input-wrap">
                    <div className={`course-form__input-group${errors[name] ? " course-form__input-group--error" : ""}`}>
                      <i className={icon} />
                      <input
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        value={formValue[name]}
                        onChange={handleChange}
                        autoComplete={name === "name" ? "name" : name === "email" ? "email" : "tel"}
                      />
                    </div>
                    {errors[name] && (
                      <span className="course-form__error-text">
                        <i className="fas fa-exclamation-circle" /> {errors[name]}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <button type="submit" className="course-form__next-btn">
                Next: Preferences <i className="fas fa-arrow-right" />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} noValidate>
              <h1>Your Learning Goals</h1>
              <p className="course-form__subtitle">
                Help us understand you better so we can personalise your experience.
              </p>

              {CHOICE_FIELDS.map(({ key, label, options }) => (
                <div key={key} className="course-form__field-group">
                  <label className="course-form__section-label">{label}</label>
                  <div
                    className={`course-form__choice-row${
                      errors[key] ? " course-form__choice-row--error" : ""
                    }`}
                  >
                    {options.map((opt) => (
                      <div
                        key={opt}
                        className={`course-form__choice-card${
                          formValue[key] === opt ? " course-form__choice-card--active" : ""
                        }`}
                        onClick={() => handleChoice(key, opt)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && handleChoice(key, opt)}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                  {errors[key] && (
                    <span className="course-form__error-text">
                      <i className="fas fa-exclamation-circle" /> {errors[key]}
                    </span>
                  )}
                </div>
              ))}

              {submitError && (
                <p className="course-form__submit-error">
                  <i className="fas fa-exclamation-triangle" /> {submitError}
                </p>
              )}

              <div className="course-form__step2-actions">
                <button
                  type="button"
                  className="course-form__back-btn"
                  onClick={handleBack}
                >
                  <i className="fas fa-arrow-left" /> Back
                </button>
                <button
                  type="submit"
                  className="course-form__submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Preparing Payment…"
                    : `Secure My Seat · Pay ${reg.regFee}`}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Trust note below card */}
        <p className="course-form__trust-note">
          <i className="fas fa-lock" /> Secure payment &nbsp;·&nbsp; 24-hr refund &nbsp;·&nbsp; No spam
        </p>
        <a
          href={`https://wa.me/918882641988?text=${encodeURIComponent(`Hi! I have a question about enrolling in ${course.title}.`)}`}
          target="_blank"
          rel="noreferrer"
          className="course-form__wa-help"
        >
          <i className="fab fa-whatsapp" /> Questions? Chat with us on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default CourseForm;
