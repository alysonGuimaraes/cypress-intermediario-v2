import { faker } from "@faker-js/faker";


describe('Teste criar label dentro de issues com GUI', () => {

    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }


    const label = {
        name: `label-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        color: '#FFFFFF'
    }

    beforeEach(() => {
        cy.api_deleteProject()
        cy.login()
        cy.api_createIssue(issue)
            .then(response => {
                cy.api_createLabel(response.body.project_id, label)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
      })
    })

    it('Success', () => {
        cy.gui_setLabelOnIssue(label)

        cy.get('.qa-labels-block').should('contain', label.name)
        cy.get('.qa-labels-block span')
            .should('have.attr', 'style', `background-color: ${label.color}; color: #333333;`)
    })
})