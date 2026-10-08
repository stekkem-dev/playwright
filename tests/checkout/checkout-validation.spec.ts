import { test, expect } from '../../fixtures/test';
import { checkoutInformation } from '../../data/checkout';
import { users } from '../../data/users';

async function openCheckout(
  loginPage: import('../../pages/LoginPage').LoginPage,
  productsPage: import('../../pages/ProductsPage').ProductsPage,
  cartPage: import('../../pages/CartPage').CartPage,
  checkoutPage: import('../../pages/CheckoutPage').CheckoutPage,
) {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await productsPage.addProduct('Sauce Labs Backpack');
  await productsPage.cartLink.click();
  await cartPage.checkoutButton.click();
  await expect(checkoutPage.informationTitle).toBeVisible();
}

test.describe('Checkout validation', () => {
  test('Checkout requires first name and retains other entered values', async ({ page, loginPage, productsPage, cartPage, checkoutPage }) => {
    await openCheckout(loginPage, productsPage, cartPage, checkoutPage);
    await checkoutPage.lastName.fill(checkoutInformation.lastName);
    await checkoutPage.postalCode.fill(checkoutInformation.postalCode);
    await checkoutPage.continueButton.click();

    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
    await expect(checkoutPage.lastName).toHaveValue(checkoutInformation.lastName);
    await expect(checkoutPage.postalCode).toHaveValue(checkoutInformation.postalCode);
  });

  test('Checkout requires last name', async ({ loginPage, productsPage, cartPage, checkoutPage }) => {
    await openCheckout(loginPage, productsPage, cartPage, checkoutPage);
    await checkoutPage.firstName.fill(checkoutInformation.firstName);
    await checkoutPage.postalCode.fill(checkoutInformation.postalCode);
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
  });

  test('Checkout requires postal code', async ({ loginPage, productsPage, cartPage, checkoutPage }) => {
    await openCheckout(loginPage, productsPage, cartPage, checkoutPage);
    await checkoutPage.firstName.fill(checkoutInformation.firstName);
    await checkoutPage.lastName.fill(checkoutInformation.lastName);
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
  });
});
