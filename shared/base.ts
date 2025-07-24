import { test as base, expect, request } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// This file is used to set up the base test environment
// It will be used to create a custom test fixture that can be reused across tests
// For example, it can be used to create a login page fixture that can be reused across tests

type MyFixtures = {
    loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
});

export { expect } from '@playwright/test';