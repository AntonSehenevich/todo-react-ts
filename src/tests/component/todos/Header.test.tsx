import { render, fireEvent, screen } from '@testing-library/react'
import Header from '../../../components/todos/header'

test('adds todo', () => {
  const handleAddTodoMock = jest.fn()

  render(<Header addTodo={handleAddTodoMock} />)

  const input = screen.getByDisplayValue('')

  fireEvent.change(input, { target: { value: 'text' } })
  fireEvent.keyDown(input, { keyCode: 13 })

  expect(handleAddTodoMock).toBeCalledTimes(1)
  expect(handleAddTodoMock).toBeCalledWith('text')
})

test('adds todo with whitespaces trim', () => {
  const handleAddTodoMock = jest.fn()

  render(<Header addTodo={handleAddTodoMock} />)

  const input = screen.getByDisplayValue('')

  fireEvent.change(input, { target: { value: '   text   ' } })
  fireEvent.keyDown(input, { keyCode: 13 })

  expect(handleAddTodoMock).toBeCalledTimes(1)
  expect(handleAddTodoMock).toBeCalledWith('text')
})

test('does not add todo', () => {
  const handleAddTodoMock = jest.fn()

  render(<Header addTodo={handleAddTodoMock} />)

  const input = screen.getByDisplayValue('')

  fireEvent.keyDown(input, { keyCode: 13 })

  expect(handleAddTodoMock).not.toBeCalled()
})
