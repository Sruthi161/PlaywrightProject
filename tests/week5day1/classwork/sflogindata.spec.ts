import { test } from "@playwright/test";
import sfdata from "../../../test-data/sfdata.json"

test(`Login Salesforce App using login data`, async ({ page }) => {
    await page.goto("https://login.salesforce.com/")

    const userName = page.locator("input#username")
    const password = page.locator("input#password")
    const loginbtn = page.locator("input#Login")
    const appLauncherIcon = page.locator("div.slds-icon-waffle")
    const viewall = page.locator("button[aria-label='View All Applications']")

    page.on("dialog", (dialog) => {
        dialog.accept()
    })

    await userName.fill(sfdata.username)
    await password.fill(sfdata.password)
    await loginbtn.click({ timeout: 10000 })
    await page.waitForLoadState()
    await appLauncherIcon.click({timeout:15000})
    await page.context().storageState({path: "creds/sf-login.json"}) // helps us to store the user cookies to a json file

})