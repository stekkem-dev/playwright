import { test, expect } from '../../fixtures/test';
import { users } from '../../data/users';
import { products } from '../../data/products';

test.describe('Product details', () => {
  test('Product details match the selected catalog item', async ({
    page,
    loginPage,
    productsPage,
    productDetailsPage,
  }) => {
    const backpack = products[0];

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await productsPage.openProduct(backpack.name);

    await expect(page).toHaveURL(/inventory-item\.html\?id=/);
    await expect(productDetailsPage.name).toHaveText(backpack.name);
    await expect(productDetailsPage.price).toHaveText(backpack.price);
    await productDetailsPage.backToProducts();
    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(productsPage.productCards).toHaveCount(products.length);
  });
});
