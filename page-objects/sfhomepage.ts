import { Locator, Page, expect } from "@playwright/test";
import { basePage } from "./basePage";

export class sfhomepage extends basePage{

    private readonly homepage: Page
    private readonly appLauncher: Locator
    private readonly viewAll: Locator
    private readonly searchBox: Locator
    private readonly salesApp: Locator
    private readonly campaignList: Locator
    private readonly newCampaign: Locator
    private readonly campaignName: Locator
    private readonly typeField: Locator
    private readonly referralOpt: Locator
    private readonly saveBtn: Locator
    
    constructor(page:Page) {
        super(page)
        this.homepage = page
        this.appLauncher = page.getByRole('button', { name: 'App Launcher' })
        this.viewAll = page.getByLabel('View All Applications')
        this.searchBox = page.getByPlaceholder('Search apps or items...')
        this.salesApp = page.getByRole('link', { name: 'Sales', exact: true })
        this.campaignList = page.getByRole('button', { name: 'Campaigns List' })
        this.newCampaign = page.getByRole('menuitem', { name: 'New Campaign' })
        this.campaignName = page.getByLabel('Campaign Name*')
        this.typeField = page.getByRole('button', { name: 'Conference' })
        this.referralOpt = page.getByRole('menuitemradio', { name: 'Referral Program' })
        this.saveBtn = page.getByRole('button', { name: 'Save', exact: true })
    }

    async createCompaign(whichApp: string, campaignName: string) {
        await this.click_on(this.appLauncher, 15000)
        await this.click_on(this.viewAll, 15000)
        await this.fill_on(this.searchBox, whichApp)
        await this.click_on(this.salesApp, 15000)
        await this.click_on(this.campaignList, 15000)
        await this.click_on(this.newCampaign)
        await this.fill_on(this.campaignName, campaignName)
        await this.click_on(this.typeField)
        await this.click_on(this.referralOpt)
        await this.click_on(this.saveBtn)
        await expect(this.homepage.getByRole('heading', { name: `Campaign ${campaignName}` })).toBeAttached()
    }
    
}