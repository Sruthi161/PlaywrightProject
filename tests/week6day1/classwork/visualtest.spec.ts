import { expect, test } from "@playwright/test"

test.describe(`Visual Comparison test`, async () => {
    
    test(`Verify landing page image design`,async ({page}) => {
        await page.goto("https://www.saucedemo.com/v1/index.html")

        // this is to compare the full page image using visual comparison (RGB pallette matching using pixel match library)
        // https://github.com/mapbox/pixelmatch
        await expect(page, `expecting the home page comparison using visual screenshot`).toHaveScreenshot("landing-page.png")
    })

    // Below is the command line for updating all the actual snapshots to get updated in the repo 
    // npx playwright test --update-snapshots

    // we can also take snapshot of specific locators & compare as well

    // we can also mask some of the dynamic areas which we don't want to compare using mask: params inside toHaveScreenshot method
    
})