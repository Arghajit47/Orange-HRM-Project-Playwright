import { expect, BrowserContext, Page } from "@playwright/test";
import {
  LoginRobotDependencies,
  LoginRobotEyes,
  LoginRobotHands,
} from "../../Robot/OrangeHRMPages/loginRobot";
import {
  SupportRobotEyes,
  SupportRobotHands,
} from "../../Robot/OrangeHRMPages/supportRobot";
import { test } from "../../fixturesD/myFixtures";
export default function createTests() {
  test.describe("Support Page Testing", async () => {
    test("001-Visit Support Page and check for elements", async ({
      browser,
      ValidUserName,
      ValidPassword,
      supportApi,
      supportUrl,
    }) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const loginRobotDependenciesObj = new LoginRobotDependencies(page);
      const loginRobotEyesObj = new LoginRobotEyes(page);
      const loginRobotHandsObj = new LoginRobotHands(page);
      const supportRobotEyesObj = new SupportRobotEyes(page);
      const supportRobotHandsObj = new SupportRobotHands(page);

      await loginRobotDependenciesObj.visitHomePage();
      await loginRobotEyesObj.seesLoginPageElements();
      await loginRobotHandsObj.inputEmailId(ValidUserName);
      await loginRobotHandsObj.inputPassword(ValidPassword);
      await loginRobotHandsObj.clickOnLoginButton();
      await page.waitForLoadState();
      await supportRobotEyesObj.seesUserDropDown();
      await supportRobotHandsObj.clickOnUserDropDown();
      await supportRobotEyesObj.seesOptionsInUserDropDown();
      const [response] = await Promise.all([
        page.waitForResponse(
          (resp) =>
            resp.url().includes(`${supportApi}`) && resp.status() === 200
        ),
        await supportRobotHandsObj.clickOnSupportOption(),
      ]);
      await supportRobotEyesObj.seesSupportPageUrl(supportUrl);
      await supportRobotEyesObj.seesSupportPageElements();
    });
  });
}
