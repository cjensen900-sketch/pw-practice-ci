import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}, testInfo) => {
  await page.goto(process.env.URL)
  await page.getByText('Button Triggering AJAX request').click()
  testInfo.setTimeout(testInfo.timeout + 2000)
})

test('auto waiting', async ({page}) => {
  const successButton = page.locator('.bg-success')

  //await successButton.click()

  //const text = await successButton.textContent()
  //await successButton.waitFor({state: "attached"})
  //const text = await successButton.allTextContents()

  //expect(text).toContain('Data loaded with AJAX get request.');

  await expect (successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('alternative waits', async ({page}) => {
  const successButton = page.locator('.bg-success')

  //?___ wait for element

})