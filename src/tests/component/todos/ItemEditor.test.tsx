import { render, fireEvent, screen } from '@testing-library/react'
import ItemEditor from '../../../components/todos/item-editor'

import styles from '../../../components/todos/item-editor/index.module.scss'

test('renders active item properly', () => {
  render(
    <ItemEditor
      handleDragStart={jest.fn()}
      handleDragEnter={jest.fn()}
      handleDragEnd={jest.fn()}
      item={{ id: '', text: 'text', completed: false }}
      editItem={jest.fn()}
      deleteItem={jest.fn()}
      toggleItem={jest.fn()}
    />
  )

  const icon = screen.getByTestId('circle-icon')
  const button = screen.getByText(/text/i)

  expect(icon).toBeInTheDocument()
  expect(button).toHaveClass(styles.text)
})

test('renders completed item properly', () => {
  render(
    <ItemEditor
      handleDragStart={jest.fn()}
      handleDragEnter={jest.fn()}
      handleDragEnd={jest.fn()}
      item={{ id: '', text: 'text', completed: true }}
      editItem={jest.fn()}
      deleteItem={jest.fn()}
      toggleItem={jest.fn()}
    />
  )

  const icon = screen.getByTestId('checked-circle-icon')
  const button = screen.getByText(/text/i)

  expect(icon).toBeInTheDocument()
  expect(button).toHaveClass(styles.completed)
})

test('toggles item (active)', () => {
  const handleToggleItem = jest.fn()

  render(
    <ItemEditor
      handleDragStart={jest.fn()}
      handleDragEnter={jest.fn()}
      handleDragEnd={jest.fn()}
      item={{ id: '1', text: 'text', completed: false }}
      editItem={jest.fn()}
      deleteItem={jest.fn()}
      toggleItem={handleToggleItem}
    />
  )

  const icon = screen.getByTestId('circle-icon')

  fireEvent.click(icon)

  expect(handleToggleItem).toBeCalledTimes(1)
  expect(handleToggleItem).toBeCalledWith('1')
})

test('toggles item (completed)', () => {
  const handleToggleItem = jest.fn()

  render(
    <ItemEditor
      handleDragStart={jest.fn()}
      handleDragEnter={jest.fn()}
      handleDragEnd={jest.fn()}
      item={{ id: '1', text: 'text', completed: true }}
      editItem={jest.fn()}
      deleteItem={jest.fn()}
      toggleItem={handleToggleItem}
    />
  )

  const icon = screen.getByTestId('checked-circle-icon')

  fireEvent.click(icon)

  expect(handleToggleItem).toBeCalledTimes(1)
  expect(handleToggleItem).toBeCalledWith('1')
})

test('deletes item', () => {
  const handleDeleteItem = jest.fn()

  render(
    <ItemEditor
      handleDragStart={jest.fn()}
      handleDragEnter={jest.fn()}
      handleDragEnd={jest.fn()}
      item={{ id: '1', text: 'text', completed: false }}
      editItem={jest.fn()}
      deleteItem={handleDeleteItem}
      toggleItem={jest.fn()}
    />
  )

  const icon = screen.getByTestId('close-icon')

  fireEvent.click(icon)

  expect(handleDeleteItem).toBeCalledTimes(1)
  expect(handleDeleteItem).toBeCalledWith('1')
})

test('enters edit mode', () => {
  render(
    <ItemEditor
      handleDragStart={jest.fn()}
      handleDragEnter={jest.fn()}
      handleDragEnd={jest.fn()}
      item={{ id: '', text: 'text', completed: false }}
      editItem={jest.fn()}
      deleteItem={jest.fn()}
      toggleItem={jest.fn()}
    />
  )

  const button = screen.getByText(/text/i)

  fireEvent.click(button)

  const input = screen.getByDisplayValue(/text/i)

  expect(input).toBeInstanceOf(HTMLInputElement)
})

test('edits item', () => {
  const handleEditItem = jest.fn()

  render(
    <ItemEditor
      handleDragStart={jest.fn()}
      handleDragEnter={jest.fn()}
      handleDragEnd={jest.fn()}
      item={{ id: '1', text: 'text', completed: false }}
      editItem={handleEditItem}
      deleteItem={jest.fn()}
      toggleItem={jest.fn()}
    />
  )

  const button = screen.getByText(/text/i)

  fireEvent.click(button)

  const input = screen.getByDisplayValue(/text/i)

  fireEvent.keyDown(input, { keyCode: 13 })

  expect(handleEditItem).toBeCalledTimes(1)
  expect(handleEditItem).toBeCalledWith('1', 'text')
})
