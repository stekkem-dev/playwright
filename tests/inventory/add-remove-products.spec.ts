import { test, expect } from '../../fixtures/test';
import { users } from '../../data/users';

test('Adding and removing a product keeps the inventory action and cart badge in sync', async ({
  loginPage,
  productsPage,
}) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.addProduct('Sauce Labs Backpack');
  await expect(productsPage.productCard('Sauce Labs Backpack').getByRole('button', { name: 'Remove' })).toBeVisible();
  await expect(productsPage.cartBadge).toHaveText('1');

  await productsPage.removeProduct('Sauce Labs Backpack');
  await expect(productsPage.productCard('Sauce Labs Backpack').getByRole('button', { name: 'Add to cart' })).toBeVisible();
  await expect(productsPage.cartBadge).toHaveCount(0);
});
