import { expect, BrowserContext, Page } from "@playwright/test";
import {
  LoginRobotDependencies,
  LoginRobotEyes,
  LoginRobotHands,
} from "../../Robot/OrangeHRMPages/loginRobot";
import {
  PIMRobotEyes,
  PIMRobotHands,
} from "../../Robot/OrangeHRMPages/PIMRobot";
import { test } from "../../fixturesD/myFixtures";

export default function createTests() {
  test.describe("PIM Page Testing", async () => {
    test("001-Visit PIM Page and check for elements", async ({
      browser,
      ValidUserName,
      ValidPassword,
      pimApi,
      pimUrl,
    }) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const loginRobotDependenciesObj = new LoginRobotDependencies(page);
      const loginRobotEyesObj = new LoginRobotEyes(page);
      const loginRobotHandsObj = new LoginRobotHands(page);
      const pimRobotEyesObj = new PIMRobotEyes(page);
      const pimRobotHandsObj = new PIMRobotHands(page);

      await loginRobotDependenciesObj.visitHomePage();
      await loginRobotEyesObj.seesLoginPageElements();
      await loginRobotHandsObj.inputEmailId(ValidUserName);
      await loginRobotHandsObj.inputPassword(ValidPassword);
      await loginRobotHandsObj.clickOnLoginButton();
      await page.waitForLoadState();
      await pimRobotEyesObj.seesPIMOption();
      const [response] = await Promise.all([
        page.waitForResponse(
          (resp) => resp.url().includes(`${pimApi}`) && resp.status() === 200
        ),
        await pimRobotHandsObj.clickOnPIMOption(),
      ]);
      const respBody = JSON.parse(await response.text());
      console.info(respBody);
      console.info(respBody.meta.total);
      await pimRobotEyesObj.seesPimUrl(pimUrl);
      await pimRobotEyesObj.seesPimPageElements();
      await pimRobotEyesObj.seesPimPageData(respBody.meta.total);
    });
    test("002-Add User Functionality", async ({
      browser,
      ValidUserName,
      ValidPassword,
      pimApi,
      addEmployeeUrl,
    }) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const loginRobotDependenciesObj = new LoginRobotDependencies(page);
      const loginRobotEyesObj = new LoginRobotEyes(page);
      const loginRobotHandsObj = new LoginRobotHands(page);
      const pimRobotEyesObj = new PIMRobotEyes(page);
      const pimRobotHandsObj = new PIMRobotHands(page);

      await loginRobotDependenciesObj.visitHomePage();
      await loginRobotEyesObj.seesLoginPageElements();
      await loginRobotHandsObj.inputEmailId(ValidUserName);
      await loginRobotHandsObj.inputPassword(ValidPassword);
      await loginRobotHandsObj.clickOnLoginButton();
      await page.waitForLoadState();
      await pimRobotEyesObj.seesPIMOption();
      await Promise.all([
        page.waitForResponse(
          (resp) => resp.url().includes(`${pimApi}`) && resp.status() === 200
        ),
        await pimRobotHandsObj.clickOnPIMOption(),
      ]);
      await pimRobotHandsObj.clickOnAddPIM();
      await pimRobotEyesObj.seesAddEmployeeUrl(addEmployeeUrl);
      await pimRobotHandsObj.clickOnCreateLoginDetailsCheckbox();
      await pimRobotEyesObj.seesAddEmployeePageElements();
      await pimRobotHandsObj.clickOnCreateLoginDetailsCheckbox();
      await pimRobotHandsObj.typeFirstName("QA");
      await pimRobotHandsObj.typeLastName("Engineer");
      await Promise.all([
        page.waitForResponse(
          (resp) => resp.url().includes(`${pimApi}`) && resp.status() === 200
        ),
        await pimRobotHandsObj.clickOnSaveButton(),
      ]);
      await pimRobotHandsObj.clickOnEmployeeListOption();
    });
    test("003-Search and Delete User Functionality", async ({
      browser,
      ValidUserName,
      ValidPassword,
      pimApi,
    }) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const loginRobotDependenciesObj = new LoginRobotDependencies(page);
      const loginRobotEyesObj = new LoginRobotEyes(page);
      const loginRobotHandsObj = new LoginRobotHands(page);
      const pimRobotEyesObj = new PIMRobotEyes(page);
      const pimRobotHandsObj = new PIMRobotHands(page);

      await loginRobotDependenciesObj.visitHomePage();
      await loginRobotEyesObj.seesLoginPageElements();
      await loginRobotHandsObj.inputEmailId(ValidUserName);
      await loginRobotHandsObj.inputPassword(ValidPassword);
      await loginRobotHandsObj.clickOnLoginButton();
      await page.waitForLoadState();
      await pimRobotEyesObj.seesPIMOption();
      await Promise.all([
        page.waitForResponse(
          (resp) => resp.url().includes(`${pimApi}`) && resp.status() === 200
        ),
        await pimRobotHandsObj.clickOnPIMOption(),
      ]);
      await pimRobotHandsObj.typeEmployeeName("QA Engineer");
      await pimRobotHandsObj.clickOnSearchButton();
      await page.waitForTimeout(5000);
      await pimRobotHandsObj.clickOnDeleteIcon();
      await pimRobotEyesObj.seesDeleteModal();
      await Promise.all([
        page.waitForResponse(
          (resp) => resp.url().includes(`${pimApi}`) && resp.status() === 200
        ),
        await pimRobotHandsObj.clickOnDeleteButton(),
      ]);
    });
  });
}
