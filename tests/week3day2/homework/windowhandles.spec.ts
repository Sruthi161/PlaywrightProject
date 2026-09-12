import { expect, test } from "@playwright/test"

test(`Handling windows`, async ({ page,context }) => {
    await page.goto("https://leafground.com/dashboard.xhtml")

    const browserMenu = page.locator(".ui-menuitem-submenu > a[href='#']").filter({ hasText: "Browser" })
    await browserMenu.click()
    const alert = page.locator("a[href*='window']")
    await alert.click()
    expect(page.url()).toContain("https://leafground.com/window.xhtml")

    // Promise created to explicitly wait for the new page to be created - event handler
    const windowPromise = context.waitForEvent("page")

    // Action to open a new window
    const targetCard = page.locator(".card").filter({ hasText: "Click and Confirm new Window Opens" })
    const cardbtn = targetCard.locator("button")
    await cardbtn.click()

    const page2 = await windowPromise // promise resolves to a page
    await page2.bringToFront() // to change focus of playwright to newly opened page
    expect(page2).toHaveURL("https://leafground.com/dashboard.xhtml")

})