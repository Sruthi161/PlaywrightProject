import { expect, test } from "@playwright/test"

test.describe(`ServiceNow Incident handling`, async () => {
    test.describe.configure({ mode: "serial" })
    test.use({ storageState: "creds/sn-login.json" })
    const incidentNum = "INC0010025"
    
    test(`TC001 - Resolve an Incident`,async ({page,context}) => {
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
        incidentSearchSelect.selectOption("number")

        const searchIncident = iframe.locator("div[role='search'] > input")
        await searchIncident.fill(incidentNum)

        await page.keyboard.press("Enter")

        await page.waitForTimeout(5000)

        const resultnumber = iframe.locator("a[aria-label^='Open record']")
        
        expect(resultnumber).toHaveCount(2)
        expect(resultnumber.nth(0)).toHaveText(incidentNum)
        expect(resultnumber.nth(1)).toHaveText("Abel Tuter")

        await resultnumber.nth(0).click()

        await page.waitForTimeout(5000)

        const statedd = iframe.locator("select[id='incident.state']")
        await statedd.selectOption("6")

        const resolutioninfo = iframe.locator("#tabs2_section").getByText("Resolution Information")
        await resolutioninfo.click()

        const resolutionCode = iframe.locator("select[id='incident.close_code']")
        resolutionCode.selectOption("Workaround provided")

        const resolutionNotes = iframe.locator("[id='incident.close_notes']")
        await resolutionNotes.fill("Manoj has resolved the Incident")

        const resolvebtn = iframe.locator("button[id='resolve_incident']")
        await resolvebtn.click()

        await page.waitForTimeout(5000)

        const stateLabel = iframe.locator("td[class='vt']").nth(5)
        expect(stateLabel).toHaveText("Resolved")

    })
    
})