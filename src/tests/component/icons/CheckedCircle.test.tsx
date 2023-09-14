import { render, fireEvent, screen } from '@testing-library/react'
import CheckedCircleIcon from '../../../components/icons/checked-circle'

test('handles click properly', () => {
  const handleClickMock = jest.fn()

  render(
    <CheckedCircleIcon width={10} height={10} handleClick={handleClickMock} />
  )

  const icon = screen.getByTestId('checked-circle-icon')

  fireEvent.click(icon)

  expect(handleClickMock).toBeCalledTimes(1)
})
