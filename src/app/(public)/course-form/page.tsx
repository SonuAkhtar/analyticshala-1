"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { courseListData, courseRegData } from "@/data/appData";
import styles from "./courseForm.module.css";

const CHOICE_FIELDS = [
  {
    key: "experience" as const,
    label: "Your Experience Level",
    options: ["Fresher", "1–2 Years", "3–5 Years", "5+ Years"],
  },
  {
    key: "goal" as const,
    label: "Your Learning Goal",
    options: ["Get a Job", "Upskill", "Freelancing", "Personal Interest"],
  },
];

interface FormValues {
  name: string;
  email: string;
  phone: string;
  experience: string;
  goal: string;
}

const INITIAL_FORM: FormValues = {
  name: "",
  email: "",
  phone: "",
  experience: "",
  goal: "",
};

function CourseFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id") || "data-analytics-python";

  const course =
    courseListData.find((c) => c.id === courseId) || courseListData[0];
  const reg = courseRegData[course.id] || courseRegData[courseListData[0].id];

  const [formValue, setFormValue] = useState<FormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleChoice = (key: keyof FormValues, value: string) => {
    setFormValue((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): Partial<Record<keyof FormValues, string>> => {
    const err: Partial<Record<keyof FormValues, string>> = {};
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
    if (!formValue.experience) err.experience = "Select your experience";
    if (!formValue.goal) err.goal = "Select your learning goal";
    return err;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length) return;

    const priceNum = parseInt((reg.regFee ?? "0").replace(/[₹,\s]/g, ""), 10);

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: priceNum * 100, itemId: courseId }),
      });

      const result = await res.json();
      if (!result.success)
        throw new Error(result.message || "Order creation failed");

      const paymentData = {
        orderId: result.orderId,
        amount: result.amount,
        coursePrice: reg.price,
        user: { ...formValue, courseId, courseTitle: course.title },
      };
      sessionStorage.setItem("pendingPayment", JSON.stringify(paymentData));
      router.push("/payment");
    } catch (err) {
      console.error(err);
      setSubmitError(
        "Unable to connect. Please try again or contact support.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields: { name: keyof FormValues; type: string; placeholder: string; icon: string; autoComplete: string }[] = [
    { name: "name",  type: "text",  placeholder: "Full Name",                icon: "fas fa-user",     autoComplete: "name" },
    { name: "email", type: "email", placeholder: "Email Address",            icon: "fas fa-envelope", autoComplete: "email" },
    { name: "phone", type: "tel",   placeholder: "Phone Number (10 digits)", icon: "fas fa-phone",    autoComplete: "tel" },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.body}>
        <div className={styles.card}>
          {/* Course strip */}
          <div className={styles.courseStrip}>
            <div className={styles.courseIcon}>
              <i className={course.icon} />
            </div>
            <div className={styles.courseInfo}>
              <p className={styles.courseLabel}>Enrolling in</p>
              <h2 className={styles.courseTitle}>{course.title}</h2>
              <div className={styles.courseMeta}>
                <span className={styles.coursePrice}>
                  {reg.regFee} <em>Registration Fee</em>
                </span>
                <span className={styles.modeBadge}>
                  <i className="fas fa-wifi" /> Online Only
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <h1 className={styles.formHeading}>Your Details</h1>
            <p className={styles.subtitle}>
              We&apos;ll use this to send your confirmation and batch details.
            </p>

            <div className={styles.grid}>
              {inputFields.map(({ name, type, placeholder, icon, autoComplete }) => (
                <div key={name} className={styles.inputWrap}>
                  <div
                    className={`${styles.inputGroup}${
                      errors[name] ? " " + styles.inputGroupError : ""
                    }`}
                  >
                    <i className={icon} />
                    <input
                      type={type}
                      placeholder={placeholder}
                      name={name}
                      value={formValue[name]}
                      onChange={handleChange}
                      autoComplete={autoComplete}
                    />
                  </div>
                  {errors[name] && (
                    <span className={styles.errorText}>
                      <i className="fas fa-exclamation-circle" /> {errors[name]}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {CHOICE_FIELDS.map(({ key, label, options }) => (
              <div key={key} className={styles.fieldGroup}>
                <label className={styles.sectionLabel}>{label}</label>
                <div
                  className={`${styles.choiceRow}${
                    errors[key] ? " " + styles.choiceRowError : ""
                  }`}
                >
                  {options.map((opt) => (
                    <div
                      key={opt}
                      className={`${styles.choiceCard}${
                        formValue[key] === opt
                          ? " " + styles.choiceCardActive
                          : ""
                      }`}
                      onClick={() => handleChoice(key, opt)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleChoice(key, opt)
                      }
                    >
                      {opt}
                    </div>
                  ))}
                </div>
                {errors[key] && (
                  <span className={styles.errorText}>
                    <i className="fas fa-exclamation-circle" /> {errors[key]}
                  </span>
                )}
              </div>
            ))}

            {submitError && (
              <p className={styles.submitError}>
                <i className="fas fa-exclamation-triangle" /> {submitError}
              </p>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Preparing Payment…"
                : `Secure My Seat · Pay ${reg.regFee}`}
            </button>
          </form>
        </div>

        <p className={styles.trustNote}>
          <i className="fas fa-lock" /> Secure payment &nbsp;·&nbsp; 24-hr
          refund &nbsp;·&nbsp; No spam
        </p>
        <a
          href={`https://wa.me/918882641988?text=${encodeURIComponent(
            `Hi! I have a question about enrolling in ${course.title}.`,
          )}`}
          target="_blank"
          rel="noreferrer"
          className={styles.waHelp}
        >
          <i className="fab fa-whatsapp" /> Questions? Chat with us on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function CourseFormPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ color: "var(--text-muted)" }}>Loading…</p>
        </div>
      }
    >
      <CourseFormInner />
    </Suspense>
  );
}
