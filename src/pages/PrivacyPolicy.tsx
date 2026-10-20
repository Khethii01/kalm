import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import { SITE } from "../site";
import "./Legal.css";

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy | KALM Group"
        description="How KALM Group (Pty) Ltd collects, uses and protects personal information submitted through enquiries, consistent with South African privacy legislation including POPIA."
        path="/privacy-policy"
      />

      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        intro="How we collect, use and protect the information you share with us."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Privacy Policy" }]}
      />

      <section className="section">
        <div className="container">
          <div className="legal">
            <div className="legal__notice" role="note">
              This privacy policy is provided as a starting point for {SITE.name}.
              It should be reviewed and completed for compliance with applicable
              South African privacy legislation, including the Protection of
              Personal Information Act (POPIA), before publication. It is not a
              certification of legal compliance.
            </div>

            <h2>1. Introduction</h2>
            <p>
              {SITE.name} ("we", "us", "our") respects your privacy. This policy
              explains what personal information we collect through this website,
              why we collect it, how we protect it, and the choices available to
              you. It applies to information submitted via our enquiry and
              contact forms.
            </p>

            <h2>2. Information we collect</h2>
            <p>
              When you submit an enquiry, we may collect information you provide,
              which can include:
            </p>
            <ul>
              <li>Your name and job title.</li>
              <li>Company or organisation name.</li>
              <li>Contact details, such as email address and telephone number.</li>
              <li>
                Details of your fuel supply requirement, such as fuel type,
                estimated volume, delivery location and frequency.
              </li>
              <li>Any additional information you choose to include in a message.</li>
            </ul>
            <p>
              We do not knowingly collect special categories of personal
              information through this website.
            </p>

            <h2>3. Why we collect it</h2>
            <p>We process the information you provide in order to:</p>
            <ul>
              <li>Respond to your enquiry and review your fuel supply requirement.</li>
              <li>Prepare and discuss potential commercial supply arrangements.</li>
              <li>Communicate with you about your enquiry.</li>
              <li>Maintain records of enquiries for legitimate business purposes.</li>
            </ul>

            <h2>4. Lawful basis for processing</h2>
            <p>
              We process your personal information on the basis of your
              submission of an enquiry and our legitimate interest in responding
              to and managing commercial enquiries, consistent with POPIA.
            </p>

            <h2>5. How your information is protected</h2>
            <p>
              We take reasonable technical and organisational measures to protect
              personal information against loss, unauthorised access, alteration
              or disclosure. Access to enquiry information is restricted to
              authorised personnel who need it to respond to your enquiry.
            </p>

            <h2>6. Who may process your information</h2>
            <p>
              Your information may be processed by authorised {SITE.name}
              personnel. Where we use service providers to operate our website or
              communications, those providers are expected to handle personal
              information in line with applicable law. We do not sell your
              personal information.
            </p>

            <h2>7. Retention</h2>
            <p>
              We retain enquiry information for as long as necessary to respond to
              your enquiry and for legitimate business and record-keeping
              purposes, after which it is securely deleted or anonymised. Specific
              retention periods should be confirmed as part of the review of this
              policy.
            </p>

            <h2>8. Your rights</h2>
            <p>Subject to applicable law, you may request to:</p>
            <ul>
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate or incomplete information.</li>
              <li>Request deletion of your information, where appropriate.</li>
              <li>Object to certain processing of your information.</li>
            </ul>
            <p>
              To make a request, contact us at{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. The details of a
              designated information officer should be added here following legal
              review.
            </p>

            <h2>9. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The latest version
              will always be available on this page.
            </p>

            <h2>10. Contact</h2>
            <p>
              For any questions about this policy or your personal information,
              contact {SITE.name} at{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>

            <p className="legal__updated">
              Draft for review — not yet legally certified. Registered entity:{" "}
              {SITE.name}, registration number {SITE.registrationNumber}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
