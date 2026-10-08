import { test, expect } from '../../fixtures/test';
import { users } from '../../data/users';

const dynamicCatalogPages = [
  {
    name: 'Lazy Load',
    link: 'lazyLoadLink' as const,
    path: /dynamic-catalog-lazy-load\.html$/,
  },
  {
    name: 'Spinner',
    link: 'spinnerLink' as const,
    path: /dynamic-catalog-spinner\.html$/,
  },
  {
    name: 'Slider',
    link: 'sliderLink' as const,
    path: /dynamic-catalog-slider\.html$/,
  },
];

test.describe('Hamburger menu', () => {
  test('opens, shows all top-level choices, and closes', async ({
    page,
    loginPage,
    productsPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    const menu = productsPage.navigation;
    await menu.open();

    await expect(menu.allItemsLink).toBeVisible();
    await expect(menu.dynamicCatalogLink).toBeVisible();
    await expect(menu.aboutLink).toBeVisible();
    await expect(menu.logoutLink).toBeVisible();
    await expect(menu.resetLink).toBeVisible();

    await menu.close();
    await expect(menu.allItemsLink).not.toBeVisible();
    await expect(productsPage.title).toBeVisible();
    await expect(page).toHaveURL(/inventory\.html$/);
  });

  test('About points to Sauce Labs', async ({ loginPage, productsPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await productsPage.navigation.open();

    await expect(productsPage.navigation.aboutLink).toHaveAttribute('href', 'https://saucelabs.com/');
  });

  test('All Items returns from product details to inventory', async ({
    page,
    loginPage,
    productsPage,
    productDetailsPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await productsPage.openProduct('Sauce Labs Backpack');
    await expect(page).toHaveURL(/inventory-item\.html\?id=/);

    const menu = productsPage.navigation;
    await menu.open();
    await menu.allItemsLink.click();

    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(productsPage.title).toBeVisible();
    await expect(productsPage.productCards).toHaveCount(6);
    await expect(productDetailsPage.name).not.toBeVisible();
  });

  test('Dynamic Catalog expands to show Lazy Load, Spinner, and Slider', async ({
    loginPage,
    productsPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    const menu = productsPage.navigation;
    await menu.open();
    await menu.expandDynamicCatalog();

    await expect(menu.lazyLoadLink).toBeVisible();
    await expect(menu.spinnerLink).toBeVisible();
    await expect(menu.sliderLink).toBeVisible();
  });

  for (const dynamicPage of dynamicCatalogPages) {
    test(`Dynamic Catalog opens the ${dynamicPage.name} page`, async ({ page, loginPage, productsPage }) => {
      await loginPage.goto();
      await loginPage.login(users.standard.username, users.standard.password);

      const menu = productsPage.navigation;
      await menu.open();
      await menu.expandDynamicCatalog();
      await menu[dynamicPage.link].click();

      await expect(page).toHaveURL(dynamicPage.path);
      await expect(page.getByText(`Dynamic Catalog - ${dynamicPage.name}`, { exact: true })).toBeVisible();
    });
  }
});
