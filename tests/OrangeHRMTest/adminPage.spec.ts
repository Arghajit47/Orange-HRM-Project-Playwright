import { expect, BrowserContext, Page } from "@playwright/test";
import {
  LoginRobotDependencies,
  LoginRobotEyes,
  LoginRobotHands,
} from "../../Robot/OrangeHRMPages/loginRobot";
import {
  AdminRobotEyes,
  AdminRobotHands,
} from "../../Robot/OrangeHRMPages/adminRobot";
import { test } from "../../fixturesD/myFixtures";
export default function createTests() {
  test.describe("Admin Page Testing", async () => {
    test("001-Visit Admin Page and check for elements", async ({
      browser,
      ValidUserName,
      ValidPassword,
      userApi,
      adminUrl,
    }) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const loginRobotDependenciesObj = new LoginRobotDependencies(page);
      const loginRobotEyesObj = new LoginRobotEyes(page);
      const loginRobotHandsObj = new LoginRobotHands(page);
      const adminRobotEyesObj = new AdminRobotEyes(page);
      const adminRobotHandsObj = new AdminRobotHands(page);

      await loginRobotDependenciesObj.visitHomePage();
      await loginRobotEyesObj.seesLoginPageElements();
      await loginRobotHandsObj.inputEmailId(ValidUserName);
      await loginRobotHandsObj.inputPassword(ValidPassword);
      await loginRobotHandsObj.clickOnLoginButton();
      await page.waitForLoadState();
      await adminRobotEyesObj.seesAdminOption();
      const [response] = await Promise.all([
        page.waitForResponse(
          (resp) => resp.url().includes(`${userApi}`) && resp.status() === 200
        ),
        await adminRobotHandsObj.clickOnAdminOption(),
      ]);
      const respBody = JSON.parse(await response.text());
      console.info(respBody);
      console.info(respBody.meta.total);
      console.info(respBody.data[0].userName);
      console.info(
        respBody.data[0].employee.firstName +
          " " +
          respBody.data[0].employee.lastName
      );
      await adminRobotEyesObj.seesAdminUrl(adminUrl);
      await adminRobotEyesObj.seesAdminPageElements();
      await adminRobotEyesObj.seesAdminPageData(respBody.meta.total);
    });
    test("002-Add User Functionality", async ({
      browser,
      ValidUserName,
      ValidPassword,
      userApi,
      saveUserUrl,
    }) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const loginRobotDependenciesObj = new LoginRobotDependencies(page);
      const loginRobotEyesObj = new LoginRobotEyes(page);
      const loginRobotHandsObj = new LoginRobotHands(page);
      const adminRobotEyesObj = new AdminRobotEyes(page);
      const adminRobotHandsObj = new AdminRobotHands(page);

      await loginRobotDependenciesObj.visitHomePage();
      await loginRobotEyesObj.seesLoginPageElements();
      await loginRobotHandsObj.inputEmailId(ValidUserName);
      await loginRobotHandsObj.inputPassword(ValidPassword);
      await loginRobotHandsObj.clickOnLoginButton();
      await page.waitForLoadState();
      await adminRobotEyesObj.seesAdminOption();
      const [response] = await Promise.all([
        page.waitForResponse(
          (resp) =>
            resp
              .url()
              .includes(
                `${userApi}?limit=50&offset=0&sortField=u.userName&sortOrder=ASC`
              ) && resp.status() === 200
        ),
        await adminRobotHandsObj.clickOnAdminOption(),
      ]);
      const respBody = JSON.parse(await response.text());
      const employeeName =
        respBody.data[0].employee.firstName +
        " " +
        respBody.data[0].employee.lastName;
      await adminRobotHandsObj.clickOnAddUser();
      await adminRobotEyesObj.seesSaveUserUrl(saveUserUrl);
      await adminRobotHandsObj.selectRole();
      await page.waitForTimeout(5000);
      await adminRobotHandsObj.typeEmployeeName(employeeName);
      await adminRobotHandsObj.selectStatus();
      await adminRobotHandsObj.typeUserName("Automation");
      await adminRobotHandsObj.typePassword("Automation@4711");
      await adminRobotHandsObj.typeConfirmedPassword("Automation@4711");
      await Promise.all([
        page.waitForResponse(
          (resp) => resp.url().includes(`${userApi}`) && resp.status() === 200
        ),
        await adminRobotHandsObj.clickOnSaveButton(),
      ]);
    });
    test("003-Search and Delete User Functionality", async ({
      browser,
      ValidUserName,
      ValidPassword,
      userApi,
    }) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const loginRobotDependenciesObj = new LoginRobotDependencies(page);
      const loginRobotEyesObj = new LoginRobotEyes(page);
      const loginRobotHandsObj = new LoginRobotHands(page);
      const adminRobotEyesObj = new AdminRobotEyes(page);
      const adminRobotHandsObj = new AdminRobotHands(page);

      await loginRobotDependenciesObj.visitHomePage();
      await loginRobotEyesObj.seesLoginPageElements();
      await loginRobotHandsObj.inputEmailId(ValidUserName);
      await loginRobotHandsObj.inputPassword(ValidPassword);
      await loginRobotHandsObj.clickOnLoginButton();
      await page.waitForLoadState();
      await adminRobotEyesObj.seesAdminOption();
      const [response] = await Promise.all([
        page.waitForResponse(
          (resp) =>
            resp
              .url()
              .includes(
                `${userApi}?limit=50&offset=0&sortField=u.userName&sortOrder=ASC`
              ) && resp.status() === 200
        ),
        await adminRobotHandsObj.clickOnAdminOption(),
      ]);
      const respBody = JSON.parse(await response.text());
      const employeeName =
        respBody.data[0].employee.firstName +
        " " +
        respBody.data[0].employee.lastName;
      await adminRobotHandsObj.typeUserName("Automation");
      await adminRobotHandsObj.selectRole();
      await page.waitForTimeout(5000);
      await adminRobotHandsObj.typeEmployeeName(employeeName);
      await adminRobotHandsObj.selectStatus();
      await adminRobotHandsObj.clickOnSearchButton();
      await page.waitForTimeout(5000);
      await adminRobotHandsObj.clickOnDeleteIcon();
      await adminRobotEyesObj.seesDeleteModal();
      await Promise.all([
        page.waitForResponse(
          (resp) => resp.url().includes(`${userApi}`) && resp.status() === 200
        ),
        await adminRobotHandsObj.clickOnDeleteButton(),
      ]);
    });
  });
}
