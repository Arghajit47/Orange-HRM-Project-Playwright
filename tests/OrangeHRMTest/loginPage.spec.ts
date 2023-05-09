import { expect, BrowserContext, Page } from "@playwright/test";
import {
  LoginRobotDependencies,
  LoginRobotEyes,
  LoginRobotHands,
} from "../../Robot/OrangeHRMPages/loginRobot";
import { test, assert } from "../../fixturesD/myFixtures";

test.describe("Login Testing", async () => {
  test("Login with Valid Credentials", async ({
    browser,
    ValidUserName,
    ValidPassword,
  }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginRobotDependenciesObj = new LoginRobotDependencies(page);
    const loginRobotEyesObj = new LoginRobotEyes(page);
    const loginRobotHandsObj = new LoginRobotHands(page);

    await loginRobotDependenciesObj.visitHomePage();
    await loginRobotEyesObj.seesLoginPageElements();
    await loginRobotHandsObj.inputEmailId(ValidUserName);
    await loginRobotHandsObj.inputPassword(ValidPassword);
    await loginRobotHandsObj.clickOnLoginButton();
    await page.waitForLoadState();
    await loginRobotEyesObj.validateDashboardUrl();
  });

  test("Login with Invalid Credentials", async ({
    browser,
    InvalidUserName,
    InvalidPassword,
  }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginRobotDependenciesObj = new LoginRobotDependencies(page);
    const loginRobotEyesObj = new LoginRobotEyes(page);
    const loginRobotHandsObj = new LoginRobotHands(page);

    await loginRobotDependenciesObj.visitHomePage();
    await loginRobotEyesObj.seesLoginPageElements();
    await loginRobotHandsObj.inputEmailId(InvalidUserName);
    await loginRobotHandsObj.inputPassword(InvalidPassword);
    await loginRobotHandsObj.clickOnLoginButton();
    await page.waitForLoadState();
    await loginRobotEyesObj.validateInvalidCredentialsText();
  });

  test("Forgot Password", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginRobotDependenciesObj = new LoginRobotDependencies(page);
    const loginRobotEyesObj = new LoginRobotEyes(page);
    const loginRobotHandsObj = new LoginRobotHands(page);

    await loginRobotDependenciesObj.visitHomePage();
    await loginRobotEyesObj.seesLoginPageElements();
    await loginRobotHandsObj.clickOnForgotPassword();
    await loginRobotEyesObj.validateForgotPasswordPage();
  });
});
