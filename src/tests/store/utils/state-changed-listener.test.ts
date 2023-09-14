import setupWithStateChangedListener from '../../../store/utils/state-changed-listener'
import setupStore from '../../../store'
import { setFilter } from '../../../store/slices/filter'
import { TodoFilter } from '../../../data-structures'

test('handles state changed', () => {
  const handleStateChangedMock = jest.fn()
  const store = setupStore(undefined, middlewares =>
    setupWithStateChangedListener(middlewares, handleStateChangedMock)
  )

  store.dispatch(setFilter(TodoFilter.Completed))

  expect(handleStateChangedMock).toBeCalledTimes(1)
  expect(handleStateChangedMock).toBeCalledWith({
    todos: {
      items: []
    },
    filter: {
      current: TodoFilter.Completed
    }
  })
})
