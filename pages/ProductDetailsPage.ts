import type { Locator, Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly name: Locator;
  readonly price: Locator;
  readonly backToProductsButton: Locator;

  constructor(private readonly page: Page) {
    this.name = page.locator('.inventory_details_name');
    this.price = page.locator('.inventory_details_price');
    this.backToProductsButton = page.getByRole('button', { name: 'Back to products' });
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }
}