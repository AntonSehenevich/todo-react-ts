describe('Application first launch', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Shows page with no todos', () => {
    cy.get('[data-testid="todos-list"]').should('not.exist')
  })

  it('Todo input is focused', () => {
    cy.focused().should('have.prop', 'type', 'text')
    cy.focused().should('have.prop', 'placeholder', 'Something to do?')
    cy.focused().should('have.prop', 'value', '')
  })
})
