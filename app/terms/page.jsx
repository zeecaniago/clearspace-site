import ResourcePage from "../../components/resource-page";
import { appleTermsURL, pageMetadata } from "../../lib/support";

export const metadata = pageMetadata(
  "Terms & purchases",
  "Mereday’s App Store license, Monthly trial and renewal terms, Lifetime purchases, and restore help.",
  "/terms/",
);

export default function Terms() {
  return (
    <ResourcePage
      current="Terms"
      eyebrow="TERMS & PURCHASES"
      title={
        <>
          Clear from <em>the start.</em>
        </>
      }
      intro="The license and purchase information for Mereday’s planned Mac App Store release. The app is not publicly available yet."
      sections={[
        ["license", "App license"],
        ["monthly", "Monthly & trial"],
        ["lifetime", "Lifetime"],
        ["access", "Restores & access"],
        ["help", "Help & privacy"],
      ]}
    >
      <section id="license">
        <h2>App license</h2>
        <p>
          Mereday’s Mac App Store distribution will use
          <a href={appleTermsURL}>
            {" "}
            Apple’s Standard End User License Agreement (EULA)
          </a>
          . This page explains purchase behavior; it does not replace that
          license or limit your rights under applicable consumer law.
        </p>
      </section>
      <section id="monthly">
        <h2>Monthly subscription & free trial</h2>
        <p>
          Monthly includes Mereday’s organizing features for the subscription
          period. Eligible customers receive a three-day free trial when they
          confirm a Monthly subscription with Apple. Simply opening the app does
          not start the trial.
        </p>
        <p>
          After the trial, Monthly automatically renews at the monthly price
          shown in the app and Apple’s purchase confirmation unless cancelled.
          Prices and eligibility are determined for your App Store region.
          Review Apple’s confirmation before purchasing.
        </p>
        <p>
          Manage or cancel through Apple using Settings → Plans → Manage
          Subscription in Mereday. To avoid trial renewal, Apple advises
          cancelling at least 24 hours before the trial ends. Deleting the app
          does not cancel Monthly.
          <a href="https://support.apple.com/en-us/118428">
            {" "}
            Read Apple’s cancellation instructions.
          </a>
        </p>
      </section>
      <section id="lifetime">
        <h2>Lifetime purchase</h2>
        <p>
          Lifetime is a one-time, non-consumable purchase that unlocks the same
          organizing features without a recurring Lifetime charge. It is
          separate from Monthly and has no subscription expiration date.
        </p>
        <p>
          <strong>
            Purchasing Lifetime does not cancel an existing Monthly
            subscription.
          </strong>{" "}
          Cancel Monthly separately through Apple to stop recurring charges.
        </p>
      </section>
      <section id="access">
        <h2>Restores & access</h2>
        <p>
          Restore Purchases checks purchases associated with the Apple Account
          used to buy them. It restores eligible Lifetime or active Monthly
          access, without creating a new trial. Expired or revoked purchases do
          not grant organizing access.
        </p>
        <p>
          When organizing access ends, receipts, reports, Reveal, and Undo
          remain available. Undo depends on the recorded files and folder
          permissions still being available and the original destination being
          free. Mereday is an organizer, not a backup service.
        </p>
      </section>
      <section id="help">
        <h2>Help, refunds & privacy</h2>
        <p>
          For app help, visit <a href="/support/">Mereday Support</a>. Apple
          handles App Store billing and refund requests under its policies and
          applicable consumer law; see{" "}
          <a href="https://support.apple.com/en-us/118223">
            Apple’s refund instructions
          </a>
          .
        </p>
        <p>
          Read our <a href="/privacy/">Privacy Policy</a> for how the app,
          website, and support messages handle information.
        </p>
      </section>
    </ResourcePage>
  );
}
