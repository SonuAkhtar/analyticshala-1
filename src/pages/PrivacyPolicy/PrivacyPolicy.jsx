import "../../styles/policy.css";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "data-collected", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Your Data" },
  { id: "data-sharing", label: "Data Sharing" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "data-security", label: "Data Security" },
  { id: "retention", label: "Data Retention" },
  { id: "your-rights", label: "Your Rights" },
  { id: "children", label: "Children's Privacy" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" },
];

const PrivacyPolicy = () => {
  return (
    <div className="policy">
      <div className="policy__hero">
        <div className="policy__hero-orb policy__hero-orb--1" />
        <div className="policy__hero-orb policy__hero-orb--2" />
        <div className="policy__hero-inner">
          <span className="policy__eyebrow">
            <i className="fas fa-shield-alt" /> Legal
          </span>
          <h1>Privacy Policy</h1>
          <div className="policy__hero-meta">
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

      <div className="policy__body">
        <aside className="policy__toc">
          <h3>Contents</h3>
          <ul className="policy__toc-list">
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </aside>

        <main className="policy__content">
          <p className="policy__intro">
            At AnalyticShala, your privacy is a fundamental priority - not an
            afterthought. This Privacy Policy explains what personal information
            we collect when you use our website, enroll in our courses or
            workshops, and interact with our services, and how we protect and
            use that information. Please read it carefully.
          </p>

          <section className="policy__section" id="overview">
            <h2 className="policy__section-title">
              <i className="fas fa-info-circle" /> 1. Overview
            </h2>
            <p>
              AnalyticShala is an online and offline education platform
              headquartered in Gurgaon, Haryana, India. We provide courses, live
              workshops, and training programs in Data Analytics, Data Science,
              Artificial Intelligence, SQL, Advanced Excel, and related domains.
            </p>
            <p>
              This policy applies to all visitors and users of our website at{" "}
              <strong>analyticshala.in</strong> and any associated sub-domains,
              mobile applications, or services operated by AnalyticShala
              (collectively, the "Platform").
            </p>
            <p>
              By accessing or using our Platform, you acknowledge that you have
              read and understood this Privacy Policy. If you do not agree with
              any part of this policy, please do not use our services.
            </p>
          </section>

          <section className="policy__section" id="data-collected">
            <h2 className="policy__section-title">
              <i className="fas fa-database" /> 2. Information We Collect
            </h2>
            <p>
              We collect information in two ways: directly from you when you
              interact with our Platform, and automatically as you browse.
            </p>

            <p>
              <strong>Information you provide directly:</strong>
            </p>
            <ul>
              <li>
                <strong>Contact details</strong> - name, email address, phone
                number (WhatsApp-enabled), and city/location when you register,
                fill a contact form, or enroll in a workshop.
              </li>
              <li>
                <strong>Payment information</strong> - billing name, email, and
                transaction IDs processed through our payment gateway
                (Razorpay). We do not store raw card numbers or CVV codes on our
                servers.
              </li>
              <li>
                <strong>Academic background</strong> - current profession,
                education level, and learning goals provided during enrollment
                to personalise your learning path.
              </li>
              <li>
                <strong>Communications</strong> - messages, queries, and
                feedback you send us via email, WhatsApp, or contact forms.
              </li>
            </ul>

            <p>
              <strong>Information collected automatically:</strong>
            </p>
            <ul>
              <li>
                <strong>Usage data</strong> - pages visited, time spent, links
                clicked, course sections accessed, and navigation patterns.
              </li>
              <li>
                <strong>Device & browser data</strong> - IP address, browser
                type and version, operating system, device type, and screen
                resolution.
              </li>
              <li>
                <strong>Referral source</strong> - the URL that directed you to
                our website (e.g., Google search, a social media post, or a
                referral link).
              </li>
              <li>
                <strong>Cookies and similar technologies</strong> - see Section
                5 for full details.
              </li>
            </ul>
          </section>

          <section className="policy__section" id="how-we-use">
            <h2 className="policy__section-title">
              <i className="fas fa-cogs" /> 3. How We Use Your Data
            </h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>
                Process your workshop or course enrollment and send confirmation
                emails and onboarding materials.
              </li>
              <li>
                Personalise your learning experience and recommend courses that
                match your goals and skill level.
              </li>
              <li>
                Send programme updates, schedule reminders, assignment
                notifications, and session links via email or WhatsApp.
              </li>
              <li>
                Respond to your inquiries, support requests, and feedback
                promptly.
              </li>
              <li>
                Process payments securely and issue receipts or certificates of
                completion.
              </li>
              <li>
                Improve our website, content quality, and instructional design
                based on aggregate usage analytics.
              </li>
              <li>
                Send periodic marketing communications about new courses,
                workshops, offers, and educational content - only with your
                consent (you may opt out at any time).
              </li>
              <li>
                Comply with applicable laws, resolve disputes, and enforce our
                agreements.
              </li>
            </ul>

            <div className="policy__highlight">
              <p>
                <i
                  className="fas fa-info-circle"
                  style={{
                    color: "var(--accent-indigo)",
                    marginRight: "0.4rem",
                  }}
                />
                We will never sell your personal data to third parties for their
                own marketing purposes.
              </p>
            </div>
          </section>

          <section className="policy__section" id="data-sharing">
            <h2 className="policy__section-title">
              <i className="fas fa-share-alt" /> 4. Data Sharing
            </h2>
            <p>
              We do not sell, rent, or trade your personal information. We may
              share your data only in these limited circumstances:
            </p>

            <div className="policy__table-wrap">
              <table className="policy__table">
                <thead>
                  <tr>
                    <th>Recipient</th>
                    <th>Purpose</th>
                    <th>Data Shared</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Razorpay</strong>
                    </td>
                    <td>Payment processing</td>
                    <td>Name, email, transaction amount</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Google Analytics</strong>
                    </td>
                    <td>Website analytics</td>
                    <td>Anonymised usage and device data</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Google Workspace / Zoom</strong>
                    </td>
                    <td>Delivering live sessions and communications</td>
                    <td>Name, email, session attendance</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>WhatsApp Business (Meta)</strong>
                    </td>
                    <td>Session reminders and support</td>
                    <td>Phone number, name</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Legal authorities</strong>
                    </td>
                    <td>Compliance with court orders or law</td>
                    <td>As required by applicable law</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              All third-party service providers are contractually required to
              protect your data and use it only for the stated purpose.
            </p>
          </section>

          <section className="policy__section" id="cookies">
            <h2 className="policy__section-title">
              <i className="fas fa-cookie-bite" /> 5. Cookies & Tracking
            </h2>
            <p>
              We use cookies - small text files stored on your device - to make
              our website function properly and to understand how visitors use
              it.
            </p>

            <ul>
              <li>
                <strong>Essential cookies</strong> - required for basic
                functionality such as session management and login state. Cannot
                be disabled.
              </li>
              <li>
                <strong>Analytics cookies</strong> - used via Google Analytics
                to understand page views, traffic sources, and user behaviour in
                aggregate anonymised form.
              </li>
              <li>
                <strong>Preference cookies</strong> - remember your settings
                such as light/dark mode preference across sessions.
              </li>
              <li>
                <strong>Marketing cookies</strong> - may be used to show
                relevant ads on third-party platforms (e.g., Google Ads, Meta)
                to users who have previously visited our site. You can opt out
                via your browser settings or the Google Ads opt-out page.
              </li>
            </ul>

            <p>
              You can control cookie settings through your browser preferences.
              Disabling non-essential cookies will not affect your ability to
              access our courses, but may limit some personalisation features.
            </p>
          </section>

          <section className="policy__section" id="data-security">
            <h2 className="policy__section-title">
              <i className="fas fa-lock" /> 6. Data Security
            </h2>
            <p>
              We implement industry-standard technical and organisational
              measures to protect your personal data against unauthorised
              access, alteration, disclosure, or destruction:
            </p>
            <ul>
              <li>
                All data transmitted between your browser and our servers is
                encrypted using HTTPS/TLS.
              </li>
              <li>
                Payment transactions are handled entirely by Razorpay, which is
                PCI-DSS compliant - we never handle raw card data.
              </li>
              <li>
                Access to personal data within our team is restricted to
                authorised personnel on a need-to-know basis.
              </li>
              <li>
                We conduct periodic security reviews and keep our systems up to
                date.
              </li>
            </ul>
            <p>
              While we take every reasonable precaution, no system is completely
              immune to breaches. In the unlikely event of a data breach that
              affects your rights, we will notify you and the relevant
              authorities as required by law.
            </p>
          </section>

          <section className="policy__section" id="retention">
            <h2 className="policy__section-title">
              <i className="fas fa-clock" /> 7. Data Retention
            </h2>
            <p>
              We retain your personal data only for as long as necessary to
              fulfil the purposes outlined in this policy:
            </p>
            <ul>
              <li>
                <strong>Account and enrollment data</strong> - retained for 3
                years after your last interaction with us to support
                re-enrollment and certificate re-issuance requests.
              </li>
              <li>
                <strong>Payment records</strong> - retained for 7 years as
                required under Indian taxation and accounting laws.
              </li>
              <li>
                <strong>Marketing data</strong> - retained until you opt out or
                request deletion.
              </li>
              <li>
                <strong>Support communications</strong> - retained for 1 year
                after resolution.
              </li>
            </ul>
            <p>After these periods, data is securely deleted or anonymised.</p>
          </section>

          <section className="policy__section" id="your-rights">
            <h2 className="policy__section-title">
              <i className="fas fa-user-shield" /> 8. Your Rights
            </h2>
            <p>
              You have the following rights with respect to your personal data:
            </p>
            <ul>
              <li>
                <strong>Access</strong> - request a copy of the personal data we
                hold about you.
              </li>
              <li>
                <strong>Correction</strong> - ask us to correct inaccurate or
                incomplete information.
              </li>
              <li>
                <strong>Deletion</strong> - request deletion of your personal
                data, subject to legal retention obligations.
              </li>
              <li>
                <strong>Opt-out of marketing</strong> - unsubscribe from
                promotional emails at any time via the unsubscribe link in any
                email, or by contacting us directly.
              </li>
              <li>
                <strong>Data portability</strong> - request your data in a
                machine-readable format where technically feasible.
              </li>
              <li>
                <strong>Withdraw consent</strong> - where processing is based on
                consent, you may withdraw it at any time without affecting prior
                processing.
              </li>
            </ul>
            <p>
              To exercise any of these rights, email us at{" "}
              <a
                href="mailto:team@analyticshala.in"
                style={{ color: "var(--accent-indigo)" }}
              >
                team@analyticshala.in
              </a>{" "}
              with the subject line "Privacy Request." We will respond within 30
              days.
            </p>
          </section>

          <section className="policy__section" id="children">
            <h2 className="policy__section-title">
              <i className="fas fa-child" /> 9. Children's Privacy
            </h2>
            <p>
              Our Platform and services are intended for individuals aged 16 and
              above. We do not knowingly collect personal data from children
              under the age of 16. If you are a parent or guardian and believe
              your child has submitted personal information to us, please
              contact us immediately at{" "}
              <a
                href="mailto:team@analyticshala.in"
                style={{ color: "var(--accent-indigo)" }}
              >
                team@analyticshala.in
              </a>{" "}
              and we will delete it promptly.
            </p>
          </section>

          <section className="policy__section" id="changes">
            <h2 className="policy__section-title">
              <i className="fas fa-sync-alt" /> 10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, services, or applicable laws. When we
              make material changes, we will update the "Last updated" date at
              the top of this page and - for significant changes - notify
              enrolled users by email.
            </p>
            <p>
              We encourage you to review this policy periodically. Continued use
              of our Platform after changes are posted constitutes your
              acceptance of the updated policy.
            </p>
          </section>

          <hr className="policy__divider" />

          <section className="policy__section" id="contact">
            <h2 className="policy__section-title">
              <i className="fas fa-envelope" /> 11. Contact Us
            </h2>
            <p>
              If you have any questions, concerns, or requests related to this
              Privacy Policy, please reach out to us:
            </p>
            <div className="policy__contact-box">
              <h4>AnalyticShala Privacy Team</h4>
              <div className="policy__contact-row">
                <i className="fas fa-envelope" />
                <a href="mailto:team@analyticshala.in">team@analyticshala.in</a>
              </div>
              <div className="policy__contact-row">
                <i className="fas fa-phone" />
                <a href="tel:+918882641988">+91-88826 41988</a>
              </div>
              <div className="policy__contact-row">
                <i className="fab fa-whatsapp" />
                <a
                  href="https://wa.me/918882641988"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </div>
              <div className="policy__contact-row">
                <i className="fas fa-map-marker-alt" />
                <span>Gurgaon, Haryana, India</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
