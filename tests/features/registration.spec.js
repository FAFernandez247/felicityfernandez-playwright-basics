import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.getByRole('link', { name: 'Admin Page' }).click();
    await page.getByRole('button', { name: 'Clean' }).click();
});
test('Verify that user is able to register account', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.locator('[id="customer.firstName"]').fill('Feli');
  await page.locator('[id="customer.lastName"]').fill('Fernan');
  await page.locator('[id="customer.address.street"]').fill('123 main st');
  await page.locator('[id="customer.address.city"]').fill('imus city');
  await page.locator('[id="customer.address.state"]').fill('cavite state');
  await page.locator('[id="customer.address.zipCode"]').fill('0987');
  await page.locator('[id="customer.phoneNumber"]').fill('09987654321');
  await page.locator('[id="customer.ssn"]').fill('987654');
  await page.locator('[id="customer.username"]').fill('FeliTest123');
  await page.locator('[id="customer.password"]').fill('password4testing');
  await page.locator('#repeatedPassword').fill('password4testing');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('h1')).toContainText(/Welcome/);
});

test('Register with missing fields', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.locator('[id="customer.firstName"]').fill('Feli');
  await page.locator('[id="customer.lastName"]').fill('Fernan');
  await page.locator('[id="customer.address.street"]').fill('test addr');
  await page.locator('[id="customer.address.city"]').fill('test city');
  await page.locator('[id="customer.address.state"]').fill('test state');
  await page.locator('[id="customer.username"]').fill('FeliTest123');
  await page.locator('[id="customer.password"]').fill('password4testing');
  await page.locator('#repeatedPassword').fill('password4testing');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByText('Zip Code is required.')).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Social Security Number is' })).toBeVisible();
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('h1')).toContainText('Signing up is easy!');
});