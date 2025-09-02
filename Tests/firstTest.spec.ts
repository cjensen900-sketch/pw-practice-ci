import { test, expect } from '@playwright/test';


test.beforeEach(async ({page}) => {
    await page.goto('/')
    await page.getByText('forms').click()
    await page.getByText('Forms Layouts').click()
})

test('Locator syntax rules', async({page}) => {
    //By Tag name
    page.locator('input')

    //By ID
    page.locator('#inputEmail1')

    //By Class name
    page.locator('.shape-rectangle')

    //By Attribute

    page.locator('[placeholder= "Email"]')

    //By Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //Combine different selectors
    page.locator('input[placeholder= "Email"][nbinput]')

    //By xPath (Not recommended)
    page.locator('//*[@id="inputEmail1"]')

    //By partial text match
    page.locator(':text("using")')

    //By exact text match
    page.locator(':text-is("Using the Grid")')
})

