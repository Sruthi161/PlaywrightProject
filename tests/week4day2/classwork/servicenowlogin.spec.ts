import { expect, test } from "@playwright/test"

test.describe(`ServiceNow Login and Storage State usage`, async () => {
    test(`Login flow`, async ({page}) => {
        await page.goto("https://dev192638.service-now.com/")
        await page.waitForLoadState()
        const username = page.locator("#user_name")
        const password = page.locator("#user_password")
        const loginbtn = page.locator("#sysverb_login") 

        await username.fill("admin")
        await password.fill("serviceMano@08")
        await loginbtn.click()
        await page.waitForURL("https://dev192638.service-now.com/now/nav/ui/classic/params/target/ui_page.do%3Fsys_id%3D1ac799919306311090a4b6918bba10dc", {timeout:15000})
        const isDown = await page.getByText("Service Interruption:  This instance is unavailable.").isVisible()
        const bannerContent = page.locator(".experience-title")
        if (isDown) {
            await page.reload({waitUntil:"load"})
        }
        await expect(bannerContent).toHaveText("ServiceNow")

        await page.context().storageState({path:"creds/sn-login.json"})
    })
})