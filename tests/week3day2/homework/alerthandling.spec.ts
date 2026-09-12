import { expect, test } from "@playwright/test"

test(`Handling Browser Alerts using event handlers`, async ({ page }) => {
    await page.goto("https://leafground.com/dashboard.xhtml")

    const browserMenu = page.locator(".ui-menuitem-submenu > a[href='#']").filter({ hasText: "Browser" })
    await browserMenu.click()
    const alert = page.locator("a[href*='alert']")
    await alert.click()
    expect(page.url()).toContain("https://leafground.com/alert.xhtml")

    page.on("dialog", (dialog) => {
        const msg = dialog.message()
        expect(msg).toBe("Type your name and click OK")
        dialog.accept("Manoj")
    })

    const dialogCard = page.locator(".card").filter({ hasText: " Alert (Prompt Dialog)" })
    const showbtn = dialogCard.locator("button")
    await showbtn.click()

    const result = page.locator("#confirm_result")
    expect(result).toContainText("Manoj")
})