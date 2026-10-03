// Page navigation and download information are separate from the original demo.
export function initializeSite() {
  const abortController = new AbortController();
  const on = (target, type, listener) =>
    target.addEventListener(type, listener, { signal: abortController.signal });
  const find = (selector) => document.querySelector(selector);
  const all = (selector) => [...document.querySelectorAll(selector)];
  const closeMenu = () => {
    find("#main-navigation").classList.remove("open");
    find("#menu-toggle").setAttribute("aria-expanded", "false");
    find("#menu-toggle").setAttribute("aria-label", "Open menu");
  };
  on(find("#menu-toggle"), "click", () => {
    const open = find("#main-navigation").classList.toggle("open");
    find("#menu-toggle").setAttribute("aria-expanded", String(open));
    find("#menu-toggle").setAttribute(
      "aria-label",
      open ? "Close menu" : "Open menu",
    );
  });
  all("#main-navigation a").forEach((link) => on(link, "click", closeMenu));
  on(document, "keydown", (event) => {
    if (
      event.key === "Escape" &&
      find("#main-navigation").classList.contains("open")
    ) {
      closeMenu();
      find("#menu-toggle").focus();
    }
  });
  const dialog = find("#download-dialog");
  all("[data-download]").forEach((button) =>
    on(button, "click", () => dialog.showModal()),
  );
  on(find(".dialog-close"), "click", () => dialog.close());
  on(find("#dialog-demo"), "click", (event) => {
    event.preventDefault();
    dialog.close();
    if (location.hash !== "#tour") history.pushState(null, "", "#tour");
    find("#tab-organize").click();
    find("#organize").focus({ preventScroll: true });
  });
  const legacyAnchors = {
    "#demo": "#tour",
    "#features": "#why",
    "#how-it-works": "#how",
    "#questions": "#faq",
  };
  const resolveLegacyAnchor = () => {
    const target = legacyAnchors[location.hash];
    if (!target) return;
    history.replaceState(null, "", target);
    find(target).scrollIntoView();
  };
  on(window, "hashchange", resolveLegacyAnchor);
  resolveLegacyAnchor();
  return () => abortController.abort();
}
