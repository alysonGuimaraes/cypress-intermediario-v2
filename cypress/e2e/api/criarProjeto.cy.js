import { faker } from "@faker-js/faker";

describe('Teste criação de projeto via API', () => {

    const project = {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
    }

    beforeEach(() => cy.api_deleteProject())

    it('success', () => {
        cy.api_createProject(project).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body.name).to.eq(project.name)
            expect(res.body.description).to.eq(project.description)
        })
    })
})