import ProductDemo from "../components/product-demo";
import SiteInteractions from "../components/site-interactions";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner wrap">
          <a className="wordmark" href="#" aria-label="Mereday home">
            <img
              src="/assets/clearspace-icon-32.svg"
              width="34"
              height="34"
              alt=""
            />
            Mereday
          </a>
          <nav id="main-navigation" aria-label="Main navigation">
            <a href="#why">Why Mereday</a>
            <a href="#how">How it works</a>
            <a href="#faq">Questions</a>
            <a className="mobile-download" href="#get">
              Download
            </a>
          </nav>
          <button
            className="button small nav-download"
            data-download=""
            aria-haspopup="dialog"
          >
            <svg className="apple-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M17.05 12.54c.03 3.15 2.76 4.2 2.79 4.21-.02.07-.44 1.5-1.44 2.98-.87 1.28-1.77 2.55-3.19 2.58-1.39.03-1.84-.83-3.43-.83-1.59 0-2.08.8-3.4.86-1.37.05-2.41-1.38-3.29-2.66-1.79-2.61-3.16-7.37-1.32-10.59.91-1.6 2.54-2.61 4.31-2.64 1.35-.02 2.62.92 3.44.92.82 0 2.35-1.14 3.95-.97.67.03 2.56.27 3.77 2.05-.1.06-2.25 1.32-2.19 4.09zM14.44 4.67c.74-.9 1.24-2.15 1.1-3.4-1.07.04-2.36.71-3.13 1.61-.69.79-1.3 2.05-1.14 3.26 1.19.09 2.41-.61 3.17-1.47z"
              ></path>
            </svg>
            Download
          </button>
          <button
            className="menu-button"
            id="menu-toggle"
            aria-expanded="false"
            aria-controls="main-navigation"
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 7h14M5 12h14M5 17h14"></path>
            </svg>
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero wrap">
          <img
            className="hero-icon"
            src="/assets/clearspace-icon.svg"
            width="68"
            height="68"
            alt=""
          />
          <p className="eyebrow">A LITTLE EVERYDAY ORDER</p>
          <h1>
            Your files, with room to <em>breathe.</em>
          </h1>
          <p className="hero-description">
            A clearer Desktop. Downloads in their place. Mereday gives your
            files a home
            <span className="desktop-copy">
              , so you can get back to what matters
            </span>
            .
          </p>
          <div className="hero-actions">
            <button className="button " data-download="" aria-haspopup="dialog">
              <svg
                className="apple-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M17.05 12.54c.03 3.15 2.76 4.2 2.79 4.21-.02.07-.44 1.5-1.44 2.98-.87 1.28-1.77 2.55-3.19 2.58-1.39.03-1.84-.83-3.43-.83-1.59 0-2.08.8-3.4.86-1.37.05-2.41-1.38-3.29-2.66-1.79-2.61-3.16-7.37-1.32-10.59.91-1.6 2.54-2.61 4.31-2.64 1.35-.02 2.62.92 3.44.92.82 0 2.35-1.14 3.95-.97.67.03 2.56.27 3.77 2.05-.1.06-2.25 1.32-2.19 4.09zM14.44 4.67c.74-.9 1.24-2.15 1.1-3.4-1.07.04-2.36.71-3.13 1.61-.69.79-1.3 2.05-1.14 3.26 1.19.09 2.41-.61 3.17-1.47z"
                ></path>
              </svg>
              Download for Mac
            </button>
            <a className="text-link" href="#tour">
              Take a little tour <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="requirement">
            Mac download coming soon · Try the interactive demo below
          </p>
        </section>
        <ProductDemo />
        <section className="features-section wrap" id="why">
          <div className="section-intro">
            <div>
              <p className="eyebrow">SMALL DETAILS. A LIGHTER DAY.</p>
              <h2>
                Order, without <em>overthinking it.</em>
              </h2>
            </div>
            <p>
              Built around the places files pile up, and the reassurance you
              need to tidy them.
            </p>
          </div>
          <div className="feature-grid">
            <article>
              <span className="feature-number">01 / DESKTOP</span>
              <h3>
                A fresh start.
                <br />
                With everything kept.
              </h3>
              <p>
                Move Desktop items into a dated archive. Choose daily or monthly
                folders, and a destination that makes sense to you.
              </p>
              <div className="feature-example">
                <span>Desktop Archive</span>
                <div>
                  <span className="folder-icon" aria-hidden="true">
                    ▱
                  </span>
                  <span>2026-09</span>
                  <span>September</span>
                </div>
                <div>
                  <span className="folder-icon" aria-hidden="true">
                    ▱
                  </span>
                  <span>2026-08</span>
                  <span>August</span>
                </div>
                <div>
                  <span className="folder-icon" aria-hidden="true">
                    ▱
                  </span>
                  <span>2026-07</span>
                  <span>July</span>
                </div>
              </div>
            </article>
            <article>
              <span className="feature-number">02 / DOWNLOADS</span>
              <h3>
                From “it’s in here”
                <br />
                to right there.
              </h3>
              <p>
                Sort Downloads into familiar folders by file type. Documents,
                Images, Videos, Audio, Archives, Installers, and Other.
              </p>
              <div className="file-types">
                <span>
                  <i style={{ "--type": "var(--type-documents)" }}></i>Documents
                </span>
                <span>
                  <i style={{ "--type": "var(--type-images)" }}></i>Images
                </span>
                <span>
                  <i style={{ "--type": "var(--type-videos)" }}></i>Videos
                </span>
                <span>
                  <i style={{ "--type": "var(--type-audio)" }}></i>Audio
                </span>
                <span>
                  <i style={{ "--type": "var(--type-archives)" }}></i>Archives
                </span>
                <span>
                  <i style={{ "--type": "var(--type-installers)" }}></i>
                  Installers
                </span>
                <span>
                  <i style={{ "--type": "var(--type-other)" }}></i>Other
                </span>
              </div>
            </article>
          </div>
        </section>
        <section className="how-section wrap" id="how">
          <div>
            <p className="eyebrow">A LITTLE ROUTINE, A BIG EXHALE</p>
            <h2>
              Three steps.
              <br />
              <em>Then back to you.</em>
            </h2>
            <a className="text-link" href="#tour">
              Try it in the demo <span aria-hidden="true">→</span>
            </a>
          </div>
          <ol className="steps">
            <li>
              <span>01</span>
              <div>
                <h3>Choose your places.</h3>
                <p>
                  Select your Desktop and archive destination. Turn on Downloads
                  sorting when you want it.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Take a look before you tidy.</h3>
                <p>
                  Preview proposed file moves and destinations, then organize
                  when you’re ready.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Keep the habit. Keep control.</h3>
                <p>
                  Run manually, daily, or weekly while Mereday is open. Check
                  your receipts and undo eligible moves.
                </p>
              </div>
            </li>
          </ol>
        </section>
        <section className="confidence-section">
          <div className="wrap">
            <div className="confidence-heading">
              <p className="eyebrow">YOUR FILES. YOUR SAY.</p>
              <h2>
                A little order.
                <br />A lot of <em>peace of mind.</em>
              </h2>
            </div>
            <div className="confidence-grid">
              <article>
                <svg
                  className="line-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="m3 10 9-7 9 7M5 9v12h5v-7h4v7h5V9"></path>
                </svg>
                <h3>At home on your Mac.</h3>
                <p>
                  A native Mac app. Files and receipts stay on your Mac, with
                  access to the folders you choose.
                </p>
              </article>
              <article>
                <svg
                  className="line-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="m8 3-5 5 5 5M3 8h10a7 7 0 0 1 0 14h-2"></path>
                </svg>
                <h3>A way back.</h3>
                <p>
                  Receipts show what moved and where. Undo restores eligible
                  files when their original location is free.
                </p>
              </article>
              <article>
                <svg
                  className="line-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="3" y="6" width="14" height="15" rx="2"></rect>
                  <path d="M7 6V3h14v14h-4"></path>
                </svg>
                <h3>Room for your existing files.</h3>
                <p>
                  Existing files are never overwritten. Matching names get a
                  numbered suffix when organizing.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section className="faq-section wrap" id="faq">
          <div>
            <p className="eyebrow">A FEW GOOD QUESTIONS</p>
            <h2>
              Clear from
              <br />
              <em>the start.</em>
            </h2>
          </div>
          <div className="faq-list">
            <details open>
              <summary>Does Mereday delete my files?</summary>
              <p>
                Organizing moves your files into folders. It does not delete
                them. Desktop items go to your selected archive; Downloads files
                go into folders by type inside Downloads. Cleanup is not part of
                the current app.
              </p>
            </details>
            <details>
              <summary>Can I undo an organizing session?</summary>
              <p>
                Yes. Open a receipt and choose Undo remaining moves. Mereday
                checks that the moved file still matches and the original name
                is free. If something has changed, it leaves that item for you
                to review.
              </p>
            </details>
            <details>
              <summary>Does it work automatically?</summary>
              <p>
                Choose Manual, Daily, or Weekly. Scheduled organization runs
                while Mereday is running, including when its window is closed.
                It does not wake your Mac. You can enable Launch at login in
                Settings.
              </p>
            </details>
            <details>
              <summary>What about downloads still in progress?</summary>
              <p>
                Mereday skips known incomplete download types and files modified
                in the last 60 seconds. Existing folders, hidden items,
                packages, and symbolic links stay in place. This safeguard
                cannot identify every unfinished download.
              </p>
            </details>
            <details>
              <summary>Do I need an account or cloud storage?</summary>
              <p>
                No. The native app organizes files locally and stores receipts
                on your Mac. There is no account or AI service required.
              </p>
            </details>
            <details>
              <summary>When can I download Mereday?</summary>
              <p>
                Mereday is currently in development. A public Mac download is
                not available yet. Pricing, trial details, and supported macOS
                versions will be announced with the release. You can explore the
                interactive demo in the meantime.
              </p>
            </details>
          </div>
        </section>
        <section className="closing wrap" id="get">
          <img
            src="/assets/clearspace-icon.svg"
            width="78"
            height="78"
            alt=""
          />
          <p className="eyebrow">MAKE A LITTLE ROOM</p>
          <h2>
            Your next idea
            <br />
            deserves a <em>clear space.</em>
          </h2>
          <div className="hero-actions">
            <button className="button " data-download="" aria-haspopup="dialog">
              <svg
                className="apple-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M17.05 12.54c.03 3.15 2.76 4.2 2.79 4.21-.02.07-.44 1.5-1.44 2.98-.87 1.28-1.77 2.55-3.19 2.58-1.39.03-1.84-.83-3.43-.83-1.59 0-2.08.8-3.4.86-1.37.05-2.41-1.38-3.29-2.66-1.79-2.61-3.16-7.37-1.32-10.59.91-1.6 2.54-2.61 4.31-2.64 1.35-.02 2.62.92 3.44.92.82 0 2.35-1.14 3.95-.97.67.03 2.56.27 3.77 2.05-.1.06-2.25 1.32-2.19 4.09zM14.44 4.67c.74-.9 1.24-2.15 1.1-3.4-1.07.04-2.36.71-3.13 1.61-.69.79-1.3 2.05-1.14 3.26 1.19.09 2.41-.61 3.17-1.47z"
                ></path>
              </svg>
              Download for Mac
            </button>
            <a className="text-link" href="#tour">
              Or try the demo first <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="requirement">Mac download coming soon</p>
        </section>
      </main>
      <footer className="site-footer wrap">
        <a href="#" className="wordmark">
          <img
            src="/assets/clearspace-icon-32.svg"
            width="28"
            height="28"
            alt=""
          />
          Mereday
        </a>
        <p>Made for Mac.</p>
        <nav aria-label="Footer navigation">
          <a href="#get">Download</a>
          <a href="#why">The details</a>
          <a href="#faq">Questions</a>
          <a href="#tour">Try the demo</a>
        </nav>
        <small>© 2026 Mereday</small>
      </footer>
      <dialog
        id="download-dialog"
        aria-labelledby="download-title"
        aria-describedby="download-description"
      >
        <button
          className="dialog-close"
          aria-label="Close download information"
        >
          ×
        </button>
        <img src="/assets/clearspace-icon.svg" width="68" height="68" alt="" />
        <p className="eyebrow">A LITTLE ROOM, SOON</p>
        <h2 id="download-title">Mereday is on its way.</h2>
        <p id="download-description">
          The Mac app is still in development. The download, pricing, and system
          requirements will be available at launch.
        </p>
        <a className="button" href="#tour" id="dialog-demo">
          Try the demo
        </a>
      </dialog>

      <SiteInteractions />
    </>
  );
}
