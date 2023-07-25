import { Page } from "@playwright/test";
import { BaseEyes, BaseHands } from "../BaseRobot";

export class PIMRobotEyes extends BaseEyes {
  constructor(page: Page) {
    super(page);
  }
  async seesPIMOption() {
    await this.page.waitForLoadState("networkidle");
    await super.seesDomVisible(
      'li > a[href="/web/index.php/pim/viewPimModule"]'
    );
  }
  async seesPimUrl(pimUrl: string) {
    await this.page.waitForLoadState("networkidle");
    await super.seesUrl(pimUrl);
  }
  async seesPimPageData(count: number) {
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
  async seesPimPageElements() {
    await this.page.waitForLoadState("networkidle");
    await super.seesDomVisible("nav > ul > li > span");
    await super.seesDomWithIndex('li > a[href="#"]', 0);
    await super.seesDomWithIndex('li > a[href="#"]', 1);
    await super.seesDomWithIndex('li > a[href="#"]', 2);
    await super.seesDomWithIndex("div > input", 1);
    await super.seesDomWithIndex("div > input", 2);
    await super.seesDomWithIndex('div[class="oxd-select-text-input"]', 0);
    await super.seesDomWithIndex('div[class="oxd-select-text-input"]', 1);
    await super.seesDomWithIndex("div > input", 3);
    await super.seesDomWithIndex('div[class="oxd-select-text-input"]', 2);
    await super.seesDomWithIndex('div[class="oxd-select-text-input"]', 3);
    await super.seesDomVisible(
      'div[class="oxd-form-actions"] > button[type="reset"]'
    );
    await super.seesDomVisible('div > button[type="submit"]');
    await super.seesDomVisible(
      'div[class="orangehrm-header-container"] > button[type="button"]'
    );
  }
  async seesAddEmployeeUrl(addEmployeeUrl: string) {
    await this.page.waitForLoadState("networkidle");
    await super.seesUrl(addEmployeeUrl);
  }
  async seesAddEmployeePageElements() {
    await this.page.waitForLoadState("networkidle");
    await super.seesDomVisible('input[name="firstName"]');
    await super.seesDomVisible('input[name="lastName"]');
    await super.seesDomVisible('input[name="middleName"]');
    await super.seesDomVisible('div[class="oxd-switch-wrapper"]');
    await super.seesDomWithIndex(
      'input[class="oxd-input oxd-input--active"]',
      2
    );
    await super.seesDomWithIndex('label > input[type="radio"]', 0);
    await super.seesDomWithIndex('label > input[type="radio"]', 1);
    await super.seesDomWithIndex('input[type="password"]', 0);
    await super.seesDomWithIndex('input[type="password"]', 1);
    await super.seesDomWithIndex('div > button[type="button"]', 3);
    await super.seesDomVisible('div > button[type="submit"]');
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

export class PIMRobotHands extends BaseHands {
  constructor(page: Page) {
    super(page);
  }
  async clickOnPIMOption() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElement(
      'li > a[href="/web/index.php/pim/viewPimModule"]'
    );
  }
  async clickOnAddPIM() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElement(
      'div[class="orangehrm-header-container"] > button[type="button"]'
    );
  }
  async typeFirstName(firstName: string) {
    await this.page.waitForLoadState("networkidle");
    await super.typeTextonDom('div > input[name="firstName"]', firstName);
  }
  async typeMiddleName(middleName: string) {
    await this.page.waitForLoadState("networkidle");
    await super.typeTextonDom('div > input[name="middleName"]', middleName);
  }
  async typeLastName(lastName: string) {
    await this.page.waitForLoadState("networkidle");
    await super.typeTextonDom('div > input[name="lastName"]', lastName);
  }
  async clickOnSaveButton() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElement('div > button[type="submit"]');
  }
  async clickOnCreateLoginDetailsCheckbox() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElement('div[class="oxd-switch-wrapper"]');
  }
  async clickOnEmployeeListOption() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElementWithIndex('li > a[href="#"]', 0);
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
  async typeEmployeeName(text: string) {
    await this.page.waitForLoadState("networkidle");
    await this.page
      .locator('input[placeholder="Type for hints..."]')
      .nth(0)
      .fill(text);
  }
  async clickOnSearchButton() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElement('div > button[type="submit"]');
  }
}
