import { expect, test } from "@playwright/test";
import sdlogin from "../../../test-data/saucedemo.json"

test.describe(`login assertions on sauce demo site`, async () => {
    sdlogin.forEach((loginDataObj) => {
        test(`${loginDataObj.case}`,async ({page}) => {
            await page.goto("https://www.saucedemo.com/v1/index.html")

            const userName = page.locator("input#user-name")
            const password = page.locator("input#password")
            const loginbtn  = page.locator("input#login-button")
            const error = page.locator("h3[data-test='error']")

            await userName.fill(loginDataObj.username)
            await password.fill(loginDataObj.password)
            await loginbtn.click()
            await expect(error).toBeVisible()
            await expect(error).toContainText(loginDataObj.message)
        })
    })
})