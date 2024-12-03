const ACCESSTOKEN = `Bearer ${Cypress.env("gitlab_access_token")}`

Cypress.Commands.add('api_createProject', (project) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.config('baseUrl')}/api/v4/projects/`,
        headers: { Authorization: ACCESSTOKEN },
        body: {
            name: project.name,
            description: project.description,
            initialize_with_readme: true
        }
    })
})


Cypress.Commands.add('api_searchAllProjects', () => {
    cy.request({
        method: 'GET',
        url: `${Cypress.config('baseUrl')}/api/v4/projects/`,
        headers: { Authorization: ACCESSTOKEN }
    })
})


Cypress.Commands.add('api_deleteProject', () => {
    cy.api_searchAllProjects().then(res => {
        res.body.forEach(project => {
            cy.request({
                method: 'DELETE',
                url: `${Cypress.config('baseUrl')}/api/v4/projects/${project.id}`,
                headers: { Authorization: ACCESSTOKEN }
            })
        });
    })
})


Cypress.Commands.add('api_createIssue', (issue) => {
    cy.api_createProject(issue.project).then(res => {
        cy.request({
            method: 'POST',
            url: `${Cypress.config('baseUrl')}/api/v4/projects/${res.body.id}/issues`,
            headers: { Authorization: ACCESSTOKEN },
            body: {
                title: issue.title,
                description: issue.description,
                initialize_with_readme: true
            }
        })
    })
})

Cypress.Commands.add('api_createLabel', (projectId, label) => {
    cy.request({
      method: 'POST',
      url: `/api/v4/projects/${projectId}/labels`,
      body: {
        name: label.name,
        color: label.color
      },
      headers: { Authorization: ACCESSTOKEN },
    })
})

Cypress.Commands.add('api_createMilestone', (projectId, milestone) => {
    cy.request({
      method: 'POST',
      url: `/api/v4/projects/${projectId}/milestones`,
      body: {
        title: milestone.title
      },
      headers: { Authorization: ACCESSTOKEN },
    })
})