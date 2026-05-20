"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { workshopData } from "@/data/appData";
import { workshopFees } from "@/data/pricingConfig";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import styles from "./workshopForm.module.css";

/* ── constants ── */

const CHOICE_FIELDS = [
  {
    key: "status" as const,
    label: "Professional Status",
    options: ["Student", "Working Professional", "Graduate", "Career Switcher"],
  },
  {
    key: "mode" as const,
    label: "Workshop Mode",
    options: ["Offline", "Online"],
  },
  {
    key: "analyticshalaStudent" as const,
    label: "Current student of AnalyticShala?",
    options: ["Yes", "No"],
  },
];

interface FormValues {
  name: string;
  email: string;
  phone: string;
  age: string;
  status: string;
  mode: string;
  analyticshalaStudent: string;
}

const INITIAL_FORM: FormValues = {
  name: "",
  email: "",
  phone: "",
  age: "",
  status: "",
  mode: "",
  analyticshalaStudent: "",
};

/* ── Inner component that reads search params ── */

function WorkshopNotFound({ requestedId }: { requestedId: string | null }) {
  return (
    <div className={styles.page}>
      <div className={styles.card} style={{ textAlign: "center", padding: "48px 32px" }}>
        <div style={{ fontSize: 48, color: "#bb1b21", marginBottom: 16 }}>
          <i className="fas fa-exclamation-circle" />
        </div>
        <h1 className={styles.formHeading} style={{ marginBottom: 8 }}>
          Workshop not found
        </h1>
        <p className={styles.subtitle} style={{ marginBottom: 24 }}>
          {requestedId
            ? `We couldn't find a workshop matching "${requestedId}".`
            : "No workshop was selected."}{" "}
          Browse upcoming workshops to pick one.
        </p>
        <Link
          href="/workshops"
          className={styles.submitBtn}
          style={{ display: "inline-flex", textDecoration: "none" }}
        >
          Browse Workshops <i className="fas fa-arrow-right" style={{ marginLeft: 8 }} />
        </Link>
      </div>
    </div>
  );
}

function WorkshopFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawId = searchParams.get("id");
  const id = rawId !== null ? Number(rawId) : NaN;

  const workshop = Number.isFinite(id)
    ? workshopData.upcoming.find((w) => w.id === id) ?? null
    : null;

  const [formValue, setFormValue] = useState<FormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (!workshop) {
    return <WorkshopNotFound requestedId={rawId} />;
  }

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
    if (!formValue.age) err.age = "Age is required";
    if (!formValue.status) err.status = "Select your status";
    if (!formValue.mode) err.mode = "Select a mode";
    if (!formValue.analyticshalaStudent) err.analyticshalaStudent = "Please select";
    return err;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length) return;

    const fees = workshopFees[workshop.id];
    const priceINR =
      fees?.price ??
      parseInt((workshop.price ?? "0").replace(/[₹,\s]/g, ""), 10);

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: priceINR * 100,
          itemId: String(workshop.id),
        }),
      });

      const result = await res.json().catch(() => null);
      if (!res.ok || !result?.success) {
        throw new Error(
          result?.message || `Order creation failed (status ${res.status})`,
        );
      }

      // Store payment data in sessionStorage, then redirect
      const paymentData = {
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
      };
      sessionStorage.setItem("paymentData", JSON.stringify(paymentData));
      router.push("/payment");
    } catch (err) {
      console.error(err);
      const msg =
        err instanceof TypeError
          ? "Can't reach our servers. Check your internet and try again."
          : err instanceof Error && err.message
            ? err.message
            : "Something went wrong. Please try again or contact support.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields: { name: keyof FormValues; type: string; placeholder: string }[] = [
    { name: "name",  type: "text",   placeholder: "Full Name" },
    { name: "email", type: "email",  placeholder: "Email Address" },
    { name: "phone", type: "tel",    placeholder: "Phone Number (10 digits)" },
    { name: "age",   type: "number", placeholder: "Age" },
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Workshops", href: "/workshops" },
          {
            label: workshop.title,
            href: `/workshops/${workshop.slug ?? workshop.id}`,
          },
          { label: "Register" },
        ]}
      />
      <div className={styles.page}>
        <div className={styles.card}>
          {/* Workshop info strip */}
          <div className={styles.workshopStrip}>
            <div className={styles.workshopStripLeft}>
              <span className={styles.workshopStripEyebrow}>
                <i className="fas fa-bolt" /> Workshop Registration
              </span>
              <h2 className={styles.workshopStripTitle}>{workshop.title}</h2>
              <div className={styles.workshopStripMeta}>
                <span>
                  <i className="fas fa-calendar-alt" /> {workshop.date}
                </span>
                <span>
                  <i className="fas fa-clock" /> {workshop.time}
                </span>
                <span>
                  <i className="fas fa-hourglass-half" /> {workshop.duration}
                </span>
              </div>
            </div>
            <div className={styles.workshopStripPrice}>
              <span className={styles.priceNow}>{workshop.price}</span>
              {workshop.originalPrice && (
                <span className={styles.priceWas}>{workshop.originalPrice}</span>
              )}
            </div>
          </div>

          <h1 className={styles.formHeading}>Secure Your Seat</h1>
          <p className={styles.subtitle}>
            Fill in your details to register. Takes less than 30 seconds.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Text inputs */}
            <div className={styles.grid}>
              {inputFields.map(({ name, type, placeholder }) => (
                <div key={name} className={styles.inputWrap}>
                  <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={formValue[name]}
                    onChange={handleChange}
                    className={errors[name] ? styles.inputError : ""}
                  />
                  {errors[name] && (
                    <span className={styles.errorText}>{errors[name]}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Choice fields */}
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
                  <span className={styles.errorText}>{errors[key]}</span>
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
              {isSubmitting ? "Preparing Payment…" : "Continue to Payment"}
            </button>
          </form>

          <p className={styles.trustNote}>
            <i className="fas fa-lock" /> Secure payment &nbsp;·&nbsp; 24-hr
            refund &nbsp;·&nbsp; No spam
          </p>

          <a
            href={`https://wa.me/918882641988?text=${encodeURIComponent(
              `Hi! I have a question about the workshop: ${workshop.title}.`,
            )}`}
            target="_blank"
            rel="noreferrer"
            className={styles.waHelp}
          >
            <i className="fab fa-whatsapp" /> Questions? Chat with us
          </a>
        </div>
      </div>
    </>
  );
}

/* ── Page export wrapped in Suspense (required for useSearchParams) ── */

export default function WorkshopFormPage() {
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
      <WorkshopFormInner />
    </Suspense>
  );
}
