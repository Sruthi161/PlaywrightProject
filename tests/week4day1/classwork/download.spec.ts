import { expect, test } from "@playwright/test"
import path from "path"

test(`File download using promise`, async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/download", {timeout:10000})

    const downloadPromise = page.waitForEvent("download")
    await page.locator("a[href*='sample.pdf']").click()
    const downloadedFile = await downloadPromise
    await downloadedFile.saveAs(path.join(__dirname, downloadedFile.suggestedFilename()))
    await downloadedFile.delete()
})