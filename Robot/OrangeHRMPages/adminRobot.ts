import { Page } from "@playwright/test";
import { BaseEyes, BaseHands } from "../BaseRobot";

export class AdminRobotEyes extends BaseEyes {
  constructor(page: Page) {
    super(page);
  }
  async seesAdminOption() {
    await this.page.waitForLoadState("networkidle");
    await super.seesDomVisible(
      'li > a[href="/web/index.php/admin/viewAdminModule"]'
    );
  }
  async seesAdminUrl(adminUrl: string) {
    await this.page.waitForLoadState("networkidle");
    await super.seesUrl(adminUrl);
  }
  async seesAdminPageElements() {
    await this.page.waitForLoadState("networkidle");
    await super.seesDomWithIndex("nav > ul > li > span", 0);
    await super.seesDomWithIndex("nav > ul > li > span", 1);
    await super.seesDomWithIndex("nav > ul > li > span", 2);
    await super.seesDomWithIndex("nav > ul > li > span", 3);
    await super.seesDomWithIndex("nav > ul > li > span", 4);
    await super.seesDomWithIndex('li > a[href="#"]', 0);
    await super.seesDomWithIndex('li > a[href="#"]', 1);
    await super.seesDomWithIndex("div > input", 1);
    await super.seesDomWithIndex('div[class="oxd-select-text-input"]', 0);
    await super.seesDomWithIndex("div > input", 2);
    await super.seesDomWithIndex('div[class="oxd-select-text-input"]', 1);
    await super.seesDomVisible(
      'div[class="oxd-form-actions"] > button[type="button"]'
    );
    await super.seesDomVisible('div > button[type="submit"]');
    await super.seesDomVisible(
      'div[class="orangehrm-header-container"] > button[type="button"]'
    );
  }
  async seesAdminPageData(count: number) {
    await this.page.waitForLoadState("networkidle");
    if (count <= 50) {
      for (var i = 0; i < count; i++) {
        await super.seesDomWithIndex(
          'div[role="rowgroup"] > div[class="oxd-table-card"]',
          i
        );
        await super.seesDomWithIndex(
          'div[class="oxd-table-cell-actions"] > button[type="button"] > i[class="oxd-icon bi-trash"]',
          i
        );
        await super.seesDomWithIndex(
          'div[class="oxd-table-cell-actions"] > button[type="button"] > i[class="oxd-icon bi-pencil-fill"]',
          i
        );
        await super.seesDomContainTextWithIndex(
          "div > span",
          `(${count}) Records Found`,
          1
        );
      }
    } else if (count > 50) {
      for (var i = 0; i < 50; i++) {
        await super.seesDomWithIndex(
          'div[role="rowgroup"] > div[class="oxd-table-card"]',
          i
        );
        await super.seesDomWithIndex(
          'div[class="oxd-table-cell-actions"] > button[type="button"] > i[class="oxd-icon bi-trash"]',
          i
        );
        await super.seesDomWithIndex(
          'div[class="oxd-table-cell-actions"] > button[type="button"] > i[class="oxd-icon bi-pencil-fill"]',
          i
        );
        await super.seesDomVisible('nav[aria-label="Pagination Navigation"]');
        await super.seesDomContainTextWithIndex(
          "div > span",
          `(${count}) Records Found`,
          1
        );
      }
    } else {
      await super.seesDomContainTextWithIndex(
        "div > span",
        `No Records Found`,
        1
      );
    }
  }
  async seesSaveUserUrl(saveUsersUrl: string) {
    await this.page.waitForLoadState("networkidle");
    await super.seesUrl(saveUsersUrl);
  }

  async seesDeleteModal() {
    await this.page.waitForLoadState("networkidle");
    await super.seesDomContainTextWithIndex(
      'div[role="document"] > div > p',
      "Are you Sure?",
      0
    );
    await super.seesDomContainTextWithIndex(
      'div[role="document"] > div > p',
      "The selected record will be permanently deleted. Are you sure you want to continue?",
      1
    );
    await super.seesDomWithIndex(
      'div[role="document"] > div > button[type="button"]',
      0
    );
    await super.seesDomWithIndex(
      'div[role="document"] > div > button[type="button"]',
      1
    );
    await super.seesDomVisible('div[role="document"] > button');
  }
}
export class AdminRobotHands extends BaseHands {
  constructor(page: Page) {
    super(page);
  }
  async clickOnAdminOption() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElement(
      'li > a[href="/web/index.php/admin/viewAdminModule"]'
    );
  }
  async clickOnAddUser() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElement(
      'div[class="orangehrm-header-container"] > button[type="button"]'
    );
  }
  async selectRole() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElementWithIndex(".oxd-select-text", 0);
    await this.page.getByRole("option", { name: "Admin" }).click();
  }
  async selectStatus() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElementWithIndex(".oxd-select-text", 1);
    await this.page.getByRole("option", { name: "Enabled" }).click();
  }
  async typeEmployeeName(text: string) {
    await this.page.waitForLoadState("networkidle");
    await super.typeTextonDom('input[placeholder="Type for hints..."]', text);
    await this.page.waitForTimeout(5000);
    await this.page.getByPlaceholder("Type for hints...").press("ArrowDown");
    await this.page.getByPlaceholder("Type for hints...").press("Enter");
  }
  async typeUserName(name: string) {
    await this.page.waitForLoadState("networkidle");
    await this.page
      .locator('input[class="oxd-input oxd-input--active"]')
      .nth(1)
      .fill(name);
  }
  async typePassword(password: string) {
    await this.page.waitForLoadState("networkidle");
    await this.page.locator('input[type="password"]').nth(0).fill(password);
  }
  async typeConfirmedPassword(password: string) {
    await this.page.waitForLoadState("networkidle");
    await this.page.locator('input[type="password"]').nth(1).fill(password);
  }
  async clickOnSaveButton() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElement('div > button[type="submit"]');
  }
  async clickOnSearchButton() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElement('div > button[type="submit"]');
  }
  async clickOnDeleteIcon() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElementWithIndex(
      'div[class="oxd-table-cell-actions"] > button[type="button"] > i[class="oxd-icon bi-trash"]',
      0
    );
  }
  async clickOnDeleteButton() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElementWithIndex(
      'div[role="document"] > div > button[type="button"]',
      1
    );
  }
}
