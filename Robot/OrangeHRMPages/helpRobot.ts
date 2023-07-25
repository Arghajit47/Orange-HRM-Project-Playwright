import { Page } from "@playwright/test";
import { BaseEyes, BaseHands } from "../BaseRobot";

export class HelpRobotEyes extends BaseEyes {
  constructor(page: Page) {
    super(page);
  }
  async seesHelpButton() {
    await this.page.waitForLoadState("networkidle");
    await super.seesDomVisible('button[title="Help"]');
  }
}
export class HelpRobotHands extends BaseHands {
  constructor(page: Page) {
    super(page);
  }
  async clickOnHelpButton() {
    await this.page.waitForLoadState("networkidle");
    await super.clickOnDomElement('button[title="Help"]');
  }
}
