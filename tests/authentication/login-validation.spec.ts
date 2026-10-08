import { test, expect } from '../../fixtures/test';
import { users } from '../../data/users';

test.describe('Login validation', () => {
  test('Empty submission requests a username', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('Username without password is rejected', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.username.fill(users.standard.username);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });

  test('Incorrect password is rejected', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, 'incorrect-password');
    await expect(loginPage.errorMessage).toContainText('do not match');
    await expect(loginPage.loginForm).toBeVisible();
  });
});
