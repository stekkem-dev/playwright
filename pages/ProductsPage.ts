import type { Locator, Page } from '@playwright/test';
import { NavigationMenu } from './NavigationMenu';

export class ProductsPage {
  readonly title: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly sortControl: Locator;
  readonly prices: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly navigation: NavigationMenu;

  constructor(private readonly page: Page) {
    this.title = page.getByText('Products', { exact: true });
    this.productCards = page.locator('[data-test="inventory-item"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.sortControl = page.getByRole('combobox', { name: 'Sort products' });
    this.prices = page.locator('.inventory_item_price');
    this.cartLink = page.getByRole('button', { name: /^Cart(?:,|$)/ });
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.navigation = new NavigationMenu(page);
  }

  productCard(name: string) {
    return this.productCards.filter({ has: this.page.getByText(name, { exact: true }) });
  }

  async addProduct(name: string) {
    await this.productCard(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeProduct(name: string) {
    await this.productCard(name).getByRole('button', { name: 'Remove' }).click();
  }

  async openProduct(name: string) {
    await this.productCard(name).getByText(name, { exact: true }).click();
  }
}