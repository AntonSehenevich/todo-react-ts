import { TodoFilter } from '../../data-structures'
import selectTodos from '../../store/selectors'

const state = {
  todos: {
    items: [
      { id: '1', text: 'text 1', completed: false },
      { id: '2', text: 'text 2', completed: true }
    ]
  },
  filter: {
    current: TodoFilter.All
  }
}

test('gets state with "All" filter', () => {
  const todos = selectTodos(state)

  expect(todos).toEqual({
    filteredItems: [
      { id: '1', text: 'text 1', completed: false },
      { id: '2', text: 'text 2', completed: true }
    ],
    filter: TodoFilter.All,
    totalCount: 2,
    uncompletedCount: 1
  })
  expect(Object.is(todos, selectTodos(state))).toBe(true)
})

test('gets state with "Completed" filter', () => {
  const stateCopy = {
    ...state,
    filter: {
      current: TodoFilter.Completed
    }
  }
  const todos = selectTodos(stateCopy)

  expect(todos).toEqual({
    filteredItems: [{ id: '2', text: 'text 2', completed: true }],
    filter: TodoFilter.Completed,
    totalCount: 2,
    uncompletedCount: 1
  })
  expect(Object.is(todos, selectTodos(stateCopy))).toBe(true)
})

test('gets state with "Active" filter', () => {
  const stateCopy = {
    ...state,
    filter: {
      current: TodoFilter.Uncompleted
    }
  }
  const todos = selectTodos(stateCopy)

  expect(todos).toEqual({
    filteredItems: [{ id: '1', text: 'text 1', completed: false }],
    filter: TodoFilter.Uncompleted,
    totalCount: 2,
    uncompletedCount: 1
  })
  expect(Object.is(todos, selectTodos(stateCopy))).toBe(true)
})

test('throws "Unknown filter" error', () => {
  const stateCopy = {
    ...state,
    filter: {
      current: 0
    }
  }

  expect(() => selectTodos(stateCopy)).toThrow('Unknown filter: 0')
})
