import { Page } from "@playwright/test";
import { BaseEyes, BaseHands, BaseDependencies } from "../BaseRobot";

export class LoginRobotEyes extends BaseEyes {
  constructor(page: Page) {
    super(page);
  }
  async seesLoginPageElements() {
    await super.seesDomVisible('input[name="username"]');
    await super.seesDomVisible('input[name="password"]');
    await super.seesDomEnabled('button[type="submit"]');
    await super.seesDomVisible('img[alt="company-branding"]');
    await super.seesDomContainTextWithIndex("div > p", "Username : Admin", 0);
    await super.seesDomContainTextWithIndex(
      "div > p",
      "Password : admin123",
      1
    );
    await super.seesDomContainTextWithIndex(
      "div > p",
      "Forgot your password?",
      2
    );
    await super.seesDomContainTextWithIndex("div > p", "OrangeHRM OS 5.5", 3);
  }

  async validateInvalidCredentialsText() {
    await super.seesDomContainTextWithIndex("div > p", "Invalid credential", 0);
  }
  async validateForgotPasswordPage() {
    await super.seesDomContainText("form > h6", "Reset Password");
    await super.seesDomContainText(
      "form > p",
      "Please enter your username to identify your account to reset your password"
    );
    await super.seesDomVisible('input[name="username"]');
    await super.seesDomEnabled('button[type="button"]');
    await super.seesDomEnabled('button[type="submit"]');
  }
  async validateDashboardUrl() {
    await super.seesUrl(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );
  }
}

export class LoginRobotDependencies extends BaseDependencies {
  constructor(page: Page) {
    super(page);
  }
  async visitHomePage() {
    await super.visitUrl("https://opensource-demo.orangehrmlive.com/");
  }
}

export class LoginRobotHands extends BaseHands {
  constructor(page: Page) {
    super(page);
  }

  async inputEmailId(email: string) {
    await super.typeTextonDom('input[name="username"]', email);
  }
  async inputPassword(password: string) {
    await super.typeTextonDom('input[name="password"]', password);
  }
  async clickOnLoginButton() {
    await super.clickOnDomElement('button[type="submit"]');
  }
  async clickOnHamburgerIcon() {
    await super.scrollIntoElement('aside[class="sidebar"]');
    await super.clickOnDomElement('em[id="hamburger_icon"]');
  }
  async clickOnSignOut() {
    await super.clickOnDomElement('ul > li[onclick="signOut();"]');
  }
  async clickOnForgotPassword() {
    await super.clickOnDomElementWithIndex("div > p", 2);
  }
}
