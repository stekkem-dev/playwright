import type { Locator, Page } from '@playwright/test';
import type { checkoutInformation } from '../data/checkout';

export class CheckoutPage {
  readonly informationTitle: Locator;
  readonly overviewTitle: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly errorMessage: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly completionMessage: Locator;

  constructor(private readonly page: Page) {
    this.informationTitle = page.getByText('Checkout: Your Information', { exact: true });
    this.overviewTitle = page.getByText('Checkout: Overview', { exact: true });
    this.firstName = page.getByRole('textbox', { name: 'First Name' });
    this.lastName = page.getByRole('textbox', { name: 'Last Name' });
    this.postalCode = page.getByRole('textbox', { name: 'Zip/Postal Code' });
    this.errorMessage = page.getByRole('alert');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.itemTotal = page.getByText(/^Item total:/);
    this.tax = page.getByText(/^Tax:/);
    this.total = page.getByText(/^Total:/);
    this.completionMessage = page.getByRole('heading', { name: 'Thank you for your order!' });
  }

  async fillInformation(information: typeof checkoutInformation) {
    await this.firstName.fill(information.firstName);
    await this.lastName.fill(information.lastName);
    await this.postalCode.fill(information.postalCode);
  }
}