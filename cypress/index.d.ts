/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    addTodo(...args: string[]): Chainable<unknown>
    reorderTodos(source: string, destination: string): Chainable<unknown>
    ensureTodos(...args: string[]): Chainable<unknown>
  }
}
