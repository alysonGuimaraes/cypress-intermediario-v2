import { faker } from "@faker-js/faker";


describe('Teste criar label dentro de issues com GUI', () => {

    const issue = {
        title: `label-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }


    const label = {
        title: `label-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
    }

    beforeEach(() => {
        cy.api_deleteProject()
        cy.login()
    })

    it('Success', () => {
        cy.api_createIssue(issue)
    })
})