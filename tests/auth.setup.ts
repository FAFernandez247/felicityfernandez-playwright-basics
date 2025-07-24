import { test as setup } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';
import {LoginPage } from '../pages/LoginPage';

// This file is used to set up the authentication state before running tests
// It will log in to the application and save the authentication state

setup('Do login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    //const loginPage = new LoginPage(page);
    // await test.step('Navigate to login page', async () => {
    //     await loginPage.navigateTo();
    // });
    await loginPage.navigateTo();
    // await test.step('Login with credentials', async () => {
    //     await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
    // });
    await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
    // await test.step('Verify login was successful', async () => {
    //     //await expect(loginPage.swaglabsHeader).toBeVisible();
    //     await loginPage.verifyLoginSuccess();
    // });
    await loginPage.verifyLoginSuccess();


    // await page.goto('https://www.saucedemo.com/');
    // await page.locator('[data-test="username"]').fill(process.env.SAUCE_USERNAME!);
    // await page.locator('[data-test="password"]').fill(process.env.SAUCE_PASSWORD!);
    // await page.locator('[data-test="login-button"]').click();

    //await expect(page.getByText('Swag Labs')).toBeVisible();

    await page.context().storageState({ path: STORAGE_STATE });
});
