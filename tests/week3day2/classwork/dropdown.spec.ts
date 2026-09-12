import { expect, test } from "@playwright/test";

test(`select dropdown`, async ({ page }) => {

    // load url
    await page.goto("https://www.saucedemo.com/v1/index.html")

    const userName: string = page.locator("input#user-name")
    const password: string = page.locator("input#password")
    const loginbtn: string = page.locator("input#login-button")

    await userName.fill("standard_user")
    await password.fill("secret_sauce")
    await loginbtn.click()

    expect(page.url()).toBe("https://www.saucedemo.com/v1/inventory.html")

    const dropdown = page.locator(".product_sort_container")

    await dropdown.selectOption('lohi')

    const allItems = await page.locator(".inventory_item").all()
    const n = allItems.length

    const firstItem = allItems[0].locator(".inventory_item_name")

    expect(firstItem).toHaveText("Sauce Labs Onesie")

    const lastItem = await allItems[n-1].locator(".inventory_item_name").textContent()

    expect(lastItem).toBe("Sauce Labs Fleece Jacket")

})