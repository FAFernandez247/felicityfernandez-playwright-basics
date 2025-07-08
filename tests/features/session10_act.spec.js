import { test, expect } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  // Fill in the username and password fields
  await page.getByPlaceholder('Username').fill('standard_user');
  await expect(page.getByPlaceholder('Username')).toHaveValue('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await expect(page.getByPlaceholder('Password')).toHaveValue('secret_sauce');
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify successful login
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.getByText('Products')).toBeVisible();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6); // Verify that there are 6 items displayed

  // Verify that each item has a price displayed
  const items = page.locator('[data-test="inventory-item"]'); // Locate all inventory items
  const itemCount = await items.count(); // Get the count of inventory items
  // This for loop checks that each product or item has a name and price displayed
  for (let i = 0; i < itemCount; i++) {
    await expect(items.nth(i).locator('[data-test="inventory-item-name"]')).not.toBeEmpty();
    await expect(items.nth(i).locator('[data-test="inventory-item-price"]')).not.toBeEmpty();
    }

  // Take a screenshot
  await page.screenshot({ path: 'test-screenshot/successful-login-session10.png', fullPage: true })

});

test('Verify unsuccessful login with invalid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('unique_username');
  await expect(page.getByPlaceholder('Username')).toHaveValue('unique_username');
  await page.getByPlaceholder('Password').fill('invalid_password');
  await expect(page.getByPlaceholder('Password')).toHaveValue('invalid_password');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  await expect(page.getByText('Accepted usernames are:')).toBeVisible();
  await expect(page.getByText('Password for all users:')).toBeVisible();
  await expect(page).toHaveURL('https://www.saucedemo.com/')
  await page.screenshot({ path: 'test-screenshot/unsuccessful-login-session10.png', fullPage: true })
});
