import { firefox, test } from "@playwright/test";

test(`API request context explained`, async () => {
    const browser = await firefox.launch({ headless: false, args: ['--start-maximized'] })
    const context = await browser.newContext()
    
    // page
    const page = await context.newPage()

    // api request context using browser context
    const apiRequestContext = context.request

    // api request context using page
    const apiRequest = page.request

})