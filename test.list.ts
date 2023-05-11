import { test } from "@playwright/test";
import loginPageTests from "./tests/OrangeHRMTest/loginPage.spec";
import adminPageTests from "./tests/OrangeHRMTest/adminPage.spec";
import pimPageTests from "./tests/OrangeHRMTest/pimPage.spec";

test.describe(loginPageTests);
test.describe(adminPageTests);
test.describe(pimPageTests);
