import { test } from "@playwright/test";

test.describe(`Login using already stored cookies using storage state json file`, async () => {

    test.use({ storageState: "creds/sf-login.json" }) // fixture params helps us use the stored cookie file to bypass login
    
    test(`Login Salesforce App`, async ({ page }) => {
        await page.goto("https://yubipvtltd-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home")

        const appLauncherIcon = page.locator("div.slds-icon-waffle")
        const viewall = page.locator("button[aria-label='View All Applications']")

        page.on("dialog", (dialog) => {
            dialog.accept()
        })

        await page.waitForLoadState()
        await appLauncherIcon.click({ timeout: 15000 })
        await page.waitForTimeout(20000)

    })
})