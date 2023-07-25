import { Page } from "@playwright/test";
import { BaseEyes, BaseHands } from "../BaseRobot";

export class AboutRobotEyes extends BaseEyes {
  constructor(page: Page) {
    super(page);
  }
  async seesUserDropDown() {
    await this.page.waitForLoadState("networkidle");
    await super.seesDomVisible(
      'span > i[class="oxd-icon bi-caret-down-fill oxd-userdropdown-icon"]'
    );
  }
  async seesOptionsInUserDropDown() {
    await this.page.waitForLoadState("networkidle");
    for (var i = 0; i < 4; i++) {
      await super.seesDomWithIndex('ul > li > a[role="menuitem"]', i);
    }
  }
  async seesAboutCard(
    compName: string,
    version: string,
    activeEmp: string,
    terminatedEmp: string
  ) {
    await this.page.waitForLoadState("networkidle");
    await super.seesDomContainText("div > h6", "About");
    for (var i = 0; i < 4; i++) {
      await super.seesDomWithIndex(
        'div > div > p[class="oxd-text oxd-text--p orangehrm-about-title"]',
        i
      );
    }
    await super.seesDomContainTextWithIndex(
      'div > div > p[class="oxd-text oxd-text--p orangehrm-about-text"]',
      compName,
      0
    );
    await super.seesDomContainTextWithIndex(
      'div > div > p[class="oxd-text oxd-text--p orangehrm-about-text"]',
      version,
      1
    );
    await super.seesDomContainTextWithIndex(
      'div > div > p[class="oxd-text oxd-text--p orangehrm-about-text"]',
      activeEmp,
      2
    );
    await super.seesDomContainTextWithIndex(
      'div > div > p[class="oxd-text oxd-text--p orangehrm-about-text"]',
      terminatedEmp,
      3
    );
    await super.seesDomVisible(
      'div[class="oxd-dialog-container-default--inner"] > div > button'
    );
  }
}
export class AboutRobotHands extends BaseHands {
  constructor(page: Page) {
    super(page);
  }
  async clickOnUserDropDown() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElement(
      'span > i[class="oxd-icon bi-caret-down-fill oxd-userdropdown-icon"]'
    );
  }
  async clickOnAboutOption() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElementWithIndex('ul > li > a[role="menuitem"]', 0);
  }
}
