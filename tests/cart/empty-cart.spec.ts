import { test, expect } from '../../fixtures/test';
import { users } from '../../data/users';

test('An empty cart contains no product rows', async ({ loginPage, productsPage, cartPage }) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await productsPage.cartLink.click();

  await expect(cartPage.title).toBeVisible();
  await expect(cartPage.items).toHaveCount(0);
  await expect(cartPage.continueShoppingButton).toBeVisible();
});
