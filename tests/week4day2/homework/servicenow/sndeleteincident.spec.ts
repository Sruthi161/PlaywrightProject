import { expect, test } from "@playwright/test"

test.describe(`ServiceNow Incident handling`, async () => {
    test.describe.configure({ mode: "serial" })
    test.use({ storageState: "creds/sn-login.json" })
    const incidentNum = "INC0000003"
    
    test(`TC001 - Delete an Incident`,async ({page,context}) => {
        await page.goto("https://dev192638.service-now.com/now/nav/ui/classic/params/target/ui_page.do%3Fsys_id%3D1ac799919306311090a4b6918bba10dc")

        const filterTextBox = page.locator("input#filter")
        await filterTextBox.fill("Incidents")
        const sdincidents = page.locator("button[aria-label='Service Desk']+div")
        await sdincidents.locator("a[aria-label='Incidents']").click()

        const title = page.locator(".experience-title")
        if (await title.textContent() == "maintenance") {
            await page.reload({waitUntil:"load"})
        }

        expect(page.url()).toContain("incident_list.do")
        
        const iframe = page.frameLocator("iframe#gsft_main")

        const incidentSearchSelect = iframe.locator("select[aria-label='Search a specific field of the Incidents list']")
        await incidentSearchSelect.selectOption("number")

        const searchIncident = iframe.locator("div[role='search'] > input")
        await searchIncident.fill(incidentNum)

        await page.keyboard.press("Enter")

        await page.waitForTimeout(5000)

        const resultnumber = iframe.locator("a[aria-label^='Open record']")
        await resultnumber.nth(0).click()

        await page.waitForTimeout(5000)

        const deletebtn = iframe.locator("button[id='sysverb_delete']")
        await deletebtn.click({timeout:10000})

        const deletebtn2 = iframe.locator("button[id='ok_button']")
        await deletebtn2.click({ timeout: 10000 })

        expect(iframe.locator("div[class='list2_empty-state-list']")).toBeVisible

    })
    
})