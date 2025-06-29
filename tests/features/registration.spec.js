import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.getByRole('link', { name: 'Admin Page' }).click();
    await page.getByRole('button', { name: 'Clean' }).click();
});
test('Verifythat user is able to register account', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.locator('[id="customer.firstName"]').fill('Feli');
  await page.locator('[id="customer.lastName"]').fill('Fernan');
  await page.locator('[id="customer.address.street"]').fill('123 main st');
  await page.locator('[id="customer.address.city"]').fill('test city');
  await page.locator('[id="customer.address.state"]').fill('test state');
  await page.locator('[id="customer.address.zipCode"]').fill('1234');
  await page.locator('[id="customer.phoneNumber"]').fill('09123456789');
  await page.locator('[id="customer.ssn"]').fill('123456');
  await page.locator('[id="customer.username"]').fill('TestUN1234');
  await page.locator('[id="customer.password"]').fill('testun1234');
  await page.locator('#repeatedPassword').fill('testun1234');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('h1')).toContainText(/Welcome/);
});