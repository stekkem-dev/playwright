import { test, expect } from '../../fixtures/test';
import { users } from '../../data/users';

test.describe('Authentication and session behavior', () => {
  test('Standard user logs in and logs out @smoke', async ({ page, loginPage, productsPage }) => {
    await loginPage.goto();
    await expect(page).toHaveTitle('Swag Labs');
    await expect(loginPage.loginForm).toBeVisible();
    await expect(loginPage.username).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(productsPage.title).toBeVisible();
    await expect(productsPage.productCards).toHaveCount(6);
    await expect(productsPage.cartLink).toBeVisible();

    await productsPage.navigation.logout();
    await expect(page).toHaveURL(/\/$/);
    await expect(loginPage.loginForm).toBeVisible();
    await expect(productsPage.title).not.toBeVisible();
  });
});
