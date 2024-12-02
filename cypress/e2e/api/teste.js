it('teste', () => {
    cy.api_searchAllProjects().then(res => {
        expect(res.status).to.eq(200)
        console.log(res.body.length)
    })

    cy.api_deleteProject().then(res => {
        expect(res.status).to.eq(202)
    })

    cy.api_searchAllProjects().then(res => {
        expect(res.status).to.eq(200)
        console.log(res.body.length)
    })
})
