import { test, expect } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  await expect(page.getByText('Swag Labs')).toBeVisible();
});

// test('Verify login with invalid credentials', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/');
//   await page.locator('[data-test="username"]').fill('standard_user');
//   await page.locator('[data-test="password"]').fill('testpassword123');
//   await page.locator('[data-test="login-button"]').click();
//   await expect(page.locator('[data-test="error"]')).toBeVisible();
//   await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service');
// });