import {expect, test as setup} from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

setup('Do login', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill(process.env.SAUCE_USERNAME!);
    await page.locator('[data-test="password"]').fill(process.env.SAUCE_PASSWORD!);
    await page.locator('[data-test="login-button"]').click();

    // await expect(page.getByText('Swag Labs')).toBeVisible();

    await page.context().storageState({ path: STORAGE_STATE });
});
