import { expect, test } from "@playwright/test";
import {sdloginpage} from "../../../page-objects/sdloginpage"

test(`Sauce demo login using POM`, async ({page}) => {

    // load url
    await page.goto("https://www.saucedemo.com/v1/index.html")
    const loginPage = new sdloginpage(page);
    await loginPage.fillAndLogin("standard_user", "secret_sauce")

    expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html")

})