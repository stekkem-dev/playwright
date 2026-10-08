import type { Locator, Page } from '@playwright/test';

export class NavigationMenu {
  readonly openButton: Locator;
  readonly closeButton: Locator;
  readonly allItemsLink: Locator;
  readonly dynamicCatalogLink: Locator;
  readonly lazyLoadLink: Locator;
  readonly spinnerLink: Locator;
  readonly sliderLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetLink: Locator;

  constructor(private readonly page: Page) {
    this.openButton = page.getByRole('button', { name: 'Open Menu' });
    this.closeButton = page.getByRole('button', { name: 'Close Menu' });
    this.allItemsLink = page.getByRole('button', { name: 'All Items' });
    this.dynamicCatalogLink = page.getByRole('button', { name: 'Dynamic Catalog' });
    this.lazyLoadLink = page.getByRole('button', { name: 'Lazy Load' });
    this.spinnerLink = page.getByRole('button', { name: 'Spinner' });
    this.sliderLink = page.getByRole('button', { name: 'Slider' });
    this.aboutLink = page.getByRole('link', { name: 'About' });
    this.logoutLink = page.getByRole('button', { name: 'Logout' });
    this.resetLink = page.getByRole('button', { name: 'Reset App State' });
  }

  async open() {
    await this.openButton.click();
  }

  async close() {
    await this.closeButton.click();
  }

  async expandDynamicCatalog() {
    await this.dynamicCatalogLink.click();
  }

  async logout() {
    await this.openButton.click();
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.openButton.click();
    await this.resetLink.click();
  }
}