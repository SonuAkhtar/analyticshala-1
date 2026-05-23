import type { Metadata } from "next";
import styles from "../privacy-policy/policy.module.css";

export const metadata: Metadata = {
  title: "Refund Policy | AnalyticShala",
  description:
    "Understand AnalyticShala's refund policy for courses and workshops - eligibility, processing timelines, and how to request a refund.",
  alternates: { canonical: "https://analyticshala.in/refund-policy" },
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "eligibility", label: "Refund Eligibility" },
  { id: "workshop-refunds", label: "Workshop Refunds" },
  { id: "course-refunds", label: "Recorded Course Refunds" },
  { id: "non-refundable", label: "Non-Refundable Items" },
  { id: "how-to-request", label: "How to Request a Refund" },
  { id: "processing", label: "Processing & Timeline" },
  { id: "cancellations", label: "Cancellations by Us" },
  { id: "disputes", label: "Disputes & Escalations" },
  { id: "contact", label: "Contact Us" },
];

export default function RefundPolicyPage() {
  return (
    <div className={styles.policy}>
      <div className={styles.hero}>
        <div className={`${styles.heroOrb} ${styles.heroOrb1}`} />
        <div className={`${styles.heroOrb} ${styles.heroOrb2}`} />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>
            <i className="fas fa-undo-alt" /> Legal
          </span>
          <h1>Refund Policy</h1>
          <div className={styles.heroMeta}>
            <span>
              <i className="fas fa-calendar-alt" /> Last updated: March 2025
            </span>
            <span>
              <i className="fas fa-map-marker-alt" /> AnalyticShala, Gurgaon,
              India
            </span>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <aside className={styles.toc}>
          <h3>Contents</h3>
          <ul className={styles.tocList}>
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </aside>

        <main className={styles.content}>
          <p className={styles.intro}>
            We want every learner at AnalyticShala to be completely confident in
            their investment. This Refund Policy outlines when and how you can
            request a refund for courses and workshops. We believe in
            transparency - no fine print intended to trap you.
          </p>

          <section className={styles.section} id="overview">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-info-circle" /> 1. Overview
            </h2>
            <p>
              AnalyticShala offers refunds within a defined window after
              purchase, subject to usage conditions. Our policy differs slightly
              between live workshops and self-paced/recorded courses because the
              nature of access and delivery differs.
            </p>
            <p>
              Refunds are only processed to the original payment method. We do
              not issue refunds in cash, cheque, or as credit towards future
              purchases (unless an exception is specifically agreed in writing).
            </p>
            <div className={styles.highlight}>
              <p>
                <i
                  className="fas fa-lightbulb"
                  style={{
                    color: "var(--accent-indigo)",
                    marginRight: "0.4rem",
                  }}
                />
                <strong>Our promise:</strong> If you&apos;re genuinely
                dissatisfied within the eligible window and haven&apos;t
                consumed a significant portion of the content, we will process
                your refund - no questions asked.
              </p>
            </div>
          </section>

          <section className={styles.section} id="eligibility">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-check-double" /> 2. Refund Eligibility -
              Quick Summary
            </h2>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Product Type</th>
                    <th>Refund Window</th>
                    <th>Condition</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Live Workshop (upcoming)</td>
                    <td>Up to 7 days before start date</td>
                    <td>No sessions attended</td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeGreen}`}>
                        <i className="fas fa-check" /> Eligible
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Live Workshop (in-progress)</td>
                    <td>Within 2 days of first session</td>
                    <td>Only 1 session attended</td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeOrange}`}>
                        <i className="fas fa-exclamation" /> Conditional
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Recorded / Self-Paced Course</td>
                    <td>Within 7 days of purchase</td>
                    <td>Less than 20% content accessed</td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeOrange}`}>
                        <i className="fas fa-exclamation" /> Conditional
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Completed course or workshop</td>
                    <td>N/A</td>
                    <td>-</td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeRed}`}>
                        <i className="fas fa-times" /> Not eligible
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Certificates</td>
                    <td>N/A</td>
                    <td>-</td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeRed}`}>
                        <i className="fas fa-times" /> Not eligible
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Instalment plans (2nd+ instalment)</td>
                    <td>N/A</td>
                    <td>Already enrolled &amp; accessing content</td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeRed}`}>
                        <i className="fas fa-times" /> Not eligible
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.section} id="workshop-refunds">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-calendar-alt" /> 3. Live Workshop Refunds
            </h2>
            <p>
              Live workshops involve real instructor time, batch preparation,
              and limited seats. Our refund terms reflect this:
            </p>
            <p>
              <strong>Full refund (100%):</strong>
            </p>
            <ul>
              <li>
                Requested at least <strong>7 calendar days before</strong> the
                workshop start date, and you have not attended any session.
              </li>
            </ul>
            <p>
              <strong>Partial refund (50%):</strong>
            </p>
            <ul>
              <li>
                Requested within <strong>2 days after the first session</strong>{" "}
                and you have attended only one session (and no more than 20% of
                the total content has been shared/delivered to you).
              </li>
            </ul>
            <p>
              <strong>No refund:</strong>
            </p>
            <ul>
              <li>Requested after the 2-day post-first-session window.</li>
              <li>You have attended 2 or more sessions.</li>
              <li>The workshop has been completed.</li>
              <li>
                You fail to attend sessions without prior written notice -
                no-shows are not eligible for refunds.
              </li>
            </ul>
            <div className={styles.highlight}>
              <p>
                <i
                  className="fas fa-exchange-alt"
                  style={{
                    color: "var(--accent-indigo)",
                    marginRight: "0.4rem",
                  }}
                />
                <strong>Batch transfer:</strong> If you are unable to attend a
                workshop due to a genuine emergency, we may (at our discretion)
                allow you to transfer your enrollment to the next available
                batch at no extra cost, provided you notify us at least 48 hours
                in advance.
              </p>
            </div>
          </section>

          <section className={styles.section} id="course-refunds">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-play-circle" /> 4. Recorded &amp; Self-Paced
              Course Refunds
            </h2>
            <p>
              For self-paced or recorded courses, we offer a 7-day satisfaction
              window:
            </p>
            <p>
              <strong>
                Full refund (100%) if ALL of the following are true:
              </strong>
            </p>
            <ul>
              <li>
                Your refund request is submitted within{" "}
                <strong>7 calendar days</strong> of purchase.
              </li>
              <li>
                You have accessed <strong>less than 20%</strong> of the course
                content (tracked by our platform).
              </li>
              <li>
                You have not downloaded any course materials, datasets, or
                resources.
              </li>
              <li>You have not received a certificate of completion.</li>
            </ul>
            <p>
              We track content access automatically. Requests that claim minimal
              access when usage data shows otherwise will not be eligible for a
              refund.
            </p>
            <p>
              <strong>No refund if:</strong>
            </p>
            <ul>
              <li>More than 7 days have passed since purchase.</li>
              <li>More than 20% of the content has been accessed.</li>
              <li>A certificate has already been issued.</li>
            </ul>
          </section>

          <section className={styles.section} id="non-refundable">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-times-circle" /> 5. Non-Refundable Items
            </h2>
            <p>
              The following are strictly non-refundable regardless of
              circumstances:
            </p>
            <ul>
              <li>
                <strong>Certificates of completion</strong> - once issued
                digitally.
              </li>
              <li>
                <strong>Downloadable resources</strong> - datasets, templates,
                and study materials that have been accessed or downloaded.
              </li>
              <li>
                <strong>Convenience / processing fees</strong> - payment gateway
                transaction charges (typically 2-3%), if separately listed.
              </li>
              <li>
                <strong>Corporate or group training packages</strong> - custom
                programmes delivered under a separate Service Agreement are
                subject to the refund terms in that specific agreement.
              </li>
              <li>
                <strong>Promotional purchases</strong> - courses purchased at a
                discount of 50% or more during special sale events are
                non-refundable (this will be clearly stated at checkout).
              </li>
            </ul>
          </section>

          <section className={styles.section} id="how-to-request">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-paper-plane" /> 6. How to Request a Refund
            </h2>
            <p>
              To initiate a refund, please contact us using one of the methods
              below within the eligible window:
            </p>
            <ol>
              <li>
                Email{" "}
                <a
                  href="mailto:team@analyticshala.in"
                  style={{ color: "var(--accent-indigo)" }}
                >
                  team@analyticshala.in
                </a>{" "}
                with the subject line:{" "}
                <strong>
                  &quot;Refund Request - [Your Name] - [Course/Workshop
                  Name]&quot;
                </strong>
              </li>
              <li>
                Include your <strong>registered email address</strong>, the{" "}
                <strong>Razorpay Payment ID</strong> (found in your payment
                confirmation email), and a brief reason for the request.
              </li>
              <li>
                Our support team will acknowledge your request within{" "}
                <strong>24 business hours</strong> and communicate the outcome
                within <strong>3 business days</strong>.
              </li>
            </ol>
            <div className={styles.highlight}>
              <p>
                You can also reach us via WhatsApp at{" "}
                <a
                  href="https://wa.me/918882641988"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent-indigo)", fontWeight: 600 }}
                >
                  +91-88826 41988
                </a>{" "}
                for faster initial support, but all formal refund requests must
                be submitted via email for documentation purposes.
              </p>
            </div>
          </section>

          <section className={styles.section} id="processing">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-clock" /> 7. Processing &amp; Timeline
            </h2>
            <p>Once a refund is approved, the following timelines apply:</p>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Payment Method</th>
                    <th>Refund Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>UPI (GPay, PhonePe, Paytm, etc.)</td>
                    <td>2-5 business days</td>
                  </tr>
                  <tr>
                    <td>Debit Card / Net Banking</td>
                    <td>5-7 business days</td>
                  </tr>
                  <tr>
                    <td>Credit Card</td>
                    <td>7-10 business days (card provider dependent)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Refunds are processed by Razorpay and credited directly to your
              original payment source. AnalyticShala does not have control over
              the exact date your bank credits the amount once Razorpay releases
              the funds.
            </p>
            <p>
              If you have not received a refund within the stated timeline,
              please check with your bank first. If the issue persists, contact
              us and we will follow up with Razorpay on your behalf.
            </p>
          </section>

          <section className={styles.section} id="cancellations">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-calendar-times" /> 8. Cancellations by
              AnalyticShala
            </h2>
            <p>
              In rare circumstances, AnalyticShala may need to cancel or
              postpone a workshop due to:
            </p>
            <ul>
              <li>
                Insufficient enrollment (minimum viable batch size not met).
              </li>
              <li>
                Instructor unavailability due to medical or personal emergency.
              </li>
              <li>Technical or infrastructure issues beyond our control.</li>
              <li>
                Force majeure events (natural disasters, government directives,
                etc.).
              </li>
            </ul>
            <p>If we cancel a workshop before it begins:</p>
            <ul>
              <li>
                You will be offered a <strong>full refund</strong> OR the option
                to transfer to the next available batch at no additional cost.
              </li>
              <li>
                We will notify you at least 48 hours in advance wherever
                possible.
              </li>
              <li>
                Refunds in this case will be processed within{" "}
                <strong>5 business days</strong> of cancellation.
              </li>
            </ul>
            <p>If we reschedule (postpone to a new date):</p>
            <ul>
              <li>
                You may accept the new date at no cost, or request a full refund
                within 7 days of receiving the reschedule notice.
              </li>
            </ul>
          </section>

          <section className={styles.section} id="disputes">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-balance-scale" /> 9. Disputes &amp;
              Escalations
            </h2>
            <p>
              If you are dissatisfied with the outcome of your refund request,
              you may escalate the matter by emailing{" "}
              <a
                href="mailto:team@analyticshala.in"
                style={{ color: "var(--accent-indigo)" }}
              >
                team@analyticshala.in
              </a>{" "}
              with the subject line &quot;Refund Escalation&quot; along with
              your original request and the outcome communicated to you. A
              senior team member will review your case within{" "}
              <strong>5 business days</strong>.
            </p>
            <p>
              We are committed to resolving disputes amicably. Formal legal
              proceedings should be a last resort. Any unresolved disputes are
              subject to the jurisdiction of the courts of Gurgaon, Haryana,
              India, as outlined in our Terms of Use.
            </p>
            <p>
              Initiating a chargeback with your bank before contacting us may
              result in your account being suspended while the dispute is
              investigated. We always prefer to resolve issues directly and
              quickly.
            </p>
          </section>

          <hr className={styles.divider} />

          <section className={styles.section} id="contact">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-envelope" /> 10. Contact Us
            </h2>
            <p>For all refund-related queries, reach our support team:</p>
            <div className={styles.contactBox}>
              <h4>AnalyticShala Support Team</h4>
              <div className={styles.contactRow}>
                <i className="fas fa-envelope" />
                <a href="mailto:team@analyticshala.in">team@analyticshala.in</a>
              </div>
              <div className={styles.contactRow}>
                <i className="fas fa-phone" />
                <a href="tel:+918882641988">+91-88826 41988</a>
              </div>
              <div className={styles.contactRow}>
                <i className="fab fa-whatsapp" />
                <a
                  href="https://wa.me/918882641988"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </div>
              <div className={styles.contactRow}>
                <i className="fas fa-clock" />
                <span>Mon-Sat, 10 AM - 7 PM IST</span>
              </div>
              <div className={styles.contactRow}>
                <i className="fas fa-map-marker-alt" />
                <span>Gurgaon, Haryana, India</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
