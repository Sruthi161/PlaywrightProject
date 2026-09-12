import { firefox, test } from "@playwright/test";

test(`opening url`, async () => {
    const myBrowser = await firefox.launch({ headless: true})
    const context1 = await myBrowser.newContext()
    const page1 = await context1.newPage()

    const context2 = await myBrowser.newContext()
    const page2 = await context2.newPage()

    // load url
    await page1.goto("https://playwright.dev/")
    await page2.goto("https://youtube.com/")

    // get the url
    const curUrl1 = page1.url()
    console.log(`My 1st browser url is ${curUrl1}`)
    
    const curUrl2 = page2.url()
    console.log(`My 2nd browser url is ${curUrl2}`)

})