import { test, expect } from '@playwright/test';

test.describe('Login Test', {
    annotation: { type: 'To Fix', description: 'Pressing Enter key after entering credentials does not submit the login form' }
}, () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
    
    test('Verify login with valid credentials', {tag: '@HappyPath'}, async ({ page }) => {
    await test.step('Fill in the username and password with valid credentials', async () => {
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
    });
    await test.step('Click the login button and verify successful login', async () => {
        await page.locator('[data-test="login-button"]').click();
        await expect(page.getByText('Swag Labs')).toBeVisible();
        await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    });
    });

    test('Verify login with invalid credentials', {tag: '@UnhappyPath'}, async ({ page }) => {
    await test.step('Fill in the username and password with invalid credentials', async () => {
        await page.locator('[data-test="username"]').fill('invalid_user');
        await page.locator('[data-test="password"]').fill('invalid_password');
    });
    await test.step('Click the login button', async () => {
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
    });
});

test.describe('Inventory, Cart, and Checkout Tests', {
    annotation: { type: 'Functional Testing and UI', description: 'Test Inventory, Cart, and Checkout Page' },
}, () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await expect(page.getByText('Swag Labs')).toBeVisible();
        await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
    
    test('Verify that there are items displayed', {tag: '@UI'}, async ({ page }) => {
        await test.step('Verify that there are 6 items displayed', async () => {
            await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
        });
        await test.step('Verify that each item has a name and price displayed', async () => {
            const items = page.locator('[data-test="inventory-item"]'); 
            const itemCount = await items.count();
            for (let i = 0; i < itemCount; i++) {
                await expect(items.nth(i).locator('[data-test="inventory-item-name"]')).not.toBeEmpty();
                await expect(items.nth(i).locator('[data-test="inventory-item-price"]')).not.toBeEmpty();
                }
        });
    });

    test('Verify that the filter functionality works', {tag: '@Functional'}, async ({ page }) => {
        await test.step('Select the "Name (Z to A)" filter', async () => {
            await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
            await page.locator('[data-test="product-sort-container"]').selectOption('za');
        });
        await test.step('Verify that items are sorted by name from Z to A', async () => {
            const names = await page.locator('[data-test="inventory-item-name"]').allTextContents();
            const sortedNames = [...names].sort().reverse();
            expect(names).toEqual(sortedNames);
        });
    });

    test('Verify that the cart functionality works', {tag: '@Functional'}, async ({ page }) => {
        test.slow();
        await test.step('Verify that the cart icon is visible', async () => {
            await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
        });

        await test.step('Verify that the cart is empty initially', async () => {
            await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
            await page.locator('[data-test="shopping-cart-link"]').click();
            await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
            await expect(page.locator('[data-test="checkout"]')).toBeVisible();
            await page.locator('[data-test="continue-shopping"]').click();
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        });

        await test.step('Add an item to the cart and verify that the cart has the correct count', async () => {
            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
            await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
            const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
            const badgeText = await cartBadge.textContent();
            expect(badgeText?.trim()).toBe('3');
        });

        await test.step('Remove an item from the cart and verify that the cart has the correct count', async () => {
            await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
            const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
            const badgeText = await cartBadge.textContent();
            expect(badgeText?.trim()).toBe('2');
        });

        await test.step('Verify that the item added to the cart is displayed in the cart page', async () => {
            await page.locator('[data-test="shopping-cart-link"]').click();
            const cartItems = page.locator('[data-test="inventory-item"]');
            const itemCount = await cartItems.count();
            for (let i = 0; i < itemCount; i++) {
                await expect(cartItems.nth(i).locator('[data-test="inventory-item-name"]')).not.toBeEmpty();
                await expect(cartItems.nth(i).locator('[data-test="inventory-item-price"]')).not.toBeEmpty();
                await expect(cartItems.nth(i).locator('[data-test="inventory-item-desc"]')).not.toBeEmpty();
                await expect(cartItems.nth(i).locator('[data-test="item-quantity"]')).not.toBeEmpty();
                }
            await expect(page.locator('[id="remove-sauce-labs-bolt-t-shirt"]')).toBeVisible();
            await expect(page.locator('[id="remove-sauce-labs-fleece-jacket"]')).toBeVisible();
            await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
            await expect(page.locator('[data-test="checkout"]')).toBeVisible();
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        });
    });

    test('Verify that the checkout functionality works', {tag: '@Functional'}, async ({ page }) => {
        await test.step('Verify that the checkout button is visible in the cart', async () => {
            await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
            await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
            await page.locator('[data-test="shopping-cart-link"]').click();
            await expect(page.locator('[data-test="checkout"]')).toBeVisible();
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        });
        await test.step('Verify that the checkout button navigates to the checkout page', async () => {
            await page.locator('[data-test="checkout"]').click();
            await expect(page.locator('[data-test="firstName"]')).toBeVisible();
            await expect(page.locator('[data-test="lastName"]')).toBeVisible();
            await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
            await expect(page.locator('[data-test="continue"]')).toBeVisible();
            await expect(page.locator('[data-test="cancel"]')).toBeVisible();
            await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        });

        await test.step('Verify that submitting an empty form shows validation errors', async () => {
            await page.locator('[data-test="continue"]').click();
            await expect(page.locator('[data-test="error"]')).toBeVisible();
        });

        await test.step('Fill out the form and click Continue to navigate to the overview page', async () => {
            await page.locator('[data-test="firstName"]').fill('Test');
            await page.locator('[data-test="lastName"]').fill('User');
            await page.locator('[data-test="postalCode"]').fill('1234');
            await page.locator('[data-test="continue"]').click();
            await expect(page.locator('[data-test="title"]')).toBeVisible();
            const cartItems = page.locator('[data-test="inventory-item"]');
            const itemCount = await cartItems.count();
            for (let i = 0; i < itemCount; i++) {
                await expect(cartItems.nth(i).locator('[data-test="inventory-item-name"]')).toBeVisible();
                await expect(cartItems.nth(i).locator('[data-test="inventory-item-price"]')).toBeVisible();
                await expect(cartItems.nth(i).locator('[data-test="inventory-item-desc"]')).toBeVisible();
                await expect(cartItems.nth(i).locator('[data-test="item-quantity"]')).toBeVisible();
            }
            await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible();
            await expect(page.locator('[data-test="payment-info-label"]')).toHaveText('Payment Information:');
            await expect(page.locator('[data-test="payment-info-value"]')).toBeVisible();
            await expect(page.locator('[data-test="shipping-info-label"]')).toBeVisible();
            await expect(page.locator('[data-test="shipping-info-label"]')).toHaveText('Shipping Information:');
            await expect(page.locator('[data-test="shipping-info-value"]')).toBeVisible();
            await expect(page.locator('[data-test="total-info-label"]')).toBeVisible();
            await expect(page.locator('[data-test="total-info-label"]')).toHaveText('Price Total');
            await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();
            await expect(page.locator('[data-test="tax-label"]')).toBeVisible();
            await expect(page.locator('[data-test="total-label"]')).toBeVisible();
            await expect(page.locator('[data-test="cancel"]')).toBeVisible();
            await expect(page.locator('[data-test="finish"]')).toBeVisible();
            await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        });

        await test.step('Verify that the finish button navigates to the completion page', async () => {
            page.goto('https://www.saucedemo.com/checkout-step-two.html');
            await page.locator('[data-test="finish"]').click();
            await expect(page.locator('[data-test="checkout-complete-container"]')).toBeVisible();
            await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
            await page.locator('[data-test="back-to-products"]').click();
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        });
    });
});
