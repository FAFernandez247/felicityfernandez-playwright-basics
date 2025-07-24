import { expect, Locator, Page } from "@playwright/test";

// This file defines the LoginPage class which contains methods and locators for interacting with the login page of the application.
// It is used to encapsulate the functionality related to the login page and can be reused across tests.

export class LoginPage {
    //locators
    public readonly usernameInput: Locator;
    public readonly passwordInput: Locator;
    public readonly loginButton: Locator;
    public readonly errorMessage: Locator;
    public readonly swaglabsHeader: Locator;

    constructor(public readonly page: Page) {
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.swaglabsHeader = page.getByText("Swag Labs");
    }

    async navigateTo() {
        await this.page.goto("https://www.saucedemo.com/");
        await this.page.waitForLoadState("domcontentloaded");
    }

    /**
     * @param username - The username to log in with
     * @param password - The password to log in with
     */

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // Verifies that the login was successful by checking the header
    async verifyLoginSuccess(): Promise<void> {
        // To remove animations and transitions that might affect test automation
        // await this.page.addStyleTag({
        //     content: `
        //     *, *::before, *::after {
        //     transition: none !important;
        //     animation: none !important;
        //     }
        //     `
        // });
        await expect(this.swaglabsHeader).toBeVisible();
        await expect(this.swaglabsHeader).toHaveText("Swag Labs");
    }

    /**
   * Verifies that the login error message is displayed and matches the expected message.
   * @param expectedErrorMessage - The expected error message.
   */
    async verifyLoginError(expectedErrorMessage: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedErrorMessage);
    }

    // Modular POM
    async InputUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }
    async InputPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }
    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }
}