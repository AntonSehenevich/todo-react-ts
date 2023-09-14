describe('Application features', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Adds one todo', () => {
    cy.addTodo('text 1')

    cy.ensureTodos('text 1')
    cy.contains('1 item left').should('exist')
  })

  it('Adds many todos', () => {
    cy.addTodo('text 1', 'text 2', 'text 3')

    cy.ensureTodos('text 1', 'text 2', 'text 3')
    cy.contains('3 items left').should('exist')
  })

  it('Removes todo', () => {
    cy.addTodo('text 1', 'text 2', 'text 3')

    // eslint-disable-next-line cypress/no-force
    cy.get(
      '[data-testid="todos-list"] li:nth-child(2) [data-testid="close-icon"]'
    ).click({ force: true })
    cy.ensureTodos('text 1', 'text 3')
    cy.contains('2 items left').should('exist')
  })

  it('Toggles todo state', () => {
    cy.addTodo('text 1')

    cy.get('[data-testid="circle-icon"]').click()
    cy.get('[data-testid="checked-circle-icon"]').should('exist')
    cy.contains('text 1').should(
      'have.css',
      'text-decoration-line',
      'line-through'
    )
    cy.contains('0 items left').should('exist')
  })

  it('Edits todo text', () => {
    cy.addTodo('text 1')

    cy.contains('text 1').click()
    cy.get('input[value="text 1"]').type('{selectall}{backspace}text 2{enter}')

    cy.contains('text 2').should('exist')
  })

  it('Clears completed todos', () => {
    cy.addTodo('text 1', 'text 2', 'text 3')

    cy.contains('text 1').siblings('[data-testid="circle-icon"]').click()
    cy.contains('text 2').siblings('[data-testid="circle-icon"]').click()
    cy.contains('Clear completed').click()

    cy.contains('text 1').should('not.exist')
    cy.contains('text 2').should('not.exist')
    cy.contains('text 3').should('exist')
  })

  it('Uses "Completed" filter', () => {
    cy.addTodo('text 1', 'text 2', 'text 3')

    cy.contains('text 1').siblings('[data-testid="circle-icon"]').click()
    cy.get('[data-testid="todos-filter"]').contains('Completed').click()

    cy.contains('text 1').should('exist')
    cy.contains('text 2').should('not.exist')
    cy.contains('text 3').should('not.exist')
  })

  it('Uses "Active" filter', () => {
    cy.addTodo('text 1', 'text 2', 'text 3')

    cy.contains('text 1').siblings('[data-testid="circle-icon"]').click()
    cy.get('[data-testid="todos-filter"]').contains('Active').click()

    cy.contains('text 1').should('not.exist')
    cy.contains('text 2').should('exist')
    cy.contains('text 3').should('exist')
  })

  it('Reorders todos', () => {
    cy.addTodo(
      'text 1',
      'text 2',
      'text 3',
      'text 4',
      'text 5',
      'text 6',
      'text 7',
      'text 8'
    )

    cy.reorderTodos('text 1', 'text 2')
    cy.reorderTodos('text 8', 'text 7')
    cy.reorderTodos('text 3', 'text 5')
    cy.reorderTodos('text 6', 'text 4')

    cy.ensureTodos(
      'text 2',
      'text 1',
      'text 6',
      'text 4',
      'text 5',
      'text 3',
      'text 8',
      'text 7'
    )
  })

  it('Has same todos after page reload', () => {
    cy.addTodo('text 1', 'text 2', 'text 3')

    cy.reload()

    cy.ensureTodos('text 1', 'text 2', 'text 3')
  })
})
