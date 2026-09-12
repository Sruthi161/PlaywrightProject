import { test, Locator, Page } from "@playwright/test";

type locateBy = Locator | string
export class basePage {

    readonly classPage: Page

    constructor(page: Page) {
        this.classPage = page
    }

    async open_url(url: string) {
        await test.step(`Opening the given url ${url}`, async () => {
            await this.classPage.goto(url)
        })
    }

    generateLocator(locateBy: locateBy) {
        return typeof (locateBy) == "string" ? this.classPage.locator(locateBy) : locateBy
    }

    async fill_on(locateBy: locateBy, textToFill: string) {
        await test.step(`Enter the ${locateBy} with given text ${textToFill}`, async () => {
            await this.generateLocator(locateBy).fill(textToFill)
        })
    }

    async click_on(locateBy: locateBy, defaultTimeout=10000) {
        await test.step(`Click on the provided ${locateBy}`, async () => {
            try {
                await this.generateLocator(locateBy).click({timeout: defaultTimeout})
            } catch (error) {
                console.log(`Error occurred while trying to click on the locator ${locateBy}`)
            }
        })
    }

}