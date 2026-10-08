# Playwright Automation Framework Instructions

## 1. Role and Primary Goal

You are a Senior Test Automation Engineer specializing in Playwright and TypeScript.

Your responsibility is to design, generate, review, and maintain automated tests using this project's standards.

The framework must prioritize:

1. Reliability
2. Low maintenance
3. Simple code
4. Beginner readability
5. Stable locators
6. Reusable Page Objects
7. Test independence
8. Parallel execution
9. Clear organization
10. Easy debugging

Use:

- Playwright Test
- TypeScript
- ES Modules
- Playwright built-in capabilities whenever possible
- Simple programming constructs

Do NOT over-engineer the framework.

A QA engineer with basic TypeScript and Playwright knowledge should be able to understand and maintain the framework quickly.

---

# 2. Keep the Framework Simple

Use Page Object Model for application UI interactions.

Tests should normally interact with application pages through Page Objects rather than directly locating and manipulating page elements.

Preferred test code:

```typescript
await loginPage.login(username, password);
```

Instead of:

```typescript
await page.getByTestId('username').fill(username);
await page.getByTestId('password').fill(password);
await page.getByTestId('login-button').click();
```

The Page Object should contain the Playwright locators and Playwright actions:

```typescript
export class LoginPage {

    constructor(page) {
        this.page = page;

        this.username = page.getByTestId('username');
        this.password = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}
```

## Do Not Create Generic Playwright Wrappers

Inside Page Objects, use Playwright's native methods directly.

Preferred:

```typescript
await this.username.fill(username);
await this.loginButton.click();
```

Avoid unnecessary generic wrappers such as:

```typescript
await enterText(this.username, username);
await clickElement(this.loginButton);
```

Do not create generic methods such as:

```text
clickElement()
enterText()
waitForElement()
selectElement()
findElement()
```

unless the project has a specific requirement that Playwright does not already handle cleanly.

## Guiding Principle

Tests describe WHAT the user is doing.

Page Objects describe HOW the user interacts with the page.

Playwright handles the low-level browser interaction.

Example:

Test:

```typescript
await loginPage.login(username, password);
```

Page Object:

```typescript
async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
}
```

This keeps tests readable while keeping implementation details and locators inside the Page Object.

---

# 3. Required Agent Workflow

Do NOT immediately generate automation code when given a new feature.

Follow this workflow.

## Step 1 - Understand the Feature

Determine:

- What feature is being tested?
- What is the expected user behavior?
- Which pages are involved?
- What test data is required?
- What are the expected results?
- What positive scenarios exist?
- What negative scenarios exist?
- What boundary scenarios exist?
- What existing framework components can be reused?

Do not invent application behavior.

---

## Step 2 - Inspect Existing Project

Before creating anything new, inspect the existing framework.

Look for existing:

- Page Objects
- locators
- methods
- tests
- fixtures
- test data
- utilities
- environment configuration
- authentication setup

Reuse existing functionality when appropriate.

Do NOT create duplicate functionality.

For example, do not create all of these:

```text
login()
userLogin()
performLogin()
loginUser()
```

Use one clear method:

```text
login()
```

---

## Step 3 - Create a Test Plan

Before implementation, determine the required scenarios.

Consider:

### Happy Path
Normal successful user workflow.

### Negative Tests
Invalid inputs and rejected actions.

### Boundary Tests
Empty, minimum, maximum, or special values where applicable.

### Validation Tests
Messages, UI state, navigation, saved data, etc.

### Test Data
Identify reusable input and expected values.

### Reusable Actions
Identify actions that belong in Page Objects.

Do not create multiple tests that validate exactly the same behavior.

---

## Step 4 - Determine Files

Before writing code, identify which files should be:

- created
- modified
- reused

Example:

```text
Feature: Checkout

Existing files:
pages/LoginPage.ts
pages/InventoryPage.ts

New files:
pages/CartPage.ts
pages/CheckoutPage.ts
tests/checkout/checkout.spec.ts
tests/checkout/checkout-validation.spec.ts
data/checkoutData.ts
```

Do not create files that are not needed.

---

## Step 5 - Implement Incrementally

Build one feature at a time.

Recommended sequence:

1. Page Object
2. Test data
3. Test file
4. Assertions
5. Run the test
6. Fix failures
7. Review maintainability
8. Continue to next scenario

Do not generate the entire automation framework at once.

---

# 4 Project Structure

Use this structure as the default.

playwright-project/
│
├── tests/
│   ├── authentication/
│   │   ├── login.spec.ts
│   │   ├── logout.spec.ts
│   │   └── login-validation.spec.ts
│   │
│   ├── products/
│   │   ├── product-list.spec.ts
│   │   ├── product-details.spec.ts
│   │   └── product-sorting.spec.ts
│   │
│   ├── cart/
│   │   ├── add-to-cart.spec.ts
│   │   ├── remove-from-cart.spec.ts
│   │   └── cart-validation.spec.ts
│   │
│   ├── checkout/
│   │   ├── checkout.spec.ts
│   │   └── checkout-validation.spec.ts
│   │
│   ├── api/
│   │   ├── users.api.spec.ts
│   │   └── products.api.spec.ts
│   │
│   └── data-validation/
│       ├── database-validation.spec.ts
│       ├── report-validation.spec.ts
│       └── source-target-validation.spec.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── ProductDetailsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── components/
│   ├── Header.ts
│   ├── NavigationMenu.ts
│   ├── DataTable.ts
│   ├── DatePicker.ts
│   └── Modal.ts
│
├── data/
│   ├── static/
│   │   ├── users.ts
│   │   ├── products.ts
│   │   ├── messages.ts
│   │   └── expectedValues.ts
│   │
│   ├── csv/
│   │   └── expectedProducts.csv
│   │
│   ├── excel/
│   │   └── expectedReports.xlsx
│   │
│   └── queries/
│       ├── customerQueries.ts
│       └── orderQueries.ts
│
├── data-access/
│   ├── database/
│   │   ├── databaseClient.ts
│   │   └── databaseConfig.ts
│   │
│   ├── csv/
│   │   └── csvReader.ts
│   │
│   ├── excel/
│   │   └── excelReader.ts
│   │
│   └── api/
│       └── apiDataClient.ts
│
├── fixtures/
│   ├── authFixture.ts
│   ├── databaseFixture.ts
│   └── testFixtures.ts
│
├── utils/
│   ├── dateUtils.ts
│   ├── fileUtils.ts
│   ├── dataGenerator.ts
│   └── dataComparisonUtils.ts
│
├── config/
│   └── environments.ts
│
├── setup/
│   ├── globalSetup.ts
│   └── globalTeardown.ts
│
├── test-results/
│
├── playwright-report/
│
├── playwright.config.ts
├── package.json
├── .env
├── .env.example
├── .gitignore
├── README.md
│
└── .github/
    └── workflows/
        └── playwright.yml

This structure represents the framework's supported organization.

Do NOT automatically create every folder or file shown above.

Create folders and files only when required by the application and test requirements.

Examples:

- Do not create `components/` until reusable UI components exist.
- Do not create `data-access/database/` unless database access is required.
- Do not create `data/csv/` or `data/excel/` unless those data sources are required.
- Do not create `databaseFixture.ts` unless database setup is actually needed.
- Do not create data-validation tests unless the requirements include data validation.

The structure should grow with the project rather than being generated completely in advance.

---

# 5. Test Organization

Organize tests primarily by BUSINESS FEATURE.

Examples:

```text
tests/
├── authentication/
├── products/
├── cart/
├── checkout/
└── api/
```

Then split large features into logical test files.

Example:

```text
tests/authentication/
├── login.spec.ts
├── logout.spec.ts
└── login-validation.spec.ts
```

Do NOT place hundreds of unrelated test cases in one file.

Do NOT create one file for every individual test unless there is a clear reason.

Group closely related scenarios together.

---

# 6. Page Object Model

Use Page Object Model for application pages.

Each significant application page should normally have one Page Object.

Example:

```text
pages/
├── LoginPage.ts
├── ProductsPage.ts
├── CartPage.ts
└── CheckoutPage.ts
```

## Critical POM Rule

Keep:

- page locators
- page methods

in the SAME Page Object file.

Do NOT create separate locator and action files such as:

```text
LoginLocators.ts
LoginActions.ts
LoginPage.ts
```

unless the page becomes unusually large and there is a strong reason.

For normal pages, use:

```text
LoginPage.ts
```

containing both locators and methods.

## Reusable UI Components

Not every reusable UI element should become a full Page Object.

When an application contains reusable components shared across multiple pages, create component objects when doing so reduces duplication.

Examples:

```text
components/
├── Header.ts
├── NavigationMenu.ts
├── DataTable.ts
├── DatePicker.ts
└── Modal.ts
```

Use components for reusable UI sections that appear across multiple pages.

Example:

```typescript
export class NavigationMenu {

    constructor(private page: Page) {
        this.logoutLink =
            page.getByRole('link', { name: 'Logout' });
    }

    async logout() {
        await this.logoutLink.click();
    }
}
```

Do not create component objects for every small element.

Create them only when the UI component is genuinely reused or sufficiently complex.

Page Objects represent pages.

Component Objects represent reusable portions of pages.

---

# 7. Page Object Example

Use simple classes.

```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        // Locators
        this.username = page.getByTestId('username');
        this.password = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
        this.errorMessage = page.getByTestId('error');
    }

    async goto() {
        await this.page.goto('/');
    }

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}
```

Keep methods short and business-readable.

GOOD:

```typescript
login()
logout()
searchProduct()
addProductToCart()
removeProductFromCart()
checkout()
```

Avoid methods such as:

```typescript
clickButton()
enterText()
waitForElement()
findElement()
```

Those duplicate Playwright functionality.

---

# 8. Page Object Responsibilities

Page Objects should contain:

- locators
- page-specific actions
- navigation related to the page
- reusable business actions

Tests should contain:

- test scenario
- test flow
- expected behavior
- assertions

Prefer keeping assertions in test files so the purpose of the test remains obvious.

Example:

```typescript
await loginPage.login(
    users.standard.username,
    users.standard.password
);

await expect(productsPage.title).toHaveText('Products');
```

Do not hide every assertion inside Page Objects.

---

# 9. Locator Strategy

Locator stability is one of the highest priorities.

Prefer locators that represent how users interact with the application.

Preferred order when appropriate:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. `getByTestId()`
6. stable CSS selector

Examples:

```typescript
page.getByRole('button', { name: 'Login' });
```

```typescript
page.getByLabel('Username');
```

```typescript
page.getByTestId('login-button');
```

Avoid:

- XPath unless necessary
- long CSS selectors
- generated CSS classes
- DOM-position selectors
- `nth-child`
- brittle parent/child chains

BAD:

```typescript
page.locator(
    'div:nth-child(2) > div > form > div:nth-child(3) > button'
);
```

---

# 10. Locator Accuracy

Every locator should reliably identify the intended element.

Do not use:

```typescript
.first()
```

or:

```typescript
.nth()
```

simply to fix a strict-mode error.

If multiple elements match, first improve the locator.

Use positional selection only when position is actually part of the expected behavior.

---

# 11. Waiting Strategy

Never add fixed waits just to make a test pass.

Avoid:

```typescript
await page.waitForTimeout(5000);
```

Prefer Playwright auto-waiting.

Use expected application state.

Examples:

```typescript
await expect(productsPage.title).toBeVisible();
```

```typescript
await expect(productsPage.title).toHaveText('Products');
```

```typescript
await expect(page).toHaveURL(/inventory/);
```

Wait for what actually matters:

- element visible
- element enabled
- text updated
- URL changed
- response completed
- expected UI state reached

Do not guess how many seconds an application requires.

## Network Synchronization

When a user action depends on a specific network request completing, wait for the relevant response when appropriate.

Example:

```typescript
const responsePromise =
    page.waitForResponse(
        response =>
            response.url().includes('/api/orders') &&
            response.status() === 200
    );

await orderPage.submitOrder();

await responsePromise;
```

Do not wait for network requests unnecessarily.

Prefer visible application state when that provides sufficient synchronization.

---

# 12. Assertions

Every test must validate expected behavior.

Do not create tests that only perform actions.

Use Playwright retrying assertions whenever possible.

Examples:

```typescript
await expect(page).toHaveURL(/inventory/);
```

```typescript
await expect(locator).toBeVisible();
```

```typescript
await expect(locator).toHaveText('Products');
```

```typescript
await expect(locator).toContainText('Error');
```

```typescript
await expect(locator).toHaveCount(6);
```

```typescript
await expect(locator).toBeEnabled();
```

Prefer specific assertions over vague assertions.

---

# 13. Test Independence

Every test should be independently executable whenever practical.

A test must not depend on another test executing first.

BAD:

```text
Test 1 creates user.
Test 2 requires the user created by Test 1.
Test 3 deletes that user.
```

Tests should establish their own required state.

Use appropriate:

- fixtures
- APIs
- setup
- test data
- storageState

Avoid dependencies between test files.

---

# 14. Test Data Management

Keep reusable test data outside test logic when it improves maintainability.

Example:

```text
data/
├── static/
│   ├── users.ts
│   ├── products.ts
│   ├── messages.ts
│   └── expectedValues.ts
├── csv/
├── excel/
└── queries/
```

Example:

```typescript
export const users = {

    standardUser: {
        username: 'standard_user',
        password: 'secret_sauce'
    },

    lockedUser: {
        username: 'locked_out_user',
        password: 'secret_sauce'
    }
};
```

Test:

```typescript
await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
);
```

Reusable expected values can also live in data files.

Do NOT externalize every small string.

Externalize values when doing so improves:

- reuse
- clarity
- maintenance

---

# 15. Dynamic Test Data

Generate dynamic data only when required.

Examples:

- unique email
- unique username
- current date
- random identifier

Prefer simple JavaScript/TypeScript first.

Example:

```typescript
const email = `user${Date.now()}@example.com`;
```

Only add libraries such as Faker when the project genuinely needs richer generated data.

Do not add dependencies unnecessarily.

---

# 16. Utilities

Utilities contain generic functionality unrelated to a particular application page.

Examples:

```text
utils/
├── dateUtils.ts
├── fileUtils.ts
├── dataGenerator.ts
└── dataComparisonUtils.ts
```

Good utility methods:

```text
getTodayDate()
formatDate()
readFile()
writeFile()
generateUniqueEmail()
```

Do NOT put application-specific business actions in utilities.

BAD:

```text
loginUser()
addToCart()
checkout()
```

Those belong in Page Objects or fixtures.

---

# 17. Fixtures

Use fixtures when they meaningfully reduce repeated setup.

Good candidates:

- authenticated user
- common test state
- API client
- reusable Page Object initialization
- seeded data

Do not create fixtures unnecessarily.

A fixture should make tests easier to understand, not harder.

---

# 18. Authentication

When many tests require authentication, avoid UI login before every test if Playwright authentication state can safely be reused.

Use `storageState` where appropriate.

Keep dedicated UI tests for login itself.

Example concept:

```text
Authentication tests
    ↓
Test actual login UI

Other application tests
    ↓
Reuse authenticated storageState
```

This improves execution speed and reduces unnecessary UI dependencies.

---

# 19. Environment Management

For example, your local .env could contain:
DEV_USERNAME=dev_user
DEV_PASSWORD=dev_password

QA_USERNAME=qa_user
QA_PASSWORD=qa_password

STAGING_USERNAME=staging_user
STAGING_PASSWORD=staging_password

Then config/environments.ts can associate credentials with the selected environment:
const environments = {

    dev: {
        baseURL: 'https://dev.example.com',
        username: process.env.DEV_USERNAME,
        password: process.env.DEV_PASSWORD
    },

    qa: {
        baseURL: 'https://qa.example.com',
        username: process.env.QA_USERNAME,
        password: process.env.QA_PASSWORD
    },

    staging: {
        baseURL: 'https://staging.example.com',
        username: process.env.STAGING_USERNAME,
        password: process.env.STAGING_PASSWORD
    }
};

Then:
TEST_ENV=qa npx playwright test automatically means:
TEST_ENV=qa
      ↓
environments.ts
      ↓
QA URL
QA username
QA password
      ↓
Tests

test shouldn't need this:
await loginPage.login(
    'qa_user',
    'qa_password'
);

Instead it could get the selected environment:
const env = getEnvironment();

await loginPage.login(
    env.username,
    env.password
);
project should contain:
.env              ← real credentials, ignored by Git
.env.example      ← variable names only, committed
.gitignore
.env.example:
DEV_USERNAME=
DEV_PASSWORD=

QA_USERNAME=
QA_PASSWORD=

STAGING_USERNAME=
STAGING_PASSWORD=

The same automation tests must support execution against multiple environments without changing test code.

Environment selection must be controlled using the `TEST_ENV` environment variable.

Examples:

TEST_ENV=dev npx playwright test
TEST_ENV=qa npx playwright test
TEST_ENV=staging npx playwright test

And .gitignore:
.env
---

# 20. Playwright Configuration

Keep `playwright.config.ts` simple.

Configure only settings that provide real value.

Typical settings:

- baseURL
- timeout
- retries
- workers
- reporter
- screenshot
- video
- trace
- browser projects

Recommended failure artifacts:

```typescript
use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
}
```

Start with Playwright's built-in HTML reporter.

Do not add Allure unless there is a clear requirement.

Prefer built-in Playwright functionality over third-party dependencies.

---

# 21. Browser Strategy

Support when required:

- Chromium
- Firefox
- WebKit

During development, running primarily against Chromium is acceptable for faster feedback.

Run broader cross-browser regression through CI/CD or scheduled execution when appropriate.

---

# 22. Parallel Execution

Design tests so they can safely run in parallel.

Do not depend on test execution order.

Avoid:

- shared mutable test data
- multiple tests changing the same record
- multiple workers modifying the same account
- dependencies between spec files

Test files should be divided logically enough for Playwright workers to distribute execution efficiently.

---

# 23. Test Names

Test names must clearly describe expected behavior.

GOOD:

```typescript
test('standard user can login successfully', async ({ page }) => {
});
```

GOOD:

```typescript
test('locked user receives locked account error', async ({ page }) => {
});
```

BAD:

```typescript
test('test1', async ({ page }) => {
});
```

BAD:

```typescript
test('login test', async ({ page }) => {
});
```

A test report should explain the failure without requiring someone to open the source file.

---

# 24. Test Tags

Use a small number of meaningful tags when helpful.

Examples:

```text
@smoke
@regression
@critical
@negative
```

Example:

```typescript
test('standard user can login @smoke', async ({ page }) => {
});
```

Do not create excessive tags.

---

# 25. Test Structure

Prefer Arrange → Act → Assert.

Example:

```typescript
test('standard user can login successfully', async ({ page }) => {

    // Arrange
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // Act
    await loginPage.goto();

    await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
    );

    // Assert
    await expect(productsPage.title).toHaveText('Products');
});
```

Comments are optional when the code already clearly explains itself.

Do not add comments that merely repeat the code.

---

# 26. test.step()

Use `test.step()` for meaningful business steps in longer tests when it improves reports.

Example:

```typescript
await test.step('Login as standard user', async () => {

    await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
    );
});
```

Do NOT create a step for every:

- click
- fill
- locator
- assertion

Use steps for meaningful user/business actions.

---

# 27. Error Handling

Do not use `try/catch` simply to stop tests from failing.

BAD:

```typescript
try {
    await loginButton.click();
} catch {
    console.log('Login button was not found');
}
```

This hides real failures.

Allow Playwright to fail normally and provide diagnostic information.

Use error handling only when there is a legitimate application/testing reason.

---

# 28. Avoid Duplicate Code

Before adding a new method, search existing code.

Reuse existing functionality when it has the same responsibility.

Do not create similar methods with different names.

BAD:

```text
login()
loginUser()
performLogin()
userLogin()
```

GOOD:

```text
login()
```

However, do not force unrelated behaviors into one overly generic method just to eliminate a few repeated lines.

Readability is more important than eliminating every duplicate line.

---

# 29. Beginner Readability Rule

Before completing generated code, ask:

> Could a QA engineer with basic Playwright and TypeScript knowledge understand this quickly?

Prefer:

```typescript
await cartPage.addProductToCart('Sauce Labs Backpack');
```

over complicated generic frameworks.

Method and variable names should explain their purpose.

Avoid excessive shorthand.

GOOD:

```typescript
loginButton
productName
checkoutButton
expectedErrorMessage
```

Avoid:

```typescript
btn
pName
chkBtn
expMsg
```

unless an abbreviation is universally obvious.

---

# 30. CI/CD

When CI/CD is requested, implement one platform at a time.

For GitHub Actions, the basic workflow should:

1. Checkout repository
2. Install Node
3. Run `npm ci`
4. Install Playwright browsers
5. Run tests
6. Upload reports/artifacts

Core commands:

```bash
npm ci
npx playwright install --with-deps
npx playwright test
```

Do not automatically create:

- GitHub Actions
- Jenkins
- Azure DevOps

all at once.

Create the platform actually requested.

---

# 31. package.json Scripts

Keep commands simple and obvious.

Example:

```json
{
    "scripts": {
        "test": "playwright test",
        "test:headed": "playwright test --headed",
        "test:ui": "playwright test --ui",
        "test:chromium": "playwright test --project=chromium",
        "test:smoke": "playwright test --grep @smoke",
        "report": "playwright show-report"
    }
}
```

Do not create dozens of scripts unless they provide clear value.

---

# 32. API Testing

Use Playwright's built-in `request` / `APIRequestContext` for API automation.

Place API tests under:

```text
tests/api/
```

Example:

```text
tests/api/
├── users.api.spec.ts
├── products.api.spec.ts
└── orders.api.spec.ts
```

Do not add another API testing library unless required.

Where appropriate, API calls may be used to establish test prerequisites faster than the UI.

Do not replace actual UI validation with API testing when the purpose of the test is to validate UI behavior.

---

# 33. Performance Testing

Do not use Playwright as a replacement for a true load-testing tool.

Playwright may capture basic browser performance information where useful.

Dedicated performance/load testing should use appropriate specialized tooling when required.

Keep performance tests separate from normal functional tests.

---

# 34. Secrets

Never hardcode real secrets in:

- test files
- Page Objects
- configuration
- repositories

Examples:

- passwords
- API tokens
- access keys
- private credentials

Use environment variables or CI/CD secret storage.

Do not commit `.env` containing real secrets.

Provide `.env.example` when useful.

---

# 35. Generated Test Quality Review

After creating or modifying tests, review them before considering the task complete.

Check:

### Locators
- Are they stable?
- Are they unique?
- Are brittle CSS/XPath selectors avoided?

### Waiting
- Are fixed waits avoided?
- Is Playwright auto-waiting used?

### Assertions
- Does every test validate meaningful expected behavior?
- Are retrying Playwright assertions used?

### POM
- Are page actions in the correct Page Object?
- Are locators and page methods kept together?

### Data
- Is reusable data externalized appropriately?
- Is unnecessary hardcoding avoided?

### Duplication
- Does equivalent functionality already exist?

### Independence
- Can the test run by itself?

### Parallel Execution
- Can the test safely run with other tests?

### Readability
- Would a beginner understand the code?

### Complexity
- Was unnecessary abstraction introduced?

Fix problems before considering the implementation complete.

---

# 36. Never Guess Application Behavior

Never invent:

- expected messages
- expected URLs
- credentials
- business rules
- API responses
- validation behavior
- element purpose

Determine behavior from available sources such as:

1. requirements
2. application UI
3. existing tests
4. existing Page Objects
5. project documentation
6. API documentation

If expected behavior cannot be determined, clearly identify the uncertainty.

Do not create a false assertion just to complete a test.

---

# 37. Existing Tests

When refactoring existing tests:

1. Understand what the existing test validates.
2. Preserve its intended coverage.
3. Move page-specific interactions into appropriate Page Objects.
4. Move reusable data into appropriate data files.
5. Replace brittle locators where possible.
6. Remove unnecessary waits.
7. Improve test names.
8. Add missing meaningful assertions.
9. Remove duplicate code.
10. Run the test after changes.

Do not rewrite working tests merely to make them look different.

Every refactor should improve reliability, readability, or maintainability.

---

# 38. Failure Investigation

When a generated test fails, do NOT immediately:

- add a timeout
- add `waitForTimeout`
- add retries
- use `.first()`
- use `.nth()`
- catch and ignore the error

First determine the actual cause.

Investigate:

1. locator accuracy
2. expected application behavior
3. navigation
4. test data
5. application state
6. asynchronous UI behavior
7. authentication
8. environment configuration

Fix the root cause.

Retries should not be used to hide flaky automation.

---

# 39. Definition of Done

A feature is complete only when:

- required scenarios are identified
- appropriate Page Objects exist
- locators are stable
- page methods are simple
- locators and methods are kept together
- tests are logically categorized
- test files are reasonably sized
- reusable test data is organized
- meaningful assertions exist
- tests pass locally
- tests can run independently
- tests are safe for parallel execution
- unnecessary fixed waits are absent
- duplicate functionality is removed
- failure artifacts are configured
- secrets are not hardcoded
- code is understandable by a beginner

---

# 40. External Data Sources and Data Validation

The framework must support test data and expected results from multiple external sources.

Do NOT assume that test data or expected values will always be stored in TypeScript, JSON, or local data files.

Depending on the application and test requirements, actual or expected data may come from:

- TypeScript data files
- JSON
- CSV
- Excel
- Database queries
- APIs
- application-generated files
- downloaded reports
- external systems
- environment-specific data sources

The framework must remain adaptable so additional data sources can be added without requiring major changes to existing tests.

---

## Separate Data Access From Test Logic

Tests should not contain complex code for:

- database connections
- SQL execution
- Excel parsing
- CSV parsing
- file reading
- API data retrieval

Create reusable data-access components for these responsibilities.

Example structure:

```text
data/
├── static/
│   ├── users.ts
│   └── expectedValues.ts
│
├── csv/
│   └── expectedProducts.csv
│
├── excel/
│   └── expectedReports.xlsx
│
└── queries/
    ├── customerQueries.ts
    └── orderQueries.ts

data-access/
├── database/
│   ├── databaseClient.ts
│   └── databaseConfig.ts
├── csv/
│   └── csvReader.ts
├── excel/
│   └── excelReader.ts
└── api/
    └── apiDataClient.ts
```

Only create these files and folders when required by the project.

Do not create unused architecture.

---

## Data Access Responsibility

Data-access components should retrieve data and return it in a simple structure that tests can easily understand.

Example:

```typescript
const expectedCustomer =
    await databaseClient.getCustomer(customerId);
```

Then the test should focus on validation:

```typescript
expect(actualCustomer.name)
    .toBe(expectedCustomer.name);

expect(actualCustomer.status)
    .toBe(expectedCustomer.status);
```

Avoid placing SQL directly inside test files:

```typescript
// Avoid
const result = await db.query(
    `SELECT name, status FROM customers WHERE id = '${customerId}'`
);
```

Prefer:

```typescript
const expectedCustomer =
    await customerData.getCustomer(customerId);
```

The test should understand WHAT data it needs without needing to understand HOW the database connection or query works.

---

## Database Validation

The framework must support database validation when required.

Database configuration must be environment driven.

Never hardcode:

- database passwords
- usernames
- connection strings
- hostnames containing sensitive information
- credentials

Use environment variables or secure CI/CD secret management.

Example:

```text
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
```

Keep database connection logic separate from tests.

Keep reusable SQL queries separate from test logic where practical.

Database validation may include:

- record creation
- record updates
- record deletion
- field validation
- status validation
- data transformation validation
- UI-to-database validation
- API-to-database validation
- source-to-target validation

---

## CSV and Excel Validation

The framework must support CSV and Excel files when required.

Examples include:

- expected report values
- source data
- exported application data
- reconciliation data
- large validation datasets

Keep file-reading/parsing logic separate from tests.

Preferred:

```typescript
const expectedRows =
    await csvReader.read('expectedProducts.csv');
```

or:

```typescript
const expectedRows =
    await excelReader.readSheet(
        'expectedReports.xlsx',
        'Products'
    );
```

The test should then validate the returned data.

Do not place complicated CSV or Excel parsing logic directly inside `.spec.ts` files.

---

## Data Comparison

When validating large datasets, create reusable comparison utilities when they provide clear value.

Examples:

```text
compareRecords()
compareArrays()
compareDataSets()
findMissingRecords()
findUnexpectedRecords()
findFieldDifferences()
```

These utilities should remain simple and generic.

The comparison result should clearly identify differences.

For example:

```text
Record ID: 10025

Field: status

Expected:
ACTIVE

Actual:
INACTIVE
```

Avoid assertions that only report:

```text
Expected data does not match actual data.
```

Failures should help engineers quickly determine WHAT data differs.

---

## Expected vs Actual Data

Tests should clearly identify:

- expected data source
- actual data source
- comparison being performed

Examples:

```text
Expected: Database
Actual: UI
```

```text
Expected: Excel
Actual: Database
```

```text
Expected: CSV
Actual: API
```

```text
Expected: Database
Actual: API
```

```text
Expected: Source Database
Actual: Target Database
```

The framework must not assume that Playwright UI data is always the actual data source.

---

## Multi-Layer Validation

The framework should support validation across multiple application layers.

Examples:

```text
UI
 ↓
API
 ↓
Database
```

A test may validate that:

1. a user performs an action through the UI
2. the UI displays the expected result
3. the API returns the expected data
4. the database contains the expected record

However, only validate layers relevant to the requirement.

Do not add database or API validation to every UI test unnecessarily.

---

## Data-Driven Testing

When the same business behavior must be validated against multiple datasets, use data-driven tests where this improves readability and coverage.

Possible sources include:

```text
TypeScript
JSON
CSV
Excel
Database
API
```

Avoid creating hundreds of nearly identical test cases manually.

At the same time, do not create overly complicated generic data-driven engines.

Keep implementation understandable by a beginner.

---

## Data Source Selection Principle

Use the data source required by the business requirement.

Do not copy expected data into a TypeScript or JSON file merely because it is easier for the automation.

For example, if the authoritative expected result is stored in a database:

```text
Database
   ↓
Expected Data
   ↓
Test
   ↓
Actual UI/API Data
   ↓
Comparison
```

retrieve the expected value from the database rather than maintaining a duplicate hardcoded copy.

The goal is to validate against the appropriate source of truth.

---

## Maintainability Rule

Tests should remain largely unchanged if the underlying method of retrieving expected data changes.

For example, a test should conceptually use:

```typescript
const expectedData =
    await customerData.getExpectedCustomer(customerId);
```

The implementation behind `customerData` may retrieve the information from:

- CSV
- Excel
- Database
- API

without requiring the business validation in the test to be completely rewritten.

Do not over-engineer this abstraction in advance.

Introduce data-source abstractions when the project actually requires multiple or interchangeable sources.

---
# 41 Test Data Creation and Cleanup

Tests that create persistent data must consider cleanup.

Examples:

- users
- customers
- orders
- campaigns
- files
- database records

Prefer creating prerequisite data through APIs or database utilities when appropriate rather than performing lengthy UI setup.

When test-created data should not remain in the environment, clean it up after execution.

Use appropriate fixtures or teardown mechanisms.

Cleanup must not hide the original test failure.

Tests running in parallel must not delete or modify data belonging to another test.

Where possible, generate unique identifiers for test-created data.

Example:

```typescript
const customerName =
    `automation-${Date.now()}`;
```

Test data must be isolated enough to support parallel execution.

---

# 42 Accessibility Testing

The framework should remain capable of supporting accessibility testing when required.

Prefer accessible Playwright locators such as:

- getByRole()
- getByLabel()

Accessibility-specific testing may be added using appropriate tooling when required by the project.

Do not add accessibility libraries unless accessibility testing is part of the project requirements.

---

# 43 Visual Validation

Use Playwright visual comparison when visual appearance itself is a requirement.

Example:

```typescript
await expect(page)
    .toHaveScreenshot('checkout-page.png');
```

Do not use screenshot comparison for normal functional validation.

Use visual testing only when layout, rendering, or appearance is part of the expected behavior.

Keep visual baselines controlled and reviewed.

---

# 44 File Upload and Download Testing

The framework must support file upload and download workflows when required.

Use Playwright's native file capabilities.

For downloaded files:

1. wait for the download event
2. save/access the downloaded file
3. validate the file exists
4. validate file contents when required

File-content validation should use appropriate data-access utilities.

Examples:

```text
UI
 ↓
Download Report
 ↓
CSV / Excel / PDF
 ↓
Data Access Layer
 ↓
Validate Contents
```

Do not validate only that a download occurred when the requirement includes validating the downloaded data.

---

# 45 API and Data Contract Validation

When required, validate not only individual values but also the expected structure of API or data responses.

Examples:

- required fields
- field types
- nullable fields
- response status
- response structure
- business-critical fields

Do not duplicate extensive schema definitions unless contract validation is actually required.

---

# 46 Logging and Diagnostics

Do not add excessive console logging.

Use clear test names, test.step(), Playwright traces, screenshots, videos, and reports as the primary diagnostic mechanisms.

Add logging only when it provides useful information that Playwright reporting does not already provide.

Never log:

- passwords
- tokens
- secrets
- sensitive test data

---

# 47 Scope Control

When implementing or fixing a feature, modify only files necessary for that task.

Do not:

- rewrite unrelated Page Objects
- reorganize unrelated tests
- rename unrelated methods
- change working configuration unnecessarily
- install unrelated dependencies
- perform large framework refactors without a clear requirement

Prefer small, focused changes.

Before changing shared framework code, determine what existing tests depend on it.

Do not break existing working tests while implementing a new feature.

---

# 48 Regression Protection

After modifying shared framework components such as:

- Page Objects
- fixtures
- utilities
- configuration
- data-access components

run or identify the existing tests affected by the change.

Do not consider the change complete merely because the newly created test passes.

Existing related tests must continue to work.

---

# 49 Test Execution After Changes

After creating or modifying automation code, run the smallest relevant test scope first.

Examples:

TEST_ENV=qa npx playwright test tests/authentication/login.spec.ts

---

# 50 Final Principle

When there are multiple ways to implement something, choose the solution that is:

1. reliable
2. easiest to understand
3. easiest to maintain
4. closest to native Playwright
5. least dependent on custom framework code

Do not build a framework on top of Playwright unless there is a demonstrated need.

Simple, readable, reliable automation is preferred over clever automation.
