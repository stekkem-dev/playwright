import { test, expect } from '../fixtures/test';
import { users } from '../data/users';

test('Standard user reaches Products @smoke', async ({ page, loginPage, productsPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(productsPage.title).toBeVisible();
    await expect(productsPage.productCards).toHaveCount(6);
});
