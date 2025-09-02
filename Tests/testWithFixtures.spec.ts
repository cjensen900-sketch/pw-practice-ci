import {test} from '../test-options'
import {faker} from '@faker-js/faker'



test('parametrized methods', async({pageManager}) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

   
    await pageManager.onformLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    await pageManager.onformLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)

})