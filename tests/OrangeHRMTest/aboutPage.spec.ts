import { expect, BrowserContext, Page } from "@playwright/test";
import {
  LoginRobotDependencies,
  LoginRobotEyes,
  LoginRobotHands,
} from "../../Robot/OrangeHRMPages/loginRobot";
import {
  AboutRobotEyes,
  AboutRobotHands,
} from "../../Robot/OrangeHRMPages/aboutRobot";
import { test } from "../../fixturesD/myFixtures";
export default function createTests() {
  test.describe("About Page Testing", async () => {
    test("001-Visit About Page and check for elements", async ({
      browser,
      ValidUserName,
      ValidPassword,
      aboutApi,
    }) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const loginRobotDependenciesObj = new LoginRobotDependencies(page);
      const loginRobotEyesObj = new LoginRobotEyes(page);
      const loginRobotHandsObj = new LoginRobotHands(page);
      const aboutRobotEyesObj = new AboutRobotEyes(page);
      const aboutRobotHandsObj = new AboutRobotHands(page);

      await loginRobotDependenciesObj.visitHomePage();
      await loginRobotEyesObj.seesLoginPageElements();
      await loginRobotHandsObj.inputEmailId(ValidUserName);
      await loginRobotHandsObj.inputPassword(ValidPassword);
      await loginRobotHandsObj.clickOnLoginButton();
      await page.waitForLoadState();
      await aboutRobotEyesObj.seesUserDropDown();
      await aboutRobotHandsObj.clickOnUserDropDown();
      await aboutRobotEyesObj.seesOptionsInUserDropDown();
      const [response] = await Promise.all([
        page.waitForResponse(
          (resp) => resp.url().includes(`${aboutApi}`) && resp.status() === 200
        ),
        await aboutRobotHandsObj.clickOnAboutOption(),
      ]);
      const respBody = JSON.parse(await response.text());
      console.info(respBody);
      const companyName = respBody.data.companyName;
      const activeEmployee = respBody.data.numberOfActiveEmployee.toString();
      const version = respBody.data.productName + " " + respBody.data.version;
      const terminatedEmployee = respBody.data.numberOfPastEmployee.toString();
      await aboutRobotEyesObj.seesAboutCard(
        companyName,
        version,
        activeEmployee,
        terminatedEmployee
      );
    });
  });
}
