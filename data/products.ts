export const products = [
  { name: 'Sauce Labs Backpack', price: '$29.99', id: 'sauce-labs-backpack' },
  { name: 'Sauce Labs Bike Light', price: '$9.99', id: 'sauce-labs-bike-light' },
  { name: 'Sauce Labs Bolt T-Shirt', price: '$15.99', id: 'sauce-labs-bolt-t-shirt' },
  { name: 'Sauce Labs Fleece Jacket', price: '$49.99', id: 'sauce-labs-fleece-jacket' },
  { name: 'Sauce Labs Onesie', price: '$7.99', id: 'sauce-labs-onesie' },
  {
    name: 'Test.allTheThings() T-Shirt (Red)',
    price: '$15.99',
    id: 'test.allthethings()-t-shirt-(red)',
  },
] as const;

export const expectedPricesLowToHigh = [
  '$7.99',
  '$9.99',
  '$15.99',
  '$15.99',
  '$29.99',
  '$49.99',
];

export const expectedPricesHighToLow = [...expectedPricesLowToHigh].reverse();