Cypress.Commands.add('addTodo', (...args) => {
  args.forEach(arg => {
    cy.get('[data-testid="add-todo"] input').type(`${arg}{enter}`)
  })
})

Cypress.Commands.add('reorderTodos', (source: string, destination: string) => {
  cy.contains(source).trigger('dragstart')
  cy.contains(destination).trigger('dragenter')
  cy.contains(destination).trigger('dragend')
})

Cypress.Commands.add('ensureTodos', (...args) => {
  args.forEach((arg, index) => {
    cy.get(`[data-testid="todos-list"] li:nth-child(${index + 1})`).should(
      'have.text',
      arg
    )
  })
})
