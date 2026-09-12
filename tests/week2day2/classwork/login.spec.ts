import { firefox, test } from "@playwright/test";

test(`opening url`, async () => {
    const myBrowser = await firefox.launch({ headless: false, args: ['--start-maximized'] })
    const context = await myBrowser.newContext()
    const page = await context.newPage()

    // load url
    await page.goto("https://www.saucedemo.com/v1/index.html")
    
    const userName: string = "input#user-name"
    const password: string = "input#password"
    const loginbtn: string = "input#login-button"

    await page.locator(userName).fill("standard_user")
    await page.locator(password).fill("secret_sauce")
    await page.locator(loginbtn).click()

    await page.waitForTimeout(6000)
})