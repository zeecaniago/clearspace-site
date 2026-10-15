export default function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <a href="/" className="wordmark" aria-label="Mereday home">
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
        <a href="/#tour">Try the demo</a>
        <a href="/support/">Support</a>
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
      </nav>
      <small>© 2026 Mereday</small>
    </footer>
  );
}
