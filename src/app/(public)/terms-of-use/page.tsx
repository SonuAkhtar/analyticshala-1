import type { Metadata } from "next";
import styles from "../privacy-policy/policy.module.css";

export const metadata: Metadata = {
  title: "Terms of Use | AnalyticShala",
  description:
    "Read AnalyticShala's Terms of Use — the rules governing access to our platform, courses, workshops, intellectual property, and dispute resolution.",
  alternates: { canonical: "https://analyticshala.in/terms-of-use" },
};

const toc = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "eligibility", label: "Eligibility" },
  { id: "platform-use", label: "Platform Use" },
  { id: "enrollment", label: "Enrollment & Access" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "user-conduct", label: "User Conduct" },
  { id: "payments", label: "Payments & Billing" },
  { id: "certificates", label: "Certificates" },
  { id: "disclaimer", label: "Disclaimer of Warranties" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "termination", label: "Termination" },
  { id: "governing-law", label: "Governing Law" },
  { id: "contact", label: "Contact Us" },
];

export default function TermsOfUsePage() {
  return (
    <div className={styles.policy}>
      <div className={styles.hero}>
        <div className={`${styles.heroOrb} ${styles.heroOrb1}`} />
        <div className={`${styles.heroOrb} ${styles.heroOrb2}`} />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>
            <i className="fas fa-file-contract" /> Legal
          </span>
          <h1>Terms of Use</h1>
          <div className={styles.heroMeta}>
            <span><i className="fas fa-calendar-alt" /> Last updated: March 2025</span>
            <span><i className="fas fa-map-marker-alt" /> AnalyticShala, Gurgaon, India</span>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <aside className={styles.toc}>
          <h3>Contents</h3>
          <ul className={styles.tocList}>
            {toc.map((item) => (
              <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
            ))}
          </ul>
        </aside>

        <main className={styles.content}>
          <p className={styles.intro}>
            These Terms of Use (&quot;Terms&quot;) govern your access to and use of the
            AnalyticShala website, courses, workshops, and any associated
            services. By accessing our Platform or enrolling in any programme,
            you agree to be bound by these Terms. Please read them carefully
            before proceeding.
          </p>

          <section className={styles.section} id="acceptance">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-check-circle" /> 1. Acceptance of Terms
            </h2>
            <p>
              By visiting <strong>analyticshala.in</strong>, registering an account, enrolling in a course or workshop, or using any of our services, you confirm that you have read, understood, and agree to these Terms of Use and our Privacy Policy.
            </p>
            <p>
              If you are accessing the Platform on behalf of an organisation (e.g., for corporate training), you represent that you have the authority to bind that organisation to these Terms, and all references to &quot;you&quot; include both you personally and that organisation.
            </p>
          </section>

          <section className={styles.section} id="eligibility">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-user-check" /> 2. Eligibility
            </h2>
            <p>To use our Platform and enroll in programmes, you must:</p>
            <ul>
              <li>Be at least 16 years of age.</li>
              <li>Provide accurate, truthful, and complete registration information.</li>
              <li>Have the legal capacity to enter into a binding agreement under applicable law.</li>
              <li>Not be prohibited from receiving our services under the laws of India or any other applicable jurisdiction.</li>
            </ul>
            <p>AnalyticShala reserves the right to verify your eligibility and to refuse or revoke access if these conditions are not met.</p>
          </section>

          <section className={styles.section} id="platform-use">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-laptop" /> 3. Platform Use
            </h2>
            <p>
              Subject to your compliance with these Terms, AnalyticShala grants you a limited, non-exclusive, non-transferable, revocable licence to access and use the Platform for your personal, non-commercial learning purposes.
            </p>
            <p>You may not:</p>
            <ul>
              <li>Copy, download, screen-record, or reproduce course content without explicit written permission.</li>
              <li>Share your account credentials or enrolled course access with any other person.</li>
              <li>Use automated tools (bots, scrapers, spiders) to access, extract, or index content from the Platform.</li>
              <li>Attempt to reverse-engineer, decompile, or otherwise extract source code from any part of the Platform.</li>
              <li>Resell, sublicense, or commercially exploit any content, materials, or features of the Platform.</li>
            </ul>
          </section>

          <section className={styles.section} id="enrollment">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-graduation-cap" /> 4. Enrollment &amp; Access
            </h2>
            <p>When you enroll in a workshop or course, you receive access to the programme materials for the duration specified at the time of purchase.</p>
            <ul>
              <li><strong>Live workshops</strong> — access includes live session links (via Zoom/Google Meet), session recordings for 90 days post-completion, and any shared worksheets or datasets.</li>
              <li><strong>Recorded courses</strong> — access is granted for the period stated on the course page, typically 6–12 months from the date of purchase.</li>
              <li><strong>Access extension</strong> — if you require extended access due to medical or personal circumstances, you may submit a written request to <a href="mailto:team@analyticshala.in" style={{ color: "var(--accent-indigo)" }}>team@analyticshala.in</a> — extensions are granted at our discretion.</li>
            </ul>
            <p>AnalyticShala reserves the right to modify, update, or discontinue any course or workshop at any time. Where material changes affect enrolled learners, we will provide reasonable advance notice.</p>
          </section>

          <section className={styles.section} id="intellectual-property">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-copyright" /> 5. Intellectual Property
            </h2>
            <p>
              All content on the AnalyticShala Platform — including but not limited to course videos, slides, datasets, case studies, written materials, graphics, logos, software, and the website&apos;s design — is the exclusive intellectual property of AnalyticShala or its licensed content creators, and is protected under Indian and international copyright, trademark, and intellectual property laws.
            </p>
            <p>You are granted a personal, non-commercial licence to view and use the materials during your enrolled access period. You may not:</p>
            <ul>
              <li>Re-upload or redistribute course content on any platform (YouTube, Udemy, WhatsApp groups, etc.).</li>
              <li>Create derivative works from our materials without express written consent.</li>
              <li>Use our brand name, logo, or course names for any commercial purpose.</li>
            </ul>
            <p>Any feedback, suggestions, or project submissions you share with us may be used by AnalyticShala to improve our services. We will not claim ownership of your original personal projects.</p>
          </section>

          <section className={styles.section} id="user-conduct">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-users" /> 6. User Conduct
            </h2>
            <p>Our community is built on respect, curiosity, and collaboration. When participating in live sessions, community forums, or any communication channels, you agree not to:</p>
            <ul>
              <li>Post or share content that is abusive, harassing, defamatory, offensive, or discriminatory on any basis.</li>
              <li>Disrupt live sessions, spam other learners, or engage in any conduct that degrades the learning experience.</li>
              <li>Share false information or misrepresent your credentials or affiliation.</li>
              <li>Solicit other learners for external services, courses, or competing products.</li>
              <li>Violate any applicable law, including Indian IT laws, data protection rules, or intellectual property legislation.</li>
            </ul>
            <p>Violations may result in immediate removal from the programme without refund and a permanent ban from future AnalyticShala services.</p>
          </section>

          <section className={styles.section} id="payments">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-rupee-sign" /> 7. Payments &amp; Billing
            </h2>
            <p>All prices are displayed in Indian Rupees (INR) inclusive of applicable GST unless explicitly stated otherwise. Payments are processed securely through Razorpay. We accept all major debit and credit cards, UPI, and net banking.</p>
            <ul>
              <li><strong>Confirmation</strong> — upon successful payment, you will receive an email confirmation with your enrollment details and GST invoice within 24 hours.</li>
              <li><strong>Failed transactions</strong> — if your payment is deducted but enrollment is not confirmed, please contact us within 48 hours. Duplicate deductions will be refunded in full within 5–7 business days.</li>
              <li><strong>Instalment plans</strong> — where offered, failure to complete subsequent instalments will result in suspension of access until payment is received.</li>
              <li><strong>Pricing changes</strong> — prices may change without notice; however, confirmed enrollments are honoured at the price paid.</li>
            </ul>
            <div className={styles.highlight}>
              <p>
                For refunds, please refer to our{" "}
                <a href="/refund-policy" style={{ color: "var(--accent-indigo)", fontWeight: 600 }}>Refund Policy</a>.
              </p>
            </div>
          </section>

          <section className={styles.section} id="certificates">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-certificate" /> 8. Certificates
            </h2>
            <p>Certificates of completion are issued to learners who:</p>
            <ul>
              <li>Complete at least 80% of the course or workshop content.</li>
              <li>Submit all required assignments or capstone projects.</li>
              <li>Meet any minimum attendance requirements for live programmes.</li>
            </ul>
            <p>Certificates are issued digitally in PDF format. They represent your completion of AnalyticShala&apos;s programme and do not constitute a government-recognised degree or professional certification.</p>
            <p>AnalyticShala reserves the right to revoke a certificate if it is discovered that the learner engaged in academic dishonesty, plagiarism, or misrepresentation.</p>
          </section>

          <section className={styles.section} id="disclaimer">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-exclamation-triangle" /> 9. Disclaimer of Warranties
            </h2>
            <p>Our Platform and services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. While we strive to deliver the highest quality educational experience, AnalyticShala makes no warranty — express or implied — that:</p>
            <ul>
              <li>The Platform will be uninterrupted, error-free, or free of viruses or harmful components.</li>
              <li>Course content will meet every learner&apos;s individual expectations or career requirements.</li>
              <li>Completion of any course guarantees employment, salary increases, or specific career outcomes.</li>
            </ul>
            <p>Any career outcomes mentioned in our marketing materials (e.g., placement statistics) reflect historical results and are not guarantees of individual outcomes.</p>
          </section>

          <section className={styles.section} id="liability">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-balance-scale" /> 10. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, AnalyticShala and its directors, employees, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Platform or our services.
            </p>
            <p>
              Our total aggregate liability to you for any claim arising under these Terms shall not exceed the amount you paid to us in the 12 months preceding the incident giving rise to the claim.
            </p>
          </section>

          <section className={styles.section} id="termination">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-ban" /> 11. Termination
            </h2>
            <p>
              AnalyticShala may suspend or terminate your access to the Platform at any time, with or without notice, if we reasonably believe you have violated these Terms, engaged in fraudulent activity, or caused harm to other learners or our community.
            </p>
            <p>
              You may terminate your use of the Platform at any time by discontinuing access. Termination does not entitle you to a refund except as provided in our Refund Policy.
            </p>
            <p>
              Provisions relating to intellectual property, disclaimers, limitation of liability, and governing law shall survive any termination of these Terms.
            </p>
          </section>

          <section className={styles.section} id="governing-law">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-landmark" /> 12. Governing Law &amp; Dispute Resolution
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts in Gurgaon, Haryana, India.
            </p>
            <p>
              Before initiating formal legal proceedings, we encourage you to contact us at{" "}
              <a href="mailto:team@analyticshala.in" style={{ color: "var(--accent-indigo)" }}>team@analyticshala.in</a>{" "}
              to resolve the matter amicably. We are committed to addressing disputes fairly and promptly.
            </p>
          </section>

          <hr className={styles.divider} />

          <section className={styles.section} id="contact">
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-envelope" /> 13. Contact Us
            </h2>
            <p>For any questions about these Terms, please reach out:</p>
            <div className={styles.contactBox}>
              <h4>AnalyticShala Legal &amp; Support</h4>
              <div className={styles.contactRow}><i className="fas fa-envelope" /><a href="mailto:team@analyticshala.in">team@analyticshala.in</a></div>
              <div className={styles.contactRow}><i className="fas fa-phone" /><a href="tel:+918882641988">+91-88826 41988</a></div>
              <div className={styles.contactRow}><i className="fab fa-whatsapp" /><a href="https://wa.me/918882641988" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></div>
              <div className={styles.contactRow}><i className="fas fa-map-marker-alt" /><span>Gurgaon, Haryana, India</span></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
