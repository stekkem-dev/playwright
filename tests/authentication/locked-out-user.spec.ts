import { test, expect } from '../../fixtures/test';
import { users } from '../../data/users';

test.describe('Authentication and session behavior', () => {
  test('Locked-out account is rejected with an explanatory error', async ({ page, loginPage }) => {
    await loginPage.goto();
    await expect(loginPage.loginForm).toBeVisible();

    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await expect(page).toHaveURL(/\/$/);
    await expect(loginPage.errorMessage).toContainText('this user has been locked out');
    await expect(loginPage.loginForm).toBeVisible();
  });
});
