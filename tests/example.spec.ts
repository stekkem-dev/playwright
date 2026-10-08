import { test, expect } from '../fixtures/test';

test('Signed-out users cannot access inventory or cart routes', async ({ page, loginPage }) => {
    await loginPage.goto();
    await page.goto('/inventory.html');
    await expect(loginPage.loginForm).toBeVisible();
    await expect(page).toHaveURL(/\/$/);

    await page.goto('/cart.html');
    await expect(loginPage.loginForm).toBeVisible();
    await expect(page).toHaveURL(/\/$/);
});
