import { expect, test } from "@playwright/test"

test.describe(`ServiceNow Incident handling`, async () => {
    test.describe.configure({ mode: "serial" })
    test.use({ storageState: "creds/sn-login.json" })
    let incidentNum: any;
    
    test(`TC001 - Create Incident`,async ({page,context}) => {
        await page.goto("https://dev192638.service-now.com/now/nav/ui/classic/params/target/ui_page.do%3Fsys_id%3D1ac799919306311090a4b6918bba10dc")
        // const allbtn = page.locator("div[role='button'][aria-label='All']")
        // await allbtn.click()
        // await page.locator("button[aria-label='Pin All menu']").click()
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
        const newBtn = iframe.locator("button[id='sysverb_new']")
        await newBtn.click()
        // await page.waitForURL("*incident.do*")
        // expect(page.url()).toContain("incident.do")
        // expect(await title.textContent()).toContain("Incident - Create")

        await page.waitForURL(RegExp("https://dev192638.service-now.com/now/nav/ui/classic/params/target/incident.do.*"))

        incidentNum = await iframe.locator("input[id='incident.number']").getAttribute("value", {timeout:15000})

        const windowPromise = context.waitForEvent("page")

        const callerIDLookup = iframe.locator("button[id='lookup.incident.caller_id']")
        await callerIDLookup.click()

        const page2 = await windowPromise
        page2.bringToFront()

        const firstCaller = page2.locator("a.glide_ref_item_link").nth(0)
        await firstCaller.click()

        page.bringToFront()

        const shortDes = iframe.locator("input[id='incident.short_description']")
        await shortDes.fill("Manoj is creating a new incident using playwright")

        const submitBtn = iframe.locator("button[id='sysverb_insert']")
        await submitBtn.click()

        expect(page.url()).toContain("incident_list")

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
        
    })
    
})