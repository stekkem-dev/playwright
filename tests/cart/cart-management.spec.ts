import { test, expect } from '../../fixtures/test';
import { users } from '../../data/users';

test.describe('Cart management', () => {
  test('Cart contents and badge update when products are removed', async ({
    loginPage,
    productsPage,
    cartPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await productsPage.addProduct('Sauce Labs Backpack');
    await productsPage.addProduct('Sauce Labs Bike Light');
    await expect(productsPage.cartBadge).toHaveText('2');
    await productsPage.cartLink.click();

    await expect(cartPage.items).toHaveCount(2);
    await expect(cartPage.item('Sauce Labs Backpack')).toBeVisible();
    await expect(cartPage.item('Sauce Labs Bike Light')).toBeVisible();

    await cartPage.removeProduct('Sauce Labs Backpack');
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.item('Sauce Labs Bike Light')).toBeVisible();
    await expect(cartPage.item('Sauce Labs Backpack')).toHaveCount(0);
  });

  test('Continue shopping retains the selected item', async ({
    page,
    loginPage,
    productsPage,
    cartPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await productsPage.addProduct('Sauce Labs Backpack');
    await productsPage.cartLink.click();
    await cartPage.continueShoppingButton.click();

    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(productsPage.cartBadge).toHaveText('1');
    await productsPage.cartLink.click();
    await expect(cartPage.item('Sauce Labs Backpack')).toBeVisible();
  });
});
