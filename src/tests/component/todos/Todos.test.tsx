import { fireEvent, screen } from '@testing-library/react'
import renderWithProviders from '../../utils/redux-utils'
import setupStore from '../../../store'
import Todos from '../../../components/todos'
import { TodoFilter } from '../../../data-structures'

test('renders todos', () => {
  renderWithProviders(<Todos />, {
    preloadedState: {
      todos: {
        items: [
          {
            id: '1',
            text: 'text',
            completed: false
          },
          {
            id: '2',
            text: 'text',
            completed: false
          },
          {
            id: '3',
            text: 'text',
            completed: false
          }
        ]
      }
    }
  })

  const items = screen.getAllByText(/text/i)

  expect(items).toHaveLength(3)
})

test('adds todo', () => {
  const store = setupStore()

  renderWithProviders(<Todos />, {
    store
  })

  const input = screen.getByDisplayValue('')

  fireEvent.change(input, { target: { value: 'text' } })
  fireEvent.keyDown(input, { keyCode: 13 })

  const {
    todos: { items }
  } = store.getState()

  expect(items).toHaveLength(1)
  expect(items[0]).toEqual({
    id: expect.any(String),
    text: 'text',
    completed: false
  })
})

test('edits todo', () => {
  const store = setupStore({
    todos: {
      items: [
        {
          id: '1',
          text: 'text',
          completed: false
        }
      ]
    }
  })

  renderWithProviders(<Todos />, {
    store
  })

  const editor = screen.getByText(/text/i)

  fireEvent.click(editor)

  const input = screen.getByDisplayValue(/text/i)

  fireEvent.change(input, { target: { value: 'edited text' } })
  fireEvent.keyDown(input, { keyCode: 13 })

  const {
    todos: { items }
  } = store.getState()

  expect(items[0]).toEqual({
    id: expect.any(String),
    text: 'edited text',
    completed: false
  })
})

test('toggles todo', () => {
  const store = setupStore({
    todos: {
      items: [
        {
          id: '1',
          text: 'text',
          completed: false
        }
      ]
    }
  })

  renderWithProviders(<Todos />, {
    store
  })

  const icon = screen.getByTestId('circle-icon')

  fireEvent.click(icon)

  const {
    todos: { items }
  } = store.getState()

  expect(items[0]).toEqual({
    id: '1',
    text: 'text',
    completed: true
  })
})

test('deletes todo', () => {
  const store = setupStore({
    todos: {
      items: [
        {
          id: '1',
          text: 'text',
          completed: false
        }
      ]
    }
  })

  renderWithProviders(<Todos />, {
    store
  })

  const icon = screen.getByTestId('close-icon')

  fireEvent.click(icon)

  const {
    todos: { items }
  } = store.getState()

  expect(items).toHaveLength(0)
})

test('reorders todos', () => {
  const store = setupStore({
    todos: {
      items: [
        {
          id: '1',
          text: 'text 1',
          completed: false
        },
        {
          id: '2',
          text: 'text 2',
          completed: false
        }
      ]
    }
  })

  renderWithProviders(<Todos />, {
    store
  })

  const firstTodo = screen.getByText(/text 1/i)
  const secondTodo = screen.getByText(/text 2/i)

  fireEvent.dragStart(firstTodo)
  fireEvent.dragEnter(secondTodo)
  fireEvent.dragEnd(firstTodo)

  const {
    todos: { items }
  } = store.getState()

  expect(items).toEqual([
    {
      id: '2',
      text: 'text 2',
      completed: false
    },
    {
      id: '1',
      text: 'text 1',
      completed: false
    }
  ])
})

test('deletes completed todos', () => {
  const store = setupStore({
    todos: {
      items: [
        {
          id: '1',
          text: 'text 1',
          completed: true
        },
        {
          id: '2',
          text: 'text 2',
          completed: false
        }
      ]
    }
  })

  renderWithProviders(<Todos />, {
    store
  })

  const button = screen.getByText(/Clear completed/i)

  fireEvent.click(button)

  const {
    todos: { items }
  } = store.getState()

  expect(items).toEqual([
    {
      id: '2',
      text: 'text 2',
      completed: false
    }
  ])
})

test('sets filter', () => {
  const store = setupStore({
    todos: {
      items: [
        {
          id: '1',
          text: 'text 1',
          completed: true
        }
      ]
    },
    filter: {
      current: TodoFilter.All
    }
  })

  renderWithProviders(<Todos />, {
    store
  })

  const button = screen.getByText('Completed')

  fireEvent.click(button)

  const {
    filter: { current }
  } = store.getState()

  expect(current).toBe(TodoFilter.Completed)
})
