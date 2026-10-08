import { test, expect } from '../../fixtures/test';
import { users } from '../../data/users';

const acceptedUsers = [users.problem, users.performanceGlitch, users.error, users.visual];

for (const user of acceptedUsers) {
  test(`${user.username} can log in`, async ({ page, loginPage, productsPage }) => {
    const personaExpect = user.username === users.performanceGlitch.username
      ? expect.configure({ timeout: 15_000 })
      : expect;

    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    await personaExpect(page).toHaveURL(/inventory\.html$/);
    await personaExpect(productsPage.title).toBeVisible();
    await personaExpect(productsPage.productCards).toHaveCount(6);
  });
}
