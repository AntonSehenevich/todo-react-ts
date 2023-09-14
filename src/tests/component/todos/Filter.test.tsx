import { render, fireEvent, screen } from '@testing-library/react'
import Filter from '../../../components/todos/filter'
import { TodoFilter } from '../../../data-structures'

import styles from '../../../components/todos/filter/index.module.scss'

test('renders and handles click properly when filter is "All"', () => {
  const handleClickMock = jest.fn()

  render(<Filter filter={TodoFilter.All} setFilter={handleClickMock} />)

  const button = screen.getByText(/All/i)

  fireEvent.click(button)

  expect(button).toHaveClass(styles.active)
  expect(handleClickMock).toBeCalledTimes(1)
  expect(handleClickMock).toBeCalledWith(TodoFilter.All)
})

test('renders and handles click properly when filter is "Active"', () => {
  const handleClickMock = jest.fn()

  render(<Filter filter={TodoFilter.Uncompleted} setFilter={handleClickMock} />)

  const button = screen.getByText(/Active/i)

  fireEvent.click(button)

  expect(button).toHaveClass(styles.active)
  expect(handleClickMock).toBeCalledTimes(1)
  expect(handleClickMock).toBeCalledWith(TodoFilter.Uncompleted)
})

test('renders and handles click properly when filter is "Completed"', () => {
  const handleClickMock = jest.fn()

  render(<Filter filter={TodoFilter.Completed} setFilter={handleClickMock} />)

  const button = screen.getByText(/Completed/i)

  fireEvent.click(button)

  expect(button).toHaveClass(styles.active)
  expect(handleClickMock).toBeCalledTimes(1)
  expect(handleClickMock).toBeCalledWith(TodoFilter.Completed)
})
