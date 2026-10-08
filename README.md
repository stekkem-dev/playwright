# SauceDemo Playwright Automation

A beginner-readable Playwright Test framework using TypeScript, Page Objects, isolated browser contexts, and independent tests for https://www.saucedemo.com.

## Setup

```sh
npm ci
npx playwright install
cp .env.example .env
```

The demo's documented accounts and shared password are maintained in `data/users.ts`. They are public demo credentials, not private secrets. Do not place real environment credentials in source control.

## Run tests

```sh
npm test
npm run test:chromium
npm run test:smoke
npm run test:headed
npm run test:ui
npm run typecheck
npm run report
```

`npm test` runs desktop Chromium, Firefox, and WebKit projects. The mobile Chromium project is scoped to the responsive-layout test. For a quicker local feedback cycle, use `npm run test:chromium`.

## Configuration

The defaults are `TEST_ENV=saucedemo`, `BASE_URL=https://www.saucedemo.com`, and `TEST_TIMEOUT=30000` milliseconds. Set overrides in `.env` or in the shell/CI environment. For a named environment other than `saucedemo`, set its `BASE_URL` explicitly; no unverified dev/QA/staging URLs are assumed.

```sh
TEST_ENV=qa BASE_URL=https://your-qa-host.example npm test
```

`TEST_TIMEOUT` must be a positive number of milliseconds. Invalid URL or timeout settings stop configuration with an actionable message.

## Project layout

- `pages/`: UI locators and business actions kept together in Page Objects.
- `components/`: reusable page sections (currently the navigation menu).
- `fixtures/test.ts`: per-test Page Object fixtures; Playwright creates a fresh context per test.
- `data/`: supplied users, product expectations, and checkout data.
- `tests/`: business-feature specs; no test depends on another test's execution.
- `playwright.config.ts`: browser projects, environment setup, report, and failure artifacts.

## Implemented test coverage

Current automated coverage includes smoke/login/logout, locked-out and invalid-login validation, accepted persona login, catalog sorting, product detail navigation, cart add/remove and state reset, required checkout fields, successful order/totals, signed-out protected routes, and a mobile viewport flow.

The comprehensive test plan in `specs/saucedemo-test-plan.md` is the roadmap. Not every planned framework and quality scenario is implemented yet (for example, automated accessibility scans, visual baselines, and full diagnostics-policy verification). Add those incrementally as requirements are agreed; do not create dummy tests that merely assert configuration exists.

## Reports and artifacts

The HTML report is written to `playwright-report/`; JSON results and failure artifacts are written under `test-results/`. Screenshots, videos, and traces are retained for failing tests. CI uploads both directories even when tests fail.

## CI

The GitHub Actions workflow runs `npm ci`, installs browsers, typechecks the project, executes the browser suite, and uploads test results. A test failure fails the workflow.
