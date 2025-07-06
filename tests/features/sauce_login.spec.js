import { test, expect } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await expect(page.locator('[data-test="password"]')).toHaveValue('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.getByText('Swag Labs')).toBeVisible();

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  await page.screenshot({ path: 'test-screenshot/successful-login.png', fullPage: true })
});

test('Verify unsuccessful login with invalid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('unique_username');
  await expect(page.locator('[data-test="username"]')).toHaveValue('unique_username');
  await page.locator('[data-test="password"]').fill('invalid_password');
  await expect(page.locator('[data-test="password"]')).toHaveValue('invalid_password');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  
  await expect(page).toHaveURL('https://www.saucedemo.com/')
  await page.screenshot({ path: 'test-screenshot/unsuccessful-login.png', fullPage: true })
});

test('Verify login with blank credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  
  await expect(page).toHaveURL('https://www.saucedemo.com/')
  await page.screenshot({ path: 'test-screenshot/blank-login.png', fullPage: true })
});