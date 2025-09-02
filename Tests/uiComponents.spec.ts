import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}, testInfo) => {
    await page.goto('/')
    if(testInfo.retry){
        //do something

    }
  
})

test.describe.only('Form Layouts page', () => {
  test.describe.configure({retries: 0})
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
  })

  test('input fields', async({page}) => {
    const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name:"Email"})

    await usingTheGridEmailInput.fill('test2@test.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.type('test2@test.com')

    //Generic assertion
    const inputValue = await usingTheGridEmailInput.inputValue()
    expect(inputValue).toEqual('test2@test.com')

    //Locator assertion
    await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
})

test.only('radio button', async({page}) => {
  const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})

  //await usingTheGridForm.getByLabel('Option 1').check({force: true})
  await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true})
  const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
  await expect(usingTheGridForm).toHaveScreenshot({maxDiffPixels: 150})
//  expect(radioStatus).toBeTruthy()
//  await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

//  await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
//  expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
//  expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()

 
})



test ('checkboxes', async({page}) => {
  await page.getByText('Modal & Overlays').click()
  await page.getByText('Toastr').click()

  await page.getByRole('checkbox', {name: "hide on click"}).uncheck({force: true})
  await page.getByRole('checkbox', {name: "prevent arising of duplicate toast"}).check({force: true})

  const allBoxes = page.getByRole('checkbox')
  for(const box of await allBoxes.all()) {
    await box.uncheck({force: true})
    expect(await box.isChecked()).toBeFalsy()
  }
})


test('datepicker', async ({ page }) => {
   await page.getByText('Datepicker').click()

  const calendarInputField = page.getByPlaceholder('Form Picker')
  await calendarInputField.click()

  let date = new Date()
  date.setDate(date.getDate() + 7)
  const expectedDate = date.getDate().toString()
  const expectedMonthShot = date.toLocaleString('en-US', { month: 'short' })
  const expectedMonthLong = date.toLocaleString('en-US', { month: 'long' })
  const expectedYear = date.getFullYear()
  const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`

  let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
  const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
  while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
    await page.locator('[data-name="chevron-right"]').click()
    calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
  }

  await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click()
  await expect(calendarInputField).toHaveValue(dateToAssert)
})


//test('sliders', async({page}) => {
//  //update attribute
//  const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
//  await tempGauge.evaluate( node => {
//    node.setAttribute('cx', '232.630')
//    node.setAttribute('cy', '232.630')
//  })
//  await tempGauge.click()

// Mouse movement
//  const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
//  await tempBox.scrollIntoViewIfNeeded()

//  const box = await tempBox.boundingBox()
//  const x = box.x + box.width / 2
//  const y = box.y + box.height / 2
//  await page.mouse.move(x, y)
//  await page.mouse.down()
//  await page.mouse.move(x +100, y)
//  await page.mouse.move(x +100, y +100)
//  await page.mouse.up()
//    await expect(tempBox).toContainText('30')
//  })
})