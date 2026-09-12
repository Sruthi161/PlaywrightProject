import { test } from "@playwright/test";

test(`Login Salesforce App and store cookies using storageState`, async ({ page }) => {
    await page.goto("https://login.salesforce.com/")

    const userName = page.locator("input#username")
    const password = page.locator("input#password")
    const loginbtn = page.locator("input#Login")
    const appLauncherIcon = page.locator("div.slds-icon-waffle")
    const viewall = page.locator("button[aria-label='View All Applications']")

    page.on("dialog", (dialog) => {
        dialog.accept()
    })

    await userName.fill("manojv@salesforce.com")
    await password.fill("manojSales@08")
    await loginbtn.click({ timeout: 10000 })
    await page.waitForLoadState()
    await appLauncherIcon.click({timeout:15000})
    await page.context().storageState({path: "creds/sf-login.json"}) // helps us to store the user cookies to a json file

})