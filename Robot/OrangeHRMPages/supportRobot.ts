import { Page } from "@playwright/test";
import { BaseEyes, BaseHands } from "../BaseRobot";

export class SupportRobotEyes extends BaseEyes {
  constructor(page: Page) {
    super(page);
  }
  async seesUserDropDown() {
    await super.seesDomVisible(
      'span > i[class="oxd-icon bi-caret-down-fill oxd-userdropdown-icon"]'
    );
  }
  async seesOptionsInUserDropDown() {
    for (var i = 0; i < 4; i++) {
      await super.seesDomWithIndex('ul > li > a[role="menuitem"]', i);
    }
  }
  async seesSupportPageUrl(supportUrl: string) {
    await super.seesUrl(supportUrl);
  }
  async seesSupportPageElements() {
    await super.seesDomVisible("div > h6");
    for (var i = 0; i < 6; i++) {
      await super.seesDomWithIndex("div > p", i);
    }
  }
}
export class SupportRobotHands extends BaseHands {
  constructor(page: Page) {
    super(page);
  }
  async clickOnUserDropDown() {
    await super.clickOnDomElement(
      'span > i[class="oxd-icon bi-caret-down-fill oxd-userdropdown-icon"]'
    );
  }
  async clickOnSupportOption() {
    await super.clickOnDomElementWithIndex('ul > li > a[role="menuitem"]', 1);
  }
}
