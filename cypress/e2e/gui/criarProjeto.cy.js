import {faker} from '@faker-js/faker'


describe('Teste de criação de projeto', () => {

    before(() => {
        cy.api_deleteProject()
        cy.login()
        cy.visit('/')
    })

    it('cria um novo projeto', () => {

        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }

        cy.gui_createProject(project)

        cy.url().should(
            'be.eq', 
            `${Cypress.config('baseUrl')}/root/${project.name}`
        )
        cy.contains(project.name).should('be.visible')
        cy.contains(project.description).should('be.visible')
    })
})