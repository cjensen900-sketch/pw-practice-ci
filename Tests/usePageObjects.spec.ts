import {test, expect} from '@playwright/test'
import {PageManager} from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'



test.beforeEach(async ({page}) => {
    await page.goto('/')
    
})

test('navigate to form page @smoke @regression', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
    

})

test('parametrized methods @smoke', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onformLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    //await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})
    //const buffer = await page.screenshot()
    //console.log(buffer.toString('base64'))
    await pm.onformLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    //await page.locator('nb-card', {hasText: "Inline Form"}).screenshot({path: 'screenshots/inlineForm.png'})    
    await pm.navigateTo().datePickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(2)
    await pm.onDatepickerPage().selectDatePickerWithRangeFromToday(2, 4)

})

test.only('testing with argos ci', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
    

})