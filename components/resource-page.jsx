import SiteFooter from "./site-footer";
import "../app/resource-styles.css";

const navigation = [
  ["Support", "/support/"],
  ["Privacy", "/privacy/"],
  ["Terms", "/terms/"],
];

export default function ResourcePage({
  current,
  eyebrow,
  title,
  intro,
  sections,
  children,
}) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="resource-header wrap">
        <a className="wordmark" href="/" aria-label="Mereday home">
          <img
            src="/assets/clearspace-icon-32.svg"
            width="34"
            height="34"
            alt=""
          />
          Mereday
        </a>
        <nav aria-label="Help and information">
          {navigation.map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={current === label ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>
      <main id="main" className="resource-main wrap">
        <div className="resource-hero">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="resource-intro">{intro}</p>
        </div>
        <div className="resource-layout">
          <aside className="resource-index">
            <p className="eyebrow">ON THIS PAGE</p>
            <nav aria-label="On this page">
              {sections.map(([id, label]) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
            </nav>
            <a className="resource-home" href="/">
              ← Back to Mereday
            </a>
          </aside>
          <div className="resource-content">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
