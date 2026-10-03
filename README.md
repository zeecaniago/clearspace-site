# Mereday website

A standard Node.js / Next.js App Router application, ported from the static site at upstream commit `34700068bf4414ec795c1278d092b48c77a486b9` (October 2, 2026). The existing design, copy, assets, and browser-only sample demo are preserved.

The original repository contained HTML, CSS, JavaScript, and a Sites static-hosting configuration pointing at `dist/`. It did not contain a Cloudflare Worker, API, database, or other server dependency to migrate. This application needs no Cloudflare or Sites runtime, credentials, or plugins.

## Local development

Use Node.js 24 (see `.nvmrc`) and pnpm 11.25.0:

```sh
nvm use
npm install --global pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

Open <http://localhost:3000>. The package versions are pinned by `pnpm-lock.yaml`. Next.js 15 was selected because AWS currently documents managed Amplify Hosting compute support through that major version.

## Node.js and AWS Amplify

```sh
pnpm build
pnpm start
```

The production build is written to `.next/`. `pnpm start` runs the standard Next.js Node server. The homepage is prerendered; its interactive demo runs in the browser.

For Amplify Hosting:

1. Connect `zeecaniago/clearspace-site` and its production branch, `main`, in Amplify Hosting. The public product name is Mereday and the planned primary domain is `mereday.app`.
2. Set the application root to this repository's root, where `package.json` lives.
3. Use the checked-in `amplify.yml`. It selects Node.js 24, installs the locked dependencies, runs `pnpm build`, and publishes `.next/` through Amplify's Next.js compute support.
4. Leave `NEXT_OUTPUT` unset for this deployment mode. No application environment variables or backend services are required.

The local folder happens to be inside another checkout; the website is an independent Git repository. Do not configure Amplify against the parent Mac application repository unless you intentionally restructure it as a monorepo.

## Static export for S3

```sh
pnpm build:static
pnpm preview:static
```

Open <http://localhost:3001>. Upload the **contents** of `out/` to the hosting bucket, including `index.html`, `404.html`, `_next/`, and `assets/`. No Node process runs in production in this mode. Both build modes use Next.js's `.next/` working directory; stop a running Next.js server before switching modes and rerun `pnpm build` before returning to `pnpm start`. The exported `out/` folder remains independently usable.

For a private S3 bucket behind CloudFront, use an S3 REST origin with Origin Access Control, `index.html` as the distribution's default root object, and HTTPS. Configure missing-object responses to serve `/404.html` with a 404 status. This site has one page and in-page anchor links, so it does not require an SPA fallback. If you add nested routes later, map directory URLs such as `/about/` to their exported `/about/index.html` objects at CloudFront; S3 REST origins do not do that automatically.

For S3 website hosting instead, configure `index.html` as the index document and `404.html` as the error document. S3 website endpoints need public-read access and do not provide HTTPS directly; CloudFront is the usual HTTPS front end.

Server Actions, request-dependent route handlers, runtime SSR, and similar server features cannot run in the static export. The current site uses none of them. The app download remains a coming-soon dialog, matching the original site.

## Source layout

- `app/page.jsx`: prerendered marketing page, navigation, and download dialog.
- `app/layout.jsx`: metadata, icons, theme color, and shared styles.
- `components/product-demo.jsx`: React-rendered demo markup with browser initialization after hydration.
- `lib/demo.js`: the original sample-file behavior, scoped to the demo and adapted to clean up event handlers, timers, and animation frames on unmount.
- `components/site-interactions.jsx` and `lib/site.js`: menu, download dialog, and legacy anchor behavior with listener cleanup.
- `public/assets/`: the original images and icons.

The demo retains its imperative DOM implementation to preserve behavior. Its component intentionally has no React state-driven rerenders; treat the subtree as owned by the demo controller after hydration. If extending the demo into a larger React application, convert its state and rendering together rather than mixing React updates with direct DOM mutations.

## Verification

```sh
pnpm exec playwright install chromium
pnpm format:check
pnpm build
pnpm test
```

Playwright starts and stops a production Next.js server on port 3000 automatically. Stop any existing server on that port before running this sequence. To test a server you started separately (including `pnpm dev`), set `TEST_BASE_URL=http://127.0.0.1:3000`; Playwright then uses that server without managing its lifecycle.

Then verify the independent export:

```sh
pnpm build:static
pnpm preview:static
# In another terminal, with the static preview running:
TEST_BASE_URL=http://127.0.0.1:3001 pnpm test
```

The browser suite checks prerendered content, local assets, 404s, preview filters, organization, undo, report totals, receipt pagination, sample-folder configuration, keyboard navigation, appearance settings, download dialogs, FAQ expansion, mobile navigation, and legacy anchors. It also fails on browser and hydration errors. The same tests can run against `pnpm dev` to exercise React's development lifecycle.

## Continuous integration and production branch

`.github/workflows/ci.yml` runs on pull requests targeting `main`, pushes to `main`, and manual dispatch. Its required check, **Site checks**, installs locked dependencies with Node.js 24 and pnpm 11.25.0, checks formatting (including the workflow), builds the production site, and runs the browser suite against that build on Ubuntu. Focused tests (`test.only`) fail in CI. Browser reports and failure screenshots/traces are retained as workflow artifacts for seven days.

The `main` branch protection requires a pull request and a successful **Site checks** result from GitHub Actions, with the branch up to date before merging. Protection applies to administrators too, blocks force pushes and deletion, and requires review conversations to be resolved. A second person's approval is not required, so the repository owner can merge their own checked pull requests.

For changes, create a branch, open a pull request, wait for **Site checks**, and merge into `main`. Keep the check name stable, or update the required branch check when renaming it. GitHub branch protection is a repository setting; the workflow file alone does not enable it.

Once Amplify Hosting is connected to `main`, a merge triggers its build and deployment. The pull-request checks gate the merge; Amplify does not wait for the separate post-merge GitHub Actions run. This CI setup uses no AWS credentials and does not provision hosting or DNS.

## References

- [AWS Amplify support for Next.js](https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html)
- [AWS Amplify deployment and build settings](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-app.html)
- [AWS Amplify Node.js runtime support](https://docs.aws.amazon.com/amplify/latest/userguide/ssr-supported-features.html)
- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [Amazon S3 static website hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

Local builds and browser verification do not provision AWS resources or constitute an AWS deployment.
