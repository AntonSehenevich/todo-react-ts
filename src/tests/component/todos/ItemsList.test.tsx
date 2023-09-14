import { render, fireEvent, screen } from '@testing-library/react'
import ItemsList from '../../../components/todos/items-list'

test('renders empty', () => {
  render(
    <ItemsList
      todos={[]}
      editTodo={jest.fn()}
      deleteTodo={jest.fn()}
      toggleTodo={jest.fn()}
      reorderTodos={jest.fn()}
    />
  )

  const list = screen.getByText('', { selector: 'ul' })

  expect(list).toBeInTheDocument()
})

test('renders one todo', () => {
  const todo = {
    id: '1',
    text: 'text',
    completed: false
  }

  render(
    <ItemsList
      todos={[todo]}
      editTodo={jest.fn()}
      deleteTodo={jest.fn()}
      toggleTodo={jest.fn()}
      reorderTodos={jest.fn()}
    />
  )

  const item = screen.getByText(/text/i)

  expect(item).toBeInTheDocument()
})

test('renders many todos', () => {
  render(
    <ItemsList
      todos={[
        {
          id: '1',
          text: 'text',
          completed: false
        },
        {
          id: '2',
          text: 'text',
          completed: false
        }
      ]}
      editTodo={jest.fn()}
      deleteTodo={jest.fn()}
      toggleTodo={jest.fn()}
      reorderTodos={jest.fn()}
    />
  )

  const items = screen.getAllByText(/text/i)

  expect(items).toHaveLength(2)
})

test('edits todo', () => {
  const editTodoMock = jest.fn()
  const todo = {
    id: '1',
    text: 'text',
    completed: false
  }

  render(
    <ItemsList
      todos={[todo]}
      editTodo={editTodoMock}
      deleteTodo={jest.fn()}
      toggleTodo={jest.fn()}
      reorderTodos={jest.fn()}
    />
  )

  const item = screen.getByText(/text/i)

  fireEvent.click(item)

  const input = screen.getByDisplayValue(/text/i)

  fireEvent.change(input, { target: { value: 'edited text' } })
  fireEvent.keyDown(input, { keyCode: 13 })

  expect(editTodoMock).toBeCalledTimes(1)
  expect(editTodoMock).toBeCalledWith({ id: '1', text: 'edited text' })
})

test('deletes todo', () => {
  const deleteTodoMock = jest.fn()
  const todo = {
    id: '1',
    text: 'text',
    completed: false
  }

  render(
    <ItemsList
      todos={[todo]}
      editTodo={jest.fn()}
      deleteTodo={deleteTodoMock}
      toggleTodo={jest.fn()}
      reorderTodos={jest.fn()}
    />
  )

  const icon = screen.getByTestId('close-icon')

  fireEvent.click(icon)

  expect(deleteTodoMock).toBeCalledTimes(1)
  expect(deleteTodoMock).toBeCalledWith('1')
})

test('toggles todo', () => {
  const toggleTodoMock = jest.fn()
  const todo = {
    id: '1',
    text: 'text',
    completed: false
  }

  render(
    <ItemsList
      todos={[todo]}
      editTodo={jest.fn()}
      deleteTodo={jest.fn()}
      toggleTodo={toggleTodoMock}
      reorderTodos={jest.fn()}
    />
  )

  const icon = screen.getByTestId('circle-icon')

  fireEvent.click(icon)

  expect(toggleTodoMock).toBeCalledTimes(1)
  expect(toggleTodoMock).toBeCalledWith('1')
})

test('reorders todo', () => {
  const reorderTodosMock = jest.fn()

  render(
    <ItemsList
      todos={[
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
      ]}
      editTodo={jest.fn()}
      deleteTodo={jest.fn()}
      toggleTodo={jest.fn()}
      reorderTodos={reorderTodosMock}
    />
  )

  const firstItem = screen.getByText(/text 1/i)
  const secondItem = screen.getByText(/text 2/i)

  fireEvent.dragStart(firstItem)
  fireEvent.dragEnter(secondItem)
  fireEvent.dragEnd(firstItem)

  expect(reorderTodosMock).toBeCalledTimes(1)
  expect(reorderTodosMock).toBeCalledWith({ source: '1', destination: '2' })
})
