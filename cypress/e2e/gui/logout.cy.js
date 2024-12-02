describe('Teste de logout do sistema', () => {

    beforeEach(() => {
        cy.login()
        cy.visit('/')
    })

    it('Realizando logout da aplicação', () => {
        cy.logout()

        cy.url().should('be.eq', `${Cypress.config('baseUrl')}/users/sign_in`)
    })
})