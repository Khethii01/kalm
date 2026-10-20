import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import { SITE } from "../site";
import "./Legal.css";

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms & Conditions | KALM Group"
        description="Terms and conditions governing use of the KALM Group website and the submission of commercial fuel supply enquiries."
        path="/terms"
      />

      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        intro="The terms that apply to your use of this website and any enquiry you submit."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Terms & Conditions" },
        ]}
      />

      <section className="section">
        <div className="container">
          <div className="legal">
            <div className="legal__notice" role="note">
              This is an editable starting draft prepared for {SITE.name}. It must
              be reviewed and approved by a qualified legal professional before
              publication. It is not a lawyer-approved document in its current
              form.
            </div>

            <h2>1. About these terms</h2>
            <p>
              These terms and conditions govern your use of the website operated
              by {SITE.name} (registration number {SITE.registrationNumber}) and
              the submission of enquiries through it. By using this website, you
              agree to these terms.
            </p>

            <h2>2. Use of the website</h2>
            <ul>
              <li>You agree to use this website lawfully and not to misuse it.</li>
              <li>
                You must not attempt to gain unauthorised access to the website or
                its underlying systems.
              </li>
              <li>
                The content of this website is provided for general information
                about our commercial fuel supply activities.
              </li>
            </ul>

            <h2>3. Enquiry submissions</h2>
            <p>
              When you submit an enquiry, you confirm that the information you
              provide is accurate to the best of your knowledge. You are
              responsible for the content of your submission.
            </p>

            <h2>4. Quotation limitations</h2>
            <p>
              Any quotation, indication or response provided by {SITE.name} is
              subject to fuel type, volume, delivery location, prevailing pricing,
              product availability and agreed commercial terms. Submitting a
              quotation request does not constitute an accepted order or a
              guarantee of supply. No binding supply obligation arises unless and
              until a separate written agreement is concluded.
            </p>

            <h2>5. No published pricing or guarantees</h2>
            <p>
              This website does not publish prices, discounts, minimum order
              quantities, delivery guarantees, credit terms or delivery times. Any
              such details are confirmed only through direct commercial
              engagement.
            </p>

            <h2>6. Intellectual property</h2>
            <p>
              The content, design and trademarks on this website, including the
              {` ${SITE.shortName} `} name and logo, are owned by or licensed to
              {` ${SITE.name}`} and may not be used without permission. Third-party
              marks, including those of partners, remain the property of their
              respective owners and are used with permission within the agreed
              scope.
            </p>

            <h2>7. Disclaimers</h2>
            <p>
              This website is provided on an "as is" basis. While we take care to
              keep information accurate, we make no warranties that the website
              will be error-free or uninterrupted. To the extent permitted by
              law, {SITE.name} is not liable for any loss arising from reliance on
              website content.
            </p>

            <h2>8. Links to third parties</h2>
            <p>
              This website may reference third parties. We are not responsible for
              the content or practices of any third-party websites or materials.
            </p>

            <h2>9. Governing law</h2>
            <p>
              These terms are governed by the laws of the Republic of South
              Africa. The applicable jurisdiction should be confirmed during legal
              review.
            </p>

            <h2>10. Contact</h2>
            <p>
              Questions about these terms can be directed to {SITE.name} at{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>

            <p className="legal__updated">
              Draft for legal review — not yet approved for publication.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
