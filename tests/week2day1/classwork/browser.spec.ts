import { firefox, test } from "@playwright/test";

test(`opening url`, async () => {
    const myBrowser = await firefox.launch({ headless: false, args: ['--start-maximized'] })
    const context1 = await myBrowser.newContext()
    const page1 = await context1.newPage()

    // load url
    await page1.goto("https://playwright.dev/")
    // get the url
    const curUrl = page1.url()
    console.log(`My browser url is ${curUrl}`)
    
})