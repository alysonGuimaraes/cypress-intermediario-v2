const BASE_URL = Cypress.config('baseUrl')
const USER_NAME = Cypress.env('user_name')

Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},
) => {
  const login = () => {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/users/sign_in')
  }

  const options = {
    cacheAcrossSpecs: true,
    validate
  }

  if (cacheSession) {
    cy.session(user, login, options)
  } else {
    login()
  }
})


Cypress.Commands.add('logout', () => {
  cy.get('.header-user-dropdown-toggle').click()
  cy.get('.sign-out-link').click()
})


Cypress.Commands.add('gui_createProject', (project) => {
  cy.get('#js-onboarding-new-project-link')
    .click()

  cy.get('.qa-global-new-project-link')
    .click()

  cy.get('#blank-project-name > .project-name > #project_name')
    .type(project.name)

  cy.get(':nth-child(5) > #project_description')
    .type(project.description)

  cy.get('#project_initialize_with_readme')
    .check()

  cy.get('#blank-project-pane > #new_project > .btn-success')
    .click()
})


Cypress.Commands.add('gui_createIssue', (issue) => {
  cy.visit(`${BASE_URL}/${USER_NAME}/${issue.project.name}/issues/new`)

  cy.get('#issue_title').type(issue.title)
  cy.get('#issue_description').type(issue.description)

  cy.get('.append-right-10 > .btn').click()
})

Cypress.Commands.add('gui_setLabelOnIssue', label => {
  cy.get('.qa-edit-link-labels').click()
  cy.contains(label.name).click()
  cy.get('body').click()
})

Cypress.Commands.add('gui_setMilestoneOnIssue', mileStone => {
  cy.get('.milestone > .title > .js-sidebar-dropdown-toggle').click()
  cy.contains(mileStone.title).click()
  cy.get('body').click()
})