import { test } from "@playwright/test";

test.describe(`Salesforce login`, async () => {

    test.use({ storageState: "creds/sf-login.json" }) // fixture params helps us use the stored cookie file to bypass login
    
    test(`Create Compaign`, async ({ page }) => {
        await page.goto("https://yubipvtltd-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home")

        const appLauncherIcon = page.locator("div.slds-icon-waffle")
        const viewall = page.locator("button[aria-label='View All Applications']")
        const searchbox = page.locator("input[placeholder='Search apps or items...']")

        page.on("dialog", (dialog) => {
            dialog.accept()
        })

        await page.waitForLoadState()
        await appLauncherIcon.click({ timeout: 15000 })
        await viewall.click()
        await searchbox.fill("Sales")

        const salesApp = page.locator("div[data-name='Sales']")
        await salesApp.click()

        const compaign = page.locator("a[href='/lightning/o/Campaign/home']")
        await compaign.click()

        const newcompaign = page.locator("a[title='New']")
        await newcompaign.click()

        
        

    })
})