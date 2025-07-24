import { test } from '../shared/base.ts';
import { attachScreenshot } from '../shared/helpers.ts';

// This file is where we apply our custom test fixtures

const LOGIN_SUCCESS_SCREENSHOT = "login_success_screenshot";
const LOGIN_FAILURE_SCREENSHOT = "login_failure_screenshot";
const LOGIN_ERROR_MESSAGE = "Epic sadface: Username and password do not match any user in this service";

test.describe("Login Test Suite", { tag: ["@Regression-Testing", "@Smoke-Testing", "@Sprint-1"] }, () => {
    test.beforeEach(async  ({loginPage}) => {
        await loginPage.navigateTo();
    });

    // test('Should successfully log in with valid credentials - POM modular', async ({loginPage}, testInfo) => {
    //     await test.step("Input Username", async () => {
    //         await loginPage.InputUsername(process.env.SAUCE_USERNAME!);
    //     });
    //     await test.step("Input Password", async () => {
    //         await loginPage.InputPassword(process.env.SAUCE_PASSWORD!);
    //     });
    //     await test.step("Click Login", async () => {
    //         await loginPage.clickLogin();
    //     });
    //     await test.step("Verify Login Success", async () => {
    //         await loginPage.verifyLoginSuccess();
    //     });
    //     await test.step("Attach Screenshot", async () => {
    //         await attachScreenshot(
    //             loginPage.page,
    //             testInfo,
    //             LOGIN_SUCCESS_SCREENSHOT,
    //         );
    //     });
    // });

    test("Should successfully login", { tag: "@Happy-Path" }, async ({loginPage}, testInfo) => {
        await test.step("Login with valid credentials", async () => {
            await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
        });
        await test.step("Verify login was successful", async () => {
            await loginPage.verifyLoginSuccess();
        });
        await test.step("Attach Screenshot", async () => {
            await attachScreenshot(
                loginPage.page,
                testInfo,
                LOGIN_SUCCESS_SCREENSHOT,
            );
        });
    });

    test("Should unsuccessfully login", { tag: "@Unhappy-Path" }, async ({loginPage}, testInfo) => {
        await test.step("Login with invalid credentials", async () => {
            await loginPage.login("invalid_user", "invalid_password");
        });
        await test.step("Verify error message is displayed", async () => {
            await loginPage.verifyLoginError(LOGIN_ERROR_MESSAGE);
        });
        await test.step("Attach Screenshot", async () => {
            await attachScreenshot(
                loginPage.page,
                testInfo,
                LOGIN_FAILURE_SCREENSHOT,
            );
        });
    });
});