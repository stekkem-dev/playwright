import { test, expect } from '../../fixtures/test';
import { users } from '../../data/users';

test('Reset App State clears cart and keeps the user signed in', async ({
  page,
  loginPage,
  productsPage,
  cartPage,
}) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await productsPage.addProduct('Sauce Labs Backpack');
  await productsPage.navigation.resetAppState();

  await expect(productsPage.title).toBeVisible();
  await expect(productsPage.cartBadge).toHaveCount(0);
  await productsPage.cartLink.click();
  await expect(cartPage.items).toHaveCount(0);
});
