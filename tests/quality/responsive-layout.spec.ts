import { test, expect } from '../../fixtures/test';
import { users } from '../../data/users';

test('Products and Cart remain usable at mobile viewport', async ({ page, loginPage, productsPage, cartPage }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'Responsive layout is covered once in Chromium.');

  await page.setViewportSize({ width: 390, height: 844 });
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(productsPage.title).toBeVisible();
  await expect(productsPage.productCards).toHaveCount(6);
  await productsPage.addProduct('Sauce Labs Backpack');
  await productsPage.cartLink.click();

  await expect(cartPage.title).toBeVisible();
  await expect(cartPage.item('Sauce Labs Backpack')).toBeVisible();
  await expect(cartPage.checkoutButton).toBeVisible();
});
