import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

const testEnvironment = process.env.TEST_ENV ?? 'saucedemo';
const knownBaseUrls: Record<string, string> = {
  saucedemo: 'https://www.saucedemo.com',
};
const baseURL = process.env.BASE_URL ?? knownBaseUrls[testEnvironment];

if (!baseURL) {
  throw new Error(
    `No default URL is configured for TEST_ENV="${testEnvironment}". Set BASE_URL to the target environment URL.`,
  );
}

try {
  new URL(baseURL);
} catch {
  throw new Error(`BASE_URL must be a valid absolute URL. Received: "${baseURL}".`);
}

const testTimeout = Number(process.env.TEST_TIMEOUT ?? 30_000);
if (!Number.isFinite(testTimeout) || testTimeout <= 0) {
  throw new Error('TEST_TIMEOUT must be a positive number of milliseconds.');
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: testTimeout,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
