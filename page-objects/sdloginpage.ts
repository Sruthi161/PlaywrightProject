import { test, Locator, Page } from "@playwright/test";

export class sdloginpage{

    readonly usernameField: Locator
    readonly passwordField: Locator
    readonly loginBtn: Locator
    
    constructor(page: Page) {
        this.usernameField = page.locator("input#user-name")
        this.passwordField = page.locator("input#password")
        this.loginBtn = page.locator("input#login-button")
    }

    private async fillUsername(username: string): Promise<void> {
        await test.step(`Filling the username as ${username}`,async () => {
            await this.usernameField.fill(username)
        })
    }

    private async fillPassword(password: string): Promise<void> {
        await test.step(`Filling the password as ${password}`,async () => {
            await this.passwordField.fill(password)
        })
    }

    private async clickLoginBtn(): Promise<void> {
        await test.step(`Click Login button`,async () => {
            await this.loginBtn.click()
        })
    }

    async fillAndLogin(username: string, password: string):Promise<void> {
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.clickLoginBtn()
    }
}