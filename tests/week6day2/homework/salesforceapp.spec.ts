import { test } from "@playwright/test";
import { sfloginpage } from "../../../page-objects/sfloginpage";
import { URLConstants } from "../../../constants/urlConstants";
import { FrameworkHelper } from "../../../utils/frameworkHelper";
import { envConstants } from "../../../constants/envConstants";
import { sfhomepage } from "../../../page-objects/sfhomepage";

test.describe(`Salesforce app automation`, async () => {

    test.only(`Salesforce App Login & Create Compaign`, async ({ page }) => {
        await page.goto(URLConstants.appUrl)
        const helper = new FrameworkHelper()
        const data = helper.loadTestData(envConstants.QA)

        const loginPage = new sfloginpage(page)
        const homePage = await loginPage.enterCredsAndLogin(data.username, data.password)

        page.on("dialog", (dialog) => {
            dialog.accept()
        })

        await homePage.createCompaign('sales','Playwright by Man')

    })

})