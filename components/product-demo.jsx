"use client";

import { useEffect, useRef } from "react";
import { initializeDemo } from "../lib/demo";

// The existing demo owns its DOM after hydration; React owns mounting and cleanup.
export default function ProductDemo() {
  const sectionRef = useRef(null);
  useEffect(() => initializeDemo(sectionRef.current), []);
  return (
    <section
      className="product-section"
      aria-labelledby="demo-heading"
      ref={sectionRef}
    >
      <div className="wrap">
        <div id="tour" className="demo-frame">
          <div className="app-shell" id="app-shell">
            <div className="window-bar">
              <div className="traffic-lights" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
              </div>
              <span>Mereday</span>
            </div>
            <div className="app-layout">
              <aside className="app-sidebar">
                <div className="app-wordmark">
                  <img
                    className="brand-light"
                    src="/assets/mereday-sidebar-light.png"
                    alt=""
                    width="20"
                    height="20"
                  />
                  <img
                    className="brand-dark"
                    src="/assets/mereday-sidebar-dark.png"
                    alt=""
                    width="20"
                    height="20"
                  />
                  Mereday
                </div>
                <div
                  className="demo-navigation"
                  role="tablist"
                  aria-label="Explore Mereday"
                >
                  <button
                    role="tab"
                    id="tab-organize"
                    aria-selected="true"
                    aria-controls="panel-organize"
                    tabIndex="0"
                    data-tab="organize"
                  >
                    <svg
                      className="app-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="7" height="7" rx="1.4"></rect>
                      <rect x="14" y="3" width="7" height="7" rx="1.4"></rect>
                      <rect x="3" y="14" width="7" height="7" rx="1.4"></rect>
                      <rect x="14" y="14" width="7" height="7" rx="1.4"></rect>
                    </svg>
                    <span>Organize</span>
                  </button>
                  <button
                    role="tab"
                    id="tab-reports"
                    aria-selected="false"
                    aria-controls="panel-reports"
                    tabIndex="-1"
                    data-tab="reports"
                  >
                    <svg
                      className="app-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M3 21h18M5 17V9h3v8M11 17V4h3v13M17 17v-6h3v6"></path>
                    </svg>
                    <span>Reports</span>
                  </button>
                  <button
                    role="tab"
                    id="tab-receipts"
                    aria-selected="false"
                    aria-controls="panel-receipts"
                    tabIndex="-1"
                    data-tab="receipts"
                  >
                    <svg
                      className="app-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M3 11a9 9 0 1 1 2 7M3 5v6h6m3-5v6l4 3"></path>
                    </svg>
                    <span>Receipts</span>
                  </button>
                  <button
                    role="tab"
                    id="tab-settings"
                    aria-selected="false"
                    aria-controls="panel-settings"
                    tabIndex="-1"
                    data-tab="settings"
                  >
                    <svg
                      className="app-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M3 6h4m5 0h9M3 12h10m5 0h3M3 18h2m5 0h11"></path>
                      <circle cx="9.5" cy="6" r="2.5"></circle>
                      <circle cx="15.5" cy="12" r="2.5"></circle>
                      <circle cx="7.5" cy="18" r="2.5"></circle>
                    </svg>
                    <span>Settings</span>
                  </button>
                </div>
                <div className="sidebar-foot">
                  <svg
                    className="app-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M14 5c2-1 3-3 2-4-2 0-4 2-4 4m8 12c-2 5-4 6-7 4-3 2-5 1-7-3-3-5-2-10 2-11 2-1 4 1 5 1s3-2 5-1c2 0 3 1 4 2-4 2-4 6-2 8Z"></path>
                  </svg>
                  <span>Made for Mac.</span>
                </div>
              </aside>
              <div className="app-content">
                <section
                  role="tabpanel"
                  id="panel-organize"
                  aria-labelledby="tab-organize"
                >
                  <div className="demo-heading">
                    <div>
                      <p className="eyebrow">A little everyday order</p>
                      <h3>A home for every file.</h3>
                      <p>A clearer Desktop. Downloads in their place.</p>
                    </div>
                    <button
                      className="icon-button"
                      id="appearance"
                      aria-label="Switch demo to dark appearance"
                    >
                      <svg
                        className="app-icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="organize-body">
                    <div className="orbit-side">
                      <div
                        className="orbit"
                        id="orbit"
                        role="img"
                        aria-label="12 items ready to organize"
                      >
                        <div className="orbit-inner">
                          <img
                            src="/assets/organize-folder.png"
                            alt=""
                            width="100"
                            height="86"
                          />
                          <strong id="item-count">12 items</strong>
                          <span id="ring-caption">ready to organize</span>
                        </div>
                      </div>
                      <div
                        className="legend"
                        aria-label="Filter preview by file type"
                      >
                        <button data-kind="Images" aria-pressed="false">
                          <i className="blue"></i>
                          <span>Images</span>
                          <b>0</b>
                        </button>
                        <button data-kind="Documents" aria-pressed="false">
                          <i className="purple"></i>
                          <span>Documents</span>
                          <b>0</b>
                        </button>
                        <button data-kind="Media" aria-pressed="false">
                          <i className="orange"></i>
                          <span>Media</span>
                          <b>0</b>
                        </button>
                        <button data-kind="Other" aria-pressed="false">
                          <i className="teal"></i>
                          <span>Other</span>
                          <b>0</b>
                        </button>
                      </div>
                      <div className="refresh-line">
                        <span id="checked-time">Checked just now</span>
                        <button className="text-button" id="refresh-overview">
                          <svg
                            className="app-icon"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M18 5a8 8 0 1 0 2 8m-2-12v5h-5"></path>
                          </svg>
                          Refresh
                        </button>
                      </div>
                    </div>
                    <div className="demo-actions">
                      <h4>Give your day a fresh start.</h4>
                      <p>Choose the places you’d like to put in order.</p>
                      <label className="location-option">
                        <span className="location-icon">
                          <svg
                            className="app-icon"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <rect
                              x="2"
                              y="3"
                              width="20"
                              height="14"
                              rx="1.5"
                            ></rect>
                            <path d="M8 21h8m-6-4v4m4-4v4"></path>
                          </svg>
                        </span>
                        <span>
                          <strong>Tidy Desktop</strong>
                          <small id="desktop-count">
                            6 items · dated archive
                          </small>
                        </span>
                        <input
                          id="desktop-enabled"
                          type="checkbox"
                          role="switch"
                          defaultChecked
                        />
                        <span className="switch" aria-hidden="true"></span>
                      </label>
                      <label className="location-option">
                        <span className="location-icon">
                          <svg
                            className="app-icon"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M12 3v15m-6-6 6 6 6-6M3 21h18"></path>
                          </svg>
                        </span>
                        <span>
                          <strong>Sort Downloads</strong>
                          <small id="downloads-count">
                            6 items · folders by type
                          </small>
                        </span>
                        <input
                          id="downloads-enabled"
                          type="checkbox"
                          role="switch"
                          defaultChecked
                        />
                        <span className="switch" aria-hidden="true"></span>
                      </label>
                      <button className="button organize-button" id="organize">
                        Organize 12 items
                      </button>
                      <button
                        className="preview-toggle text-button"
                        id="preview-toggle"
                        aria-expanded="false"
                        aria-controls="file-preview"
                      >
                        <span>Preview file moves</span>
                        <svg
                          className="app-icon"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </button>
                      <p className="move-note">
                        <svg
                          className="app-icon"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="m8 4-5 5 5 5M3 9h11a6 6 0 0 1 0 12h-3"></path>
                        </svg>
                        Moves only. Undo is available in Receipts.
                      </p>
                    </div>
                  </div>
                  <div className="destinations">
                    <div className="section-row">
                      <h4>Where everything goes</h4>
                      <button
                        className="text-button"
                        id="configure"
                        aria-expanded="false"
                        aria-controls="configuration"
                      >
                        <svg
                          className="app-icon"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                        <span>Configure</span>
                      </button>
                    </div>
                    <div className="destination-row" id="desktop-destination">
                      <span>
                        <svg
                          className="app-icon"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <rect
                            x="2"
                            y="3"
                            width="20"
                            height="14"
                            rx="1.5"
                          ></rect>
                          <path d="M8 21h8m-6-4v4m4-4v4"></path>
                        </svg>
                        Desktop
                      </span>
                      <span>
                        <svg
                          className="app-icon"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M3 7V5h7l2 2h9v13H3Z"></path>
                          <path d="M3 9h18"></path>
                        </svg>
                        <b id="archive-destination">Desktop Archive</b>
                      </span>
                      <small id="grouping-hint">By month</small>
                    </div>
                    <div className="destination-row" id="downloads-destination">
                      <span>
                        <svg
                          className="app-icon"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 3v15m-6-6 6 6 6-6M3 21h18"></path>
                        </svg>
                        Downloads
                      </span>
                      <span>
                        <svg
                          className="app-icon"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M3 7V5h7l2 2h9v13H3Z"></path>
                          <path d="M3 9h18"></path>
                        </svg>
                        <b>Documents, Images, and more</b>
                      </span>
                      <small>By type</small>
                    </div>
                    <div id="configuration" className="app-card" hidden>
                      <p className="sample-note">
                        Choose sample locations to explore the app’s setup.
                      </p>
                      <div className="folder-setting">
                        <span>Desktop</span>
                        <span id="desktop-path">Sample Mac / Desktop</span>
                        <button
                          className="secondary-button"
                          data-folder="desktop"
                        >
                          Choose folder…
                        </button>
                      </div>
                      <div className="folder-setting">
                        <span>Archive</span>
                        <span id="archive-path">
                          Sample Mac / Desktop Archive
                        </span>
                        <button
                          className="secondary-button"
                          data-folder="archive"
                        >
                          Choose folder…
                        </button>
                      </div>
                      <div className="folder-setting">
                        <span>Downloads</span>
                        <span id="downloads-path">Sample Mac / Downloads</span>
                        <button
                          className="secondary-button"
                          data-folder="downloads"
                        >
                          Choose folder…
                        </button>
                      </div>
                      <div className="section-row grouping-setting">
                        <span>Group archives</span>
                        <fieldset className="segments">
                          <legend className="sr-only">Grouping</legend>
                          <label>
                            <input
                              type="radio"
                              name="grouping"
                              value="Monthly"
                              defaultChecked
                            />
                            <span>Monthly</span>
                          </label>
                          <label>
                            <input type="radio" name="grouping" value="Daily" />
                            <span>Daily</span>
                          </label>
                        </fieldset>
                      </div>
                      <p className="sample-note">
                        Downloads stay in their selected folder, grouped into
                        Documents, Images, Videos, Audio, Archives, Installers,
                        and Other. Existing folders and unfinished or recent
                        downloads stay in place.
                      </p>
                    </div>
                  </div>
                  <div className="demo-schedule">
                    <div>
                      <h4>Keep it this way.</h4>
                      <p id="schedule-description">
                        Organize whenever you’re ready.
                      </p>
                    </div>
                    <fieldset className="segments">
                      <legend className="sr-only">Schedule</legend>
                      <label>
                        <input
                          type="radio"
                          name="schedule"
                          value="Manual"
                          defaultChecked
                        />
                        <span>Manual</span>
                      </label>
                      <label>
                        <input type="radio" name="schedule" value="Daily" />
                        <span>Daily</span>
                      </label>
                      <label>
                        <input type="radio" name="schedule" value="Weekly" />
                        <span>Weekly</span>
                      </label>
                    </fieldset>
                  </div>
                  <div id="file-preview" className="app-card" hidden>
                    <div className="section-row">
                      <h4 id="preview-title">
                        Your files, with a place to go.
                      </h4>
                      <div className="inline-actions">
                        <button
                          className="icon-button"
                          id="refresh-preview"
                          aria-label="Refresh file preview"
                        >
                          <svg
                            className="app-icon"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M18 5a8 8 0 1 0 2 8m-2-12v5h-5"></path>
                          </svg>
                        </button>
                        <button
                          className="icon-button"
                          id="close-preview"
                          aria-label="Close preview"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    <p className="sample-note" id="snapshot-note"></p>
                    <div id="preview-rows"></div>
                  </div>
                  <div className="last-run app-card" id="last-run" hidden>
                    <svg
                      className="app-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M3 11a9 9 0 1 1 2 7M3 5v6h6m3-5v6l4 3"></path>
                    </svg>
                    <div>
                      <strong id="last-run-summary"></strong>
                      <p id="last-run-date"></p>
                    </div>
                    <button className="text-button" data-open-receipts="">
                      View receipts
                    </button>
                  </div>
                </section>
                <section
                  role="tabpanel"
                  id="panel-reports"
                  aria-labelledby="tab-reports"
                  hidden
                >
                  <div className="demo-heading">
                    <div>
                      <p className="eyebrow">Your organizing story</p>
                      <h3>A little order adds up.</h3>
                      <p>See the small steps that gave your files a home.</p>
                    </div>
                  </div>
                  <div className="report-period">
                    <div
                      className="segments period-tabs"
                      role="group"
                      aria-label="Report period"
                    >
                      <button aria-pressed="true" data-period="week">
                        This week
                      </button>
                      <button aria-pressed="false" data-period="month">
                        This month
                      </button>
                    </div>
                    <span id="report-range"></span>
                  </div>
                  <div className="report-overview">
                    <div>
                      <strong id="report-total">0</strong>
                      <span>items organized</span>
                      <small id="report-period-caption">
                        This week, so far.
                      </small>
                    </div>
                    <div className="source-totals">
                      <div>
                        <svg
                          className="app-icon"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <rect
                            x="2"
                            y="3"
                            width="20"
                            height="14"
                            rx="1.5"
                          ></rect>
                          <path d="M8 21h8m-6-4v4m4-4v4"></path>
                        </svg>
                        <span>Desktop archived</span>
                        <strong id="desktop-total">0</strong>
                      </div>
                      <div>
                        <svg
                          className="app-icon"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 3v15m-6-6 6 6 6-6M3 21h18"></path>
                        </svg>
                        <span>Downloads sorted</span>
                        <strong id="downloads-total">0</strong>
                      </div>
                    </div>
                  </div>
                  <div id="report-empty" className="app-card empty-state">
                    <img
                      src="/assets/organize-folder.png"
                      alt=""
                      width="100"
                      height="86"
                    />
                    <h4>Your next fresh start is a small one.</h4>
                    <p id="report-empty-description">
                      No remaining organized items this week. Organize a few
                      files, and your activity will appear here.
                    </p>
                    <button className="text-button" data-go-organize="">
                      Go to Organize
                    </button>
                  </div>
                  <div id="report-populated" hidden>
                    <div className="app-card rhythm-panel">
                      <div className="section-row">
                        <div>
                          <h4>Your rhythm</h4>
                          <p className="sample-note">
                            Items organized each day
                          </p>
                        </div>
                        <div className="chart-legend">
                          <span>
                            <i className="blue"></i>Desktop
                          </span>
                          <span>
                            <i className="teal"></i>Downloads
                          </span>
                        </div>
                      </div>
                      <div className="chart-wrap">
                        <div className="chart-scale" aria-hidden="true"></div>
                        <div
                          className="chart"
                          id="activity-chart"
                          role="group"
                          aria-label="Organizing activity by day"
                        ></div>
                      </div>
                      <div className="day-detail">
                        <div>
                          <strong id="day-title">
                            Every small reset counts.
                          </strong>
                          <p id="day-description">
                            Select a day to see its activity.
                          </p>
                        </div>
                        <button className="text-button" id="day-receipt" hidden>
                          View receipt
                        </button>
                        <div className="inline-actions">
                          <button
                            className="icon-button"
                            id="previous-day"
                            aria-label="Previous report day"
                          >
                            ‹
                          </button>
                          <button
                            className="icon-button"
                            id="next-day"
                            aria-label="Next report day"
                          >
                            ›
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="app-card report-destinations">
                      <div className="section-row">
                        <h4>Where things went</h4>
                        <span
                          id="destination-count"
                          className="sample-note"
                        ></span>
                      </div>
                      <div id="report-destinations"></div>
                      <button
                        className="text-button"
                        id="show-destinations"
                        hidden
                      ></button>
                    </div>
                    <button
                      className="latest-run app-card"
                      id="latest-report-receipt"
                    ></button>
                  </div>
                  <div className="report-footnote">
                    <p>
                      From this demo’s receipts. Undone moves are excluded.
                      Repeat moves count separately; a folder counts as one
                      item.
                    </p>
                    <button className="text-button" data-open-receipts="">
                      All receipts
                    </button>
                  </div>
                </section>
                <section
                  role="tabpanel"
                  id="panel-receipts"
                  aria-labelledby="tab-receipts"
                  hidden
                >
                  <div className="demo-heading">
                    <div>
                      <p className="eyebrow">Your files, accounted for</p>
                      <h3>A little peace of mind.</h3>
                      <p>See where everything went. Undo when you need to.</p>
                    </div>
                  </div>
                  <div id="receipts-content"></div>
                </section>
                <section
                  role="tabpanel"
                  id="panel-settings"
                  aria-labelledby="tab-settings"
                  hidden
                >
                  <div className="demo-heading">
                    <div>
                      <p className="eyebrow">Make yourself at home</p>
                      <h3>Just the way you like it.</h3>
                      <p>A few small preferences for your everyday routine.</p>
                    </div>
                  </div>
                  <div className="app-card settings-card">
                    <h4>Appearance</h4>
                    <fieldset className="segments">
                      <legend className="sr-only">Appearance</legend>
                      <label>
                        <input
                          type="radio"
                          name="appearance"
                          value="System"
                          defaultChecked
                        />
                        <span>System</span>
                      </label>
                      <label>
                        <input type="radio" name="appearance" value="Light" />
                        <span>Light</span>
                      </label>
                      <label>
                        <input type="radio" name="appearance" value="Dark" />
                        <span>Dark</span>
                      </label>
                    </fieldset>
                    <p>System follows your Mac’s appearance.</p>
                  </div>
                  <div className="app-card settings-card">
                    <h4>Startup</h4>
                    <label className="startup-option">
                      <span>Launch at login</span>
                      <input type="checkbox" id="launch-login" role="switch" />
                      <span className="switch" aria-hidden="true"></span>
                    </label>
                    <p>
                      Start Mereday when you sign in. Closing its window keeps
                      scheduled tidies running; quitting stops them.
                    </p>
                    <p className="sample-note">
                      Try the switch here. This demo doesn’t change your Mac’s
                      login settings.
                    </p>
                  </div>
                </section>
              </div>
            </div>
            <div className="demo-footnote">
              <span>Interactive demo · sample files only</span>
              <span>Your actual files stay untouched.</span>
            </div>
            <dialog id="folder-dialog" aria-labelledby="folder-dialog-title">
              <form method="dialog">
                <h3 id="folder-dialog-title">Choose a sample folder</h3>
                <p>This changes the demo only.</p>
                <label>
                  Sample location
                  <select
                    id="sample-folder"
                    aria-label="Sample location"
                  ></select>
                </label>
                <div className="dialog-actions">
                  <button className="secondary-button" value="cancel">
                    Cancel
                  </button>
                  <button
                    className="button"
                    id="choose-sample-folder"
                    value="choose"
                  >
                    Choose folder
                  </button>
                </div>
              </form>
            </dialog>
          </div>
        </div>
        <p className="demo-live sr-only" id="demo-live" aria-live="polite"></p>
        <div className="section-intro tour-intro">
          <div>
            <p className="eyebrow">MEET MEREDAY</p>
            <h2 id="demo-heading">
              Less sorting. <em>More starting.</em>
            </h2>
          </div>
          <p>
            A little order goes a long way. Try organizing the sample files
            above.
          </p>
        </div>
      </div>
    </section>
  );
}
