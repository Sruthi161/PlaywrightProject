import { expect, test } from "@playwright/test";

test.describe(`API Interception Learning`,async () => {
    test(`TC001 - API Response Interception`, async ({ page }) => {

        await page.goto("https://thinking-tester-contact-list.herokuapp.com/")
        await page.locator("#signup").click()
        await page.locator("#firstName").fill("Jack")
        await page.locator("#lastName").fill("Jones")
        await page.locator("#email").fill("jack.jones6@hotmail.com")
        await page.locator("#password").fill("random@1234")

        const apiRespPromise = page.waitForResponse("https://thinking-tester-contact-list.herokuapp.com/users")

        await page.locator("#submit").click()

        const apiResp = await apiRespPromise

        expect(apiResp.status()).toBe(201)

        await expect(page).toHaveURL("https://thinking-tester-contact-list.herokuapp.com/contactList", {timeout:10000})

    })

    test(`TC002 - API Request Interception`, async ({ page }) => {

        const emailId = "jack.jones7@hotmail.com"
        await page.goto("https://thinking-tester-contact-list.herokuapp.com/")
        await page.locator("#signup").click()
        await page.locator("#firstName").fill("Jack")
        await page.locator("#lastName").fill("Jones")
        await page.locator("#email").fill(emailId)
        await page.locator("#password").fill("random@1234")

        const apiReqPromise = page.waitForRequest("https://thinking-tester-contact-list.herokuapp.com/users")

        await page.locator("#submit").click()

        const apiReq = await apiReqPromise

        const apiPayload = apiReq.postDataJSON()

        expect(apiPayload.email).toBe(emailId)

        await expect(page).toHaveURL("https://thinking-tester-contact-list.herokuapp.com/contactList", { timeout: 10000 })

    })

    test(`TC003 - API Response Interception with negative case`, async ({ page }) => {

        const emailId = "jack.jones8@hotmail.com"
        await page.goto("https://thinking-tester-contact-list.herokuapp.com/")
        await page.locator("#signup").click()
        // await page.locator("#firstName").fill("Jack")
        await page.locator("#lastName").fill("Jones")
        await page.locator("#email").fill(emailId)
        await page.locator("#password").fill("random@1234")

        const apiRespPromise = page.waitForResponse((response) => {
            return response.url() === "https://thinking-tester-contact-list.herokuapp.com/users" && response.request().method() === "POST"
        })

        await page.locator("#submit").click()

        const apiResp = await apiRespPromise

        const jsonApiResp = await apiResp.json()

        // API Validation
        expect(apiResp.status()).toBe(400)
        expect(jsonApiResp.message).toBe("User validation failed: firstName: Path `firstName` is required.")

        // UI Validation
        expect(page.locator("#error")).toHaveText("User validation failed: firstName: Path `firstName` is required.")

    })
})
