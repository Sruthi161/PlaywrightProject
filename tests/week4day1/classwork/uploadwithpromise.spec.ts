import { expect, test } from "@playwright/test"
import path from "path"

test(`File upload where no input tags present - resolve using promise`, async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload")

    const fileChooserPromise = page.waitForEvent("filechooser") // creating a promise for file upload
    await page.locator("div[id='drag-drop-upload']").click() // perform upload action
    const fileInput = await fileChooserPromise // wait until promise is resolved
    await fileInput.setFiles(path.join(__dirname, "sample.png")) // using setFiles method send the path of the file
    expect(page.locator("div.dz-filename").nth(0)).toContainText("sample.png")
})