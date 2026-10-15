import ResourcePage from "../../components/resource-page";
import { pageMetadata, supportEmail, supportMailto } from "../../lib/support";

export const metadata = pageMetadata(
  "Support",
  "Get help with Mereday: choosing folders, organizing files, Undo, purchases, and restoring access.",
  "/support/",
);

export default function Support() {
  return (
    <ResourcePage
      current="Support"
      eyebrow="MEREDAY SUPPORT"
      title={
        <>
          A little help, <em>when you need it.</em>
        </>
      }
      intro="Help with your files, your routine, and your purchases. Mereday is being prepared for its first Mac App Store release."
      sections={[
        ["contact", "Contact support"],
        ["getting-started", "Getting started"],
        ["permissions", "Folder permissions"],
        ["undo", "Receipts & Undo"],
        ["schedules", "Scheduled tidies"],
        ["purchases", "Plans & purchases"],
      ]}
    >
      <section id="contact" className="contact-card">
        <h2>Let’s sort it out.</h2>
        <p>For help with Mereday or a question about your privacy.</p>
        <p className="resource-note">
          Our support inbox is being set up ahead of launch and cannot receive
          messages yet.
        </p>
        <a className="button" href={supportMailto}>
          Email support
        </a>
        <p>
          <a href={supportMailto}>{supportEmail}</a>
        </p>
        <p className="resource-note">
          Include your macOS version, Mereday version, what you tried, and any
          error message. Hide private filenames in screenshots. Please don’t
          send personal files, passwords, or payment details.
        </p>
      </section>
      <section id="getting-started">
        <h2>Your first tidy</h2>
        <ol>
          <li>
            In <strong>Organize</strong>, choose your Desktop and an archive
            destination. Enable Downloads sorting if you want it, then select
            your Downloads folder.
          </li>
          <li>
            Review the preview and the proposed destinations. Choosing folders
            and viewing the preview do not move files.
          </li>
          <li>
            With an active Monthly trial, subscription, or Lifetime purchase,
            choose <strong>Organize</strong>. Find the results in{" "}
            <strong>Receipts</strong>.
          </li>
        </ol>
        <p>
          Desktop items move into dated archive folders. Downloads files move
          into folders by type within your chosen Downloads folder. Existing
          files are not overwritten; matching names receive a numbered suffix.
          Keep your usual backups—organizing and receipts are not backups.
        </p>
      </section>
      <section id="permissions">
        <h2>Can’t access a folder?</h2>
        <p>
          Select the folder again in Mereday’s folder configuration and approve
          the macOS folder picker. If it is on an external drive, connect that
          drive first. Mereday remembers the folders you authorize, but a moved
          folder or changed permission can require you to choose it again.
        </p>
        <p>
          If a download is missing from the preview, it may still be in
          progress. Mereday skips known incomplete downloads and files modified
          in the last 60 seconds. It also leaves existing Downloads folders,
          hidden items, packages, and symbolic links in place.
        </p>
      </section>
      <section id="undo">
        <h2>Find a file or undo a tidy</h2>
        <p>
          Open <strong>Receipts</strong> to see what moved and where. Use
          <strong> Reveal</strong> to locate a moved item in Finder, or
          <strong> Undo remaining moves</strong> to move eligible items back.
        </p>
        <p>
          Undo checks that the file still matches the recorded item and that its
          original location is free. If a file has been replaced or its original
          name is occupied, Mereday leaves it for you to review. Undo may need
          access to the original folders. Empty archive folders can remain.
        </p>
        <p>
          Receipts, reports, Reveal, and Undo remain available when paid access
          ends. Deleting the app does not move organized files back.
        </p>
      </section>
      <section id="schedules">
        <h2>When does a scheduled tidy run?</h2>
        <p>
          Choose <strong>Manual</strong>, <strong>Daily</strong>, or
          <strong> Weekly</strong>. Scheduled tidies need Mereday to be running
          with organizing access and permission to use the selected folders.
          Closing its window leaves it running; quitting stops scheduled tidies.
        </p>
        <p>
          Mereday does not wake a sleeping Mac. An overdue tidy can run when the
          app is running again. Enable <strong>Launch at login</strong> in
          Settings if you want Mereday to start when you sign in. Choose Manual
          to stop automatic tidies.
        </p>
      </section>
      <section id="purchases">
        <h2>Plans & App Store purchases</h2>
        <h3>How does the trial work?</h3>
        <p>
          Eligible customers can start a three-day free trial of Monthly. You
          must confirm the subscription with Apple; opening Mereday does not
          start a trial. It then renews at the monthly price shown by Apple
          unless cancelled. Apple recommends cancelling a trial at least 24
          hours before it ends if you do not want to renew.
        </p>
        <h3>How do I cancel Monthly?</h3>
        <p>
          In Settings → Plans, choose <strong>Manage Subscription</strong>, or
          follow{" "}
          <a href="https://support.apple.com/en-us/118428">
            Apple’s cancellation instructions
          </a>
          . Deleting Mereday does not cancel a subscription. Check Apple’s
          confirmation and the access end date shown in Mereday.
        </p>
        <h3>What if I switch to Lifetime?</h3>
        <p>
          Lifetime is a one-time purchase for the same organizing features, with
          no recurring Lifetime charge.{" "}
          <strong>Buying Lifetime does not cancel Monthly.</strong> Cancel
          Monthly separately through Apple to stop its recurring charges.
        </p>
        <h3>How do I restore a purchase?</h3>
        <p>
          Use the Apple Account that made the purchase, then open
          <strong> Settings → Plans → Restore Purchases</strong>. Allow Apple’s
          sign-in prompt if it appears. Restore can recover Lifetime or an
          active subscription; it does not restart an expired trial or
          subscription. If plans do not load, check your connection and choose
          <strong> Refresh plans</strong>.
        </p>
        <h3>Can I request a refund?</h3>
        <p>
          Apple handles App Store billing and refund decisions. Follow
          <a href="https://support.apple.com/en-us/118223">
            {" "}
            Apple’s refund instructions
          </a>
          to request a refund. Eligibility depends on Apple’s rules and
          applicable consumer law. See our{" "}
          <a href="/terms/">Terms & purchases</a> page for the app license and
          purchase details.
        </p>
      </section>
    </ResourcePage>
  );
}
