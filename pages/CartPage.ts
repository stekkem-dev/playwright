import type { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly title: Locator;
  readonly items: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByText('Your Cart', { exact: true });
    this.items = page.locator('[data-test="inventory-item"]');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  item(name: string) {
    return this.items.filter({ has: this.page.getByText(name, { exact: true }) });
  }

  async removeProduct(name: string) {
    await this.item(name).getByRole('button', { name: 'Remove' }).click();
  }
}