import { test } from "@playwright/test";

test(`Login Salesforce App`,async ({page}) => {
    await page.goto("https://login.salesforce.com/")

    const userName: string = "input#username"
    const password: string = "input#password"
    const loginbtn: string = "input#Login"
    const appLauncherIcon: string = "div.slds-icon-waffle"
    const viewall: string = "button[aria-label='View All Applications']"
    const search: string = "input#input-246"


    await page.locator(userName).fill("hari.radhakrishnan@qeagle.com")
    await page.locator(password).fill("Leaf$1234")
    await page.locator(loginbtn).click()
    await page.waitForTimeout(5000)
    await page.locator(appLauncherIcon).click()
    await page.locator(viewall).click()
    await page.waitForTimeout(5000)
    await page.locator(search).fill("Sales")
    await page.waitForTimeout(5000)

})