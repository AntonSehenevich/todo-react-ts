import { render, fireEvent, screen } from '@testing-library/react'
import Footer from '../../../components/todos/footer'
import { TodoFilter } from '../../../data-structures'

test('renders items left (1 item)', () => {
  render(
    <Footer
      filter={TodoFilter.All}
      uncompletedCount={1}
      deleteCompletedTodos={jest.fn()}
      setFilter={jest.fn()}
    />
  )

  const textBlock = screen.getByText(/1 item left/i)

  expect(textBlock).toBeInTheDocument()
})

test('renders items left (0 items)', () => {
  render(
    <Footer
      filter={TodoFilter.All}
      uncompletedCount={0}
      deleteCompletedTodos={jest.fn()}
      setFilter={jest.fn()}
    />
  )

  const textBlock = screen.getByText(/0 items left/i)

  expect(textBlock).toBeInTheDocument()
})

test('sets filter', () => {
  const setFilterMock = jest.fn()
  render(
    <Footer
      filter={TodoFilter.All}
      uncompletedCount={0}
      deleteCompletedTodos={jest.fn()}
      setFilter={setFilterMock}
    />
  )

  const filter = screen.getByText(/All/i)

  fireEvent.click(filter)

  expect(setFilterMock).toBeCalledTimes(1)
  expect(setFilterMock).toBeCalledWith(TodoFilter.All)
})

test('deletes completed todos', () => {
  const deleteCompletedTodosMock = jest.fn()

  render(
    <Footer
      filter={TodoFilter.All}
      uncompletedCount={0}
      deleteCompletedTodos={deleteCompletedTodosMock}
      setFilter={jest.fn()}
    />
  )

  const button = screen.getByText(/Clear completed/i)

  fireEvent.click(button)

  expect(deleteCompletedTodosMock).toBeCalledTimes(1)
})
