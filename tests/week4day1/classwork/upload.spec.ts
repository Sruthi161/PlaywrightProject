import { expect, test } from "@playwright/test"
import path from "path"

test(`File upload using input tags`, async ({ page }) => {
    await page.goto("https://leafground.com/dashboard.xhtml")

    const MiscMenu = page.locator(".ui-menuitem-submenu > a[href='#']").filter({ hasText: "Misc" })
    await MiscMenu.click()
    const file = page.locator("a[href*='file']")
    await file.click()
    expect(page.url()).toContain("https://leafground.com/file.xhtml")

    const uploader = page.locator(".card").filter({ hasText: "Basic Upload" })
    const fileChooseBtn = uploader.locator("input[type='file']")
    await fileChooseBtn.setInputFiles(path.join(__dirname, "sample.png")) // use this method only if input tag is present to upload files
    expect(page.locator(".ui-fileupload-filename")).toContainText("sample.png")
})