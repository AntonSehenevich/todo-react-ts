import { render, fireEvent, screen } from '@testing-library/react'
import Item from '../../../components/todos/item'

test('renders internal content properly', () => {
  render(
    <Item
      handleDragStart={jest.fn()}
      handleDragEnter={jest.fn()}
      handleDragEnd={jest.fn()}
    >
      text
    </Item>
  )

  const item = screen.getByText(/text/i)

  expect(item).toBeInTheDocument()
})

test('trigger events properly', () => {
  const handleDragStart = jest.fn()
  const handleDragEnter = jest.fn()
  const handleDragEnd = jest.fn()

  render(
    <Item
      handleDragStart={handleDragStart}
      handleDragEnter={handleDragEnter}
      handleDragEnd={handleDragEnd}
    >
      text
    </Item>
  )

  const item = screen.getByText(/text/i)

  fireEvent.dragStart(item)
  fireEvent.dragEnter(item)
  fireEvent.dragEnd(item)
  const isPrevented = fireEvent.dragOver(item)

  expect(handleDragStart).toBeCalledTimes(1)
  expect(handleDragEnter).toBeCalledTimes(1)
  expect(handleDragEnd).toBeCalledTimes(1)
  expect(isPrevented).toBe(false)
})
