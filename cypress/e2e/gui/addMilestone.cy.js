import { faker } from "@faker-js/faker"


describe('Teste adicionar milestone ', () => {

    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }


    const milestone = {
        title: `milestone-${faker.random.words(2)}`
    }

    beforeEach(() => {
        cy.api_deleteProject()
        cy.login()
        cy.api_createIssue(issue)
            .then(response => {
                cy.api_createMilestone(response.body.project_id, milestone)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
        })
    })

    it('Success', () => {
        cy.gui_setMilestoneOnIssue(milestone)

        cy.get("div .milestone").should('contain', milestone.title)
    })
})