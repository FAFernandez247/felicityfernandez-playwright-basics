import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    public readonly usernameInput: Locator;
    public readonly passwordInput: Locator;
    public readonly loginButton: Locator;
    public readonly errorMessage: Locator;
    public readonly swaglabsHeader: Locator;

    constructor(public readonly page: Page) {
        this.usernameInput = page.locator("data-test='username'");
        this.passwordInput = page.locator("data-test='password'");
        this.loginButton = page.locator("data-test='login-button'");
        this.errorMessage = page.locator("data-test='error-message'");
        this.swaglabsHeader = page.getByText("Swag Labs");
    }

    async navigateTo() {
        await this.page.goto("/");
        await this.page.waitForLoadState("domcontentloaded");
    }

    @param username
    @param password

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}