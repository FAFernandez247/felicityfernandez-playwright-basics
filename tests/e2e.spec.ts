import {test, expect} from '@playwright/test';

//
test("Should show add to cart button", async ({page}) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
});

test('Swag labs text should be visible', async ({page}) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('text=Swag Labs')).toBeVisible();
});

test('Verify that there are items displayed', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    const items = page.locator('[data-test="inventory-item"]');
    const itemCount = await items.count();
        for (let i = 0; i < itemCount; i++) {
            await expect(items.nth(i).locator('[data-test="inventory-item-name"]')).not.toBeEmpty();
            await expect(items.nth(i).locator('[data-test="inventory-item-price"]')).not.toBeEmpty();
            }
    });


// Serial mode tests
test.describe("Serial mode", () => {
    test.describe.configure({ mode: 'serial' });
     test('Add an item to the cart', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/inventory.html');
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
        console.log("Items added to cart");
    });
    test('Verify that the item added to the cart is displayed in the cart page', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/inventory.html');
        await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
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
        console.log("Items verified in cart");
    });
});