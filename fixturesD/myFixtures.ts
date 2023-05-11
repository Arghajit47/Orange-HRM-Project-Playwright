/* eslint-disable no-unused-vars */
// 1. import the test and alias it as baseTest
// 2. Declare the type for the type myfixtureType. Can have multiple values
// 3. Create another var called fixture, using baseTest extend to the generic type
// myfixtureType
//
import { test as baseTest } from "@playwright/test";

type myfixtureType = {
  validEmailId: string;
  validPassword: string;
  inValidEmailId: string;
  inValidPassword: string;
  ValidUserName: string;
  ValidPassword: string;
  InvalidUserName: string;
  InvalidPassword: string;
  userApi: string;
  pimApi: string;
  adminUrl: string;
  saveUserUrl: string;
  pimUrl: string;
  addEmployeeUrl: string;
  aboutApi: string;
};

const fixture = baseTest.extend<myfixtureType>({
  validEmailId: "arghajitsingha47+user+admin@gmail.com",
  validPassword: "Asughan4711",
  inValidEmailId: "arghajitsingha47+user@gmail.com",
  inValidPassword: "Arghaj11",
  ValidPassword: "admin123",
  ValidUserName: "Admin",
  InvalidUserName: "admin",
  InvalidPassword: "admin",
  pimApi:
    "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees",
  userApi:
    "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users",
  adminUrl:
    "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers",
  saveUserUrl:
    "https://opensource-demo.orangehrmlive.com/web/index.php/admin/saveSystemUser",
  pimUrl:
    "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList",
  addEmployeeUrl:
    "https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee",
  aboutApi:
    "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/core/about",
});
// This fixture is the actual "test" from playwright test (line number 2)
export const test = fixture;
export const assert = fixture.expect;
