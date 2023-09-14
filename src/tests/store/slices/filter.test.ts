import { TodoFilter } from '../../../data-structures'
import reducer, { setFilter } from '../../../store/slices/filter'

test('returns the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    current: TodoFilter.All
  })
})

test('"setFilter" action changes current filter', () => {
  const previousState = {
    current: TodoFilter.All
  }

  expect(reducer(previousState, setFilter(TodoFilter.Completed))).toEqual({
    current: TodoFilter.Completed
  })
})
