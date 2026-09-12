import { expect, test } from "@playwright/test"

test(`Actionability Checks`, async ({page}) => {
    await page.goto("https://leafground.com/dashboard.xhtml")

    const sidemenu = page.locator(".ui-menuitem-submenu > a[href='#']")
    await sidemenu.nth(2).click()
    const waits = page.locator("a[href*='waits']")
    await waits.click()
    expect(page.url()).toContain("https://leafground.com/waits.xhtml")

    const iamherebtn = page.getByText("I am here")
    await expect(iamherebtn).not.toBeVisible() // verified that the button I am here isn't visible

    const clickbtn = page.locator("h5+div button").nth(0)
    await clickbtn.click()
    await expect(iamherebtn).toBeVisible({timeout:10000})

})