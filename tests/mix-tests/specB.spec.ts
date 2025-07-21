import { test } from '@playwright/test';

// Tests run at the same time
test.describe("Spec File B run in Parallel", () => {
    test(`Test B 1`, async ({}) => {
        console.log("Test B 1");
    });
    test(`Test B 2`, async ({}) => {
        console.log("Test B 2");
    });
});