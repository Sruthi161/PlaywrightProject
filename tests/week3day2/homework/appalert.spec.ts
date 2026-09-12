import { expect, test } from "@playwright/test"

test(`Handling Application Alerts`, async ({ page }) => {
    await page.goto("https://leafground.com/dashboard.xhtml")

    const browserMenu = page.locator(".ui-menuitem-submenu > a[href='#']").filter({ hasText: "Browser" })
    await browserMenu.click()
    const alert = page.locator("a[href*='alert']")
    await alert.click()
    expect(page.url()).toContain("https://leafground.com/alert.xhtml")

    const dialogCard = page.locator(".card").filter({ hasText: "Minimize and Maximize" })
    const showbtn = dialogCard.locator("button")
    await showbtn.click()

    await expect(dialogCard.locator(".ui-dialog-content")).toHaveText("I am Sweet Alert and can be maximized or minimized. By the way, am not a new window.")
    await dialogCard.locator("a.ui-dialog-titlebar-close").click()
})