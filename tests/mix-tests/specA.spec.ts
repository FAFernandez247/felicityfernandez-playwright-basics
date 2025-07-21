import { test } from '@playwright/test';

test.describe.configure({ mode: 'serial' }); // Ensure tests run in serial
// For use cases to login as checker or maker
// Tests run one after the other

test.describe("Spec File A run in serial mode", () => {
    test('Test A 1', async ({}) => {
        console.log("Test A 1");
    });
    test('Test A 2', async ({}) => {
        console.log("Test A 2");
    });
});