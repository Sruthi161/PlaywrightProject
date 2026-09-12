import { expect, test } from "@playwright/test";

test(`login assertion`, async ({page}) => {

    // load url
    await page.goto("https://www.saucedemo.com/v1/index.html")

    const userName: string = "input#user-name"
    const loginbtn: string = "input#login-button"
    const err = page.locator("h3[data-test='error']")

    await page.locator(userName).fill("standard_user")
    await page.locator(loginbtn).click()

    expect(err, `verifying the error is visble`).toBeVisible()
    
    // way 1 to verify text by fetching text from the locator and then asserting the text
    const errText = await err.textContent()

    console.log(errText)

    expect(errText, `Verifying if the error message prompts for password`).toContain("Password is required")

    // way 2 to verify text which is inside the locator directly by using locator itself
    expect(err, `Verifying if the error message from locator prompts for password`).toContainText("Password is required")

})