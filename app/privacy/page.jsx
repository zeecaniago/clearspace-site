import ResourcePage from "../../components/resource-page";
import { pageMetadata, supportEmail, supportMailto } from "../../lib/support";

export const metadata = pageMetadata(
  "Privacy policy",
  "How Mereday handles local files, purchase access, support messages, and visits to this website.",
  "/privacy/",
);

export default function Privacy() {
  return (
    <ResourcePage
      current="Privacy"
      eyebrow="PRIVACY POLICY · UPDATED OCTOBER 15, 2026"
      title={
        <>
          Your files. <em>Your privacy.</em>
        </>
      }
      intro="Mereday organizes files on your Mac. It does not upload your files or organizing history to us, and you don’t need a separate Mereday account."
      sections={[
        ["scope", "About this policy"],
        ["on-your-mac", "Data on your Mac"],
        ["apple", "Apple & purchases"],
        ["support", "Support messages"],
        ["website", "This website"],
        ["choices", "Retention & choices"],
        ["contact", "Questions & updates"],
      ]}
    >
      <section id="scope">
        <h2>About this policy</h2>
        <p>
          This policy covers the Mereday Mac app, mereday.app, and information
          you choose to send to Mereday support. “We” and “us” mean the
          developer of Mereday, reachable at{" "}
          <a href={supportMailto}>{supportEmail}</a>.
        </p>
        <p className="resource-note">
          The support inbox is being set up ahead of launch and cannot receive
          messages yet.
        </p>
        <p>
          The app has no advertising, third-party analytics SDKs, or Mereday
          cloud account. We do not sell personal information or use it for
          advertising or cross-app tracking.
        </p>
      </section>
      <section id="on-your-mac">
        <h2>What stays on your Mac</h2>
        <p>
          You choose the folders Mereday may access using macOS’s folder picker.
          The app reads file names, paths, types, dates, sizes, and file
          identity information to prepare previews, organize files, and check
          Undo. It moves files between the selected locations; it does not send
          their contents or names to a Mereday server or an AI service.
        </p>
        <ul>
          <li>
            <strong>Preferences:</strong> appearance, scheduling choices,
            enabled locations, and the last tidy time are saved locally.
          </li>
          <li>
            <strong>Folder permissions:</strong> macOS permission bookmarks are
            saved locally so the app can return to folders you authorize.
          </li>
          <li>
            <strong>Receipts and reports:</strong> local records include source
            and destination paths, move times, results, file identities, and
            folder bookmarks. Reports use those receipts.
          </li>
        </ul>
        <p>
          If you choose a folder synchronized by iCloud Drive or another
          provider, that provider may sync your files and changes under its own
          settings and privacy policy. Your own backups may also include
          Mereday’s local data. Mereday does not run a separate file-sync
          service.
        </p>
      </section>
      <section id="apple">
        <h2>Apple handles purchases</h2>
        <p>
          Monthly subscriptions, trials, Lifetime purchases, and restores use
          Apple’s StoreKit. Apple processes your Apple Account and payment
          information. Mereday uses verified purchase records, including the
          product, trial or subscription status, expiration, and revocation
          information, to determine your access on the device. We do not receive
          your card details, and the app does not send purchase records to a
          developer-operated server.
        </p>
        <p>
          Apple may provide the developer with App Store sales reports and, when
          permitted by your Apple settings, app analytics or crash diagnostics.
          Apple controls that collection and sharing. See
          <a href="https://www.apple.com/legal/privacy/">
            {" "}
            Apple’s Privacy Policy
          </a>
          for its practices and your choices.
        </p>
      </section>
      <section id="support">
        <h2>If you contact support</h2>
        <p>
          We receive your email address, message, and any attachments you choose
          to send. We use them to reply, investigate the issue, and maintain a
          record of the conversation. Our email provider processes these
          messages to deliver and store them. Please send only information
          needed to explain the issue and redact private filenames or other
          personal details.
        </p>
        <p>
          Support messages are not used for advertising. We retain them only as
          long as needed to handle the request, related follow-up, and any legal
          obligations. You can ask us to delete correspondence at
          <a href={supportMailto}> {supportEmail}</a>.
        </p>
      </section>
      <section id="website">
        <h2>When you visit this website</h2>
        <p>
          The website does not add advertising trackers or analytics cookies.
          Its interactive demo uses sample files in your browser; it does not
          access or upload files from your computer. Demo changes are temporary
          and reset when you reload the page.
        </p>
        <p>
          Our hosting and content-delivery providers receive the technical
          information needed to serve a page, such as your IP address, browser
          information, requested URL, and request time. They may retain service
          and security logs under their hosting policies. The site is delivered
          through Amazon Web Services; see
          <a href="https://aws.amazon.com/privacy/"> AWS’s Privacy Notice</a>.
        </p>
        <p>
          This site loads typefaces from Google Fonts. Your browser contacts
          Google to request them, which exposes request information such as your
          IP address and browser information to Google. See
          <a href="https://policies.google.com/privacy">
            {" "}
            Google’s Privacy Policy
          </a>
          . Links to Apple or other external sites are subject to those sites’
          privacy policies.
        </p>
      </section>
      <section id="choices">
        <h2>Your data, retention, and choices</h2>
        <p>
          Local preferences and receipt history remain in the app’s storage on
          your Mac until removed. There is no automatic history-expiration
          period. We cannot remotely read, export, or delete that local data.
          Removing the app alone may leave its local settings and history
          behind.
        </p>
        <p>
          Choose Manual scheduling and quit Mereday to stop its file operations.
          You can change the selected folders in the app and manage macOS folder
          permissions in System Settings where available. Contact support for
          help removing saved permissions, settings, or receipt history from
          your Mac. Removing receipts removes their Undo history; it does not
          undo file moves or delete the organized files.
        </p>
        <p>
          For information you have sent to us, you can request access,
          correction, or deletion by email. Depending on where you live, you may
          have additional privacy rights. We will handle requests under
          applicable law and explain any information we must retain. Apple
          manages its purchase records separately. Deleting local data or
          contacting us does not cancel an Apple subscription; use{" "}
          <a href="/support/#purchases">Manage Subscription</a>.
        </p>
      </section>
      <section id="contact">
        <h2>Questions or changes</h2>
        <p>
          For privacy questions or a data request, email
          <a href={supportMailto}> {supportEmail}</a>. We may update this policy
          as Mereday changes. The date at the top shows the latest revision;
          material changes to data handling will be explained here.
        </p>
      </section>
    </ResourcePage>
  );
}
