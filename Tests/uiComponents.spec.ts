import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Forms Layouts').click()
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


test('sliders', async({page}) => {
  //update attribute
  const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
  await tempGauge.evaluate( node => {
    node.setAttribute('cx', '232.630')
    node.setAttribute('cy', '232.630')
  })
  await tempGauge.click()

  //Mouse movement
  const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
  await tempBox.scrollIntoViewIfNeeded()

  const box = await tempBox.boundingBox()
  const x = box.x + box.width / 2
  const y = box.y + box.height / 2
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x +100, y)
  await page.mouse.move(x +100, y +100)
  await page.mouse.up()
  await expect(tempBox).toContainText('30')


})