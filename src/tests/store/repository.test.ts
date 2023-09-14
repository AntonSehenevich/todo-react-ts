import StateRepository from '../../store/persistence/repository'
import { TodoFilter } from '../../data-structures'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn()
}

beforeAll(() => {
  Object.defineProperty(global, '_localStorage', {
    value: localStorageMock
  })
})

const stateMock = {
  todos: {
    items: [
      {
        id: '1',
        text: 'text',
        completed: false
      }
    ]
  },
  filter: {
    current: TodoFilter.All
  }
}

test('gets state', () => {
  localStorageMock.getItem = jest.fn(key =>
    key === 'STATE' ? JSON.stringify(stateMock) : null
  )
  const state = StateRepository.getState()

  expect(state).toEqual(stateMock)
})

test('gets state when storage is empty', () => {
  const state = StateRepository.getState()

  expect(state).toBeUndefined()
})

test('sets state', () => {
  localStorageMock.setItem = jest.fn()

  StateRepository.updateState(stateMock)

  expect(localStorageMock.setItem).toBeCalledTimes(1)
  expect(localStorageMock.setItem).toBeCalledWith(
    'STATE',
    JSON.stringify(stateMock)
  )
})
