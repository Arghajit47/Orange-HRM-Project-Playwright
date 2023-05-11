import { test } from "@playwright/test";
import loginPageTests from "./tests/OrangeHRMTest/loginPage.spec";
import adminPageTests from "./tests/OrangeHRMTest/adminPage.spec";
import pimPageTests from "./tests/OrangeHRMTest/pimPage.spec";
import aboutPageTests from "./tests/OrangeHRMTest/aboutPage.spec";
import supportPageTests from "./tests/OrangeHRMTest/supportPage.spec";

test.describe(loginPageTests);
test.describe(adminPageTests);
test.describe(pimPageTests);
test.describe(aboutPageTests);
test.describe(supportPageTests);
