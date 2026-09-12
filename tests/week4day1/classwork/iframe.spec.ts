import { expect, test } from "@playwright/test"

test(`Handling iframes`, async ({ page }) => {
    await page.goto("https://leafground.com/dashboard.xhtml")

    const browserMenu = page.locator(".ui-menuitem-submenu > a[href='#']").filter({ hasText: "Browser" })
    await browserMenu.click()
    const frame = page.locator("a[href*='frame']")
    await frame.click()
    expect(page.url()).toContain("https://leafground.com/frame.xhtml")

    const iframeCard = page.locator(".card").filter({ hasText: "Click Me (Inside frame)" })
    const iframe = iframeCard.frameLocator("[src='default.xhtml']")
    const iframebtn = iframe.locator("button")
    await iframebtn.click()
    expect(iframebtn).toContainText("Hurray! You Clicked Me.")
})