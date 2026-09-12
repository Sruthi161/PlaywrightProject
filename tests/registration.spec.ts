import { test, expect } from '@playwright/test';
import path from 'path';
import { faker } from '@faker-js/faker';

test('Registration Flow', async ({ page }) => {
    for (let i = 1; i <= 10; i++) {

        const reg_data_set = {
            "first_name": faker.person.firstName(),
            "last_name": faker.person.lastName(),
            "email": faker.internet.email(),
            "password": faker.internet.password({ length: 12 })
        }

        console.log("Run Params", i)
        console.log(reg_data_set.first_name)
        console.log(reg_data_set.last_name)
        console.log(reg_data_set.email)
        console.log(reg_data_set.password)

        await page.goto('https://staging.sisystems.com/');
        await page.getByRole('link', { name: 'Register' }).click();
        await page.waitForURL("https://beta1portal.sisystems.com/#/portal/registration/candidate?OE=F6CD0F3539C93A9A")
        await page.getByPlaceholder('Enter Legal First Name').fill(reg_data_set.first_name);
        await page.getByPlaceholder('Enter Legal Last Name').fill(reg_data_set.last_name);
        await page.getByPlaceholder('Street Address Line 1').fill('Valentina');
        await page.getByPlaceholder('City').fill('Toronto');
        await page.locator('p-dropdown').filter({ hasText: 'Select Province/State' }).getByLabel('dropdown trigger').click();
        await page.getByText('Ontario').click();
        await page.locator('#zipcodeOne').fill('A1A');
        await page.locator('#zipcodeTwo').fill('1B1');
        await page.locator('p-dropdown').filter({ hasText: 'Select Nearest S.i Branch' }).getByLabel('dropdown trigger').click();
        await page.getByLabel('Calgary').click();
        await page.getByPlaceholder('Primary 10 Digit Number').fill('9567656675');
        await page.getByPlaceholder('Enter E-mail address. This').fill(reg_data_set.email);
        await page.getByPlaceholder('Re-enter E-mail address').fill(reg_data_set.email);
        await page.getByRole('textbox', { name: 'Enter a password of Minimum 6' }).fill(reg_data_set.password);
        await page.getByRole('textbox', { name: 'Re-enter password' }).fill(reg_data_set.password);
        await page.getByLabel('Basic Information').locator('div').filter({ hasText: /^Yes$/ }).locator('div').nth(2).click();
        await page.locator('#typeOfCompany > .p-radiobutton > .p-radiobutton-box').first().click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.locator('p-dropdown').filter({ hasText: 'Select Primary Specialization' }).getByLabel('dropdown trigger').click();
        await page.getByLabel('AI Development').click();
        await page.locator('#specOneSkill0').getByLabel('dropdown trigger').click();
        await page.getByLabel('Chat Bot Developer').click();
        // await page.locator('#specOneYear0 > .p-dropdown-trigger').click();
        await page.locator('#specOneYear0 > span').highlight();
        await page.locator('#specOneYear0 > span').click();
        await page.locator('#specOneYear0_list > p-dropdownitem').first().click();
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
        await page.locator('#uploadResume > div > span > input').setInputFiles(path.join(__dirname, '../files/dummy.pdf'));
        await page.locator('div:nth-child(2) > #receiveEmailNotification > .p-radiobutton > .p-radiobutton-box').click();
        await page.locator('#occasionalUpdates > .p-radiobutton > .p-radiobutton-box').first().click();
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
        // page.on('dialog', async (dialog) => {
        //     if (dialog.type() === 'beforeunload') {
        //         await dialog.dismiss();
        //     }
        // });
        await page.getByRole('button', { name: 'Create Account' }).click();
        await page.waitForTimeout(5000);
        await page.waitForURL(/.*MultiFactorValidation.*/);
        const otp_page = page.getByRole('cell', { name: 'One-Time Passcode(OTP)', exact: true });
        await expect(otp_page).toBeVisible();
    }
});