import { test, expect } from '../../fixtures/test';
import { users } from '../../data/users';
import { expectedPricesHighToLow, expectedPricesLowToHigh, products } from '../../data/products';

test.describe('Inventory sorting', () => {
  test('Products sort by price in both directions', async ({ page, loginPage, productsPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(productsPage.title).toBeVisible();
    await expect(productsPage.productCards).toHaveCount(6);
    await expect(productsPage.productNames).toHaveText(products.map((product) => product.name));

    await productsPage.sortControl.selectOption('za');
    await expect(productsPage.productNames).toHaveText(
      products.map((product) => product.name).sort().reverse(),
    );

    await productsPage.sortControl.selectOption('az');
    await expect(productsPage.productNames).toHaveText(
      products.map((product) => product.name).sort(),
    );

    await productsPage.sortControl.selectOption('lohi');
    await expect(productsPage.prices).toHaveText(expectedPricesLowToHigh);

    await productsPage.sortControl.selectOption('hilo');
    await expect(productsPage.prices).toHaveText(expectedPricesHighToLow);
    await expect(productsPage.productCards).toHaveCount(6);
  });
});
