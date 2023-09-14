import { createSelector } from 'reselect'
import { StoreState } from '..'
import { TodoFilter, TodoList } from '../../data-structures'

type State = {
  filteredItems: TodoList
  filter: TodoFilter
  totalCount: number
  uncompletedCount: number
}

const getTodos = (state: StoreState): TodoList => state.todos.items
const getFilter = (state: StoreState): TodoFilter => state.filter.current

export default createSelector([getTodos, getFilter], (todos, filter) => {
  const state: State = {
    filteredItems: [],
    filter,
    totalCount: todos.length,
    uncompletedCount: todos.reduce(
      (counter, todo) => (todo.completed ? counter : counter + 1),
      0
    )
  }

  switch (state.filter) {
    case TodoFilter.All:
      state.filteredItems = todos
      break
    case TodoFilter.Completed:
      state.filteredItems = todos.filter(todo => todo.completed)
      break
    case TodoFilter.Uncompleted:
      state.filteredItems = todos.filter(todo => !todo.completed)
      break
    default:
      throw new Error(`Unknown filter: ${state.filter}`)
  }

  return state
})
