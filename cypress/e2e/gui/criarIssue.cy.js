import { faker } from "@faker-js/faker";

describe('Testando criação de Issue', () => {

    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    before(() => {
        cy.api_deleteProject()
        cy.login()
        cy.visit('/')
        cy.api_createProject(issue.project)
    })

    it('success', () => {
        cy.gui_createIssue(issue)

        cy.get('.issue-details')
            .should('contain', issue.title)
            .and('contain', issue.description)
    })
})