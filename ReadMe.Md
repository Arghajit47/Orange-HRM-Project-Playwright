### `fixturesD/myFixtures.ts` folder contains all the variable values like emailId, password and etc.

### `Robot/BaseRobot.ts` is the Robot file developed for the Playwright, extending which we created for example `Robot/pages/LoginPageRobot.ts` to use them in different testFiles, such as; `Robot/pages/LoginPageRobot.ts` is used for `tests/yocoboard/login.spec.ts`.

### In playwright.config.ts file we have mentioned the actionTimeout and expectTimeout;

`timeout: 50 * 1000,`
`  expect: {`
`    /* Maximum time expect() should wait for the condition to be met.`
`    For example in await expect(locator).toHaveText(); */`
`    timeout: 20000,`
`  },`

### To run the testFile : `npx playwright test test.list.ts --project=chromium --headed --workers 1`

### To Install Allure-Reports:

1. `wget https://github.com/allure-framework/allure2/releases/download/2.18.1/allure_2.18.1-1_all.deb`
2. `sudo dpkg -i allure_2.18.1-1_all.deb`
3. `npm i -D @playwright/test allure-playwright`
4. Either add allure-playwright into playwright.config.ts:

   {
   reporter: "allure-playwright";
   }
   Or pass the same value via config file:

   {
   reporter: [["line"], ["allure-playwright"]];
   }

5. Generate Allure Report: `allure generate allure-results -o allure-report --clean`
6. Open Allure Reports: `allure open allure-report`
