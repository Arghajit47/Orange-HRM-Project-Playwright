import { expect, BrowserContext, Page } from "@playwright/test";
import {
  LoginRobotDependencies,
  LoginRobotEyes,
  LoginRobotHands,
} from "../../Robot/OrangeHRMPages/loginRobot";
import {
  HelpRobotEyes,
  HelpRobotHands,
} from "../../Robot/OrangeHRMPages/helpRobot";
import { test } from "../../fixturesD/myFixtures";
export default function createTests() {
  test.describe("Help Page Testing", async () => {
    test("001-Visit Help Page and check for elements", async ({
      browser,
      ValidUserName,
      ValidPassword,
    }) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const loginRobotDependenciesObj = new LoginRobotDependencies(page);
      const loginRobotEyesObj = new LoginRobotEyes(page);
      const loginRobotHandsObj = new LoginRobotHands(page);
      const helpRobotEyesObj = new HelpRobotEyes(page);
      const helpRobotHandsObj = new HelpRobotHands(page);

      await loginRobotDependenciesObj.visitHomePage();
      await loginRobotEyesObj.seesLoginPageElements();
      await loginRobotHandsObj.inputEmailId(ValidUserName);
      await loginRobotHandsObj.inputPassword(ValidPassword);
      await loginRobotHandsObj.clickOnLoginButton();
      await page.waitForLoadState();
      await helpRobotEyesObj.seesHelpButton();
      const [newWindow] = await Promise.all([
        context.waitForEvent("page"),
        await helpRobotHandsObj.clickOnHelpButton(),
      ]);
      await newWindow.waitForURL("**/starterhelp.orangehrm.com/**");
      await expect(
        newWindow.locator('li > a[data-auth-action="signin"]').nth(0)
      ).toBeVisible();
      await expect(newWindow.locator('input[id="query"]')).toBeVisible();
      for (var i = 0; i < 4; i++) {
        await expect(
          newWindow.locator('li > a[class="blocks-item-link"]').nth(i)
        ).toBeVisible();
      }
    });
  });
}
