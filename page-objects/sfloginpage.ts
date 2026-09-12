import { test, Locator, Page, expect } from "@playwright/test";
import { basePage } from "./basePage";
import { URLConstants } from "../constants/urlConstants";
import { sfhomepage } from "./sfhomepage";
export class sfloginpage extends basePage {

    private readonly loginPage: Page
    private readonly username: Locator
    private readonly password: Locator
    private readonly loginBtn: Locator

    constructor(page: Page) {
        super(page);
        this.loginPage = page
        this.username = page.locator("input#username")
        this.password = page.locator("input#password")
        this.loginBtn = page.locator("input#Login")
    }

    public async enterCredsAndLogin(userName: string, password: string): Promise<sfhomepage> {
        await test.step(`Entering the credentials and Logging in`, async () => {
            await this.fill_on(this.username, userName)
            await this.fill_on(this.password, password)
            await this.click_on(this.loginBtn)
            await expect(this.classPage).toHaveURL(URLConstants.homePageUrl, {timeout:15000})
        })
        return new sfhomepage(this.loginPage)
    }
}