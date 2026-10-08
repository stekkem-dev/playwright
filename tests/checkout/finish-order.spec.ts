import { test, expect } from '../../fixtures/test';
import { checkoutInformation } from '../../data/checkout';
import { users } from '../../data/users';

test.describe('Checkout completion', () => {
  test('Standard user completes an order and returns to Products', async ({
    page,
    loginPage,
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html$/);

    await productsPage.addProduct('Sauce Labs Backpack');
    await productsPage.cartLink.click();
    await expect(cartPage.item('Sauce Labs Backpack')).toBeVisible();
    await cartPage.checkoutButton.click();
    await expect(checkoutPage.informationTitle).toBeVisible();

    await checkoutPage.fillInformation(checkoutInformation);
    await checkoutPage.continueButton.click();
    await expect(page).toHaveURL(/checkout-step-two\.html$/);
    await expect(checkoutPage.overviewTitle).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(checkoutPage.itemTotal).toHaveText('Item total: $29.99');
    await expect(checkoutPage.tax).toHaveText('Tax: $2.40');
    await expect(checkoutPage.total).toHaveText('Total: $32.39');

    await checkoutPage.finishButton.click();
    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(checkoutPage.completionMessage).toHaveText('Thank you for your order!');
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();

    await page.getByRole('button', { name: 'Back Home' }).click();
    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(productsPage.title).toBeVisible();
  });
});
