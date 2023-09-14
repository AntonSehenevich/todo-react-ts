import { render, fireEvent, screen } from '@testing-library/react'
import CircleIcon from '../../../components/icons/circle'

test('handles click properly', () => {
  const handleClickMock = jest.fn()

  render(<CircleIcon width={10} height={10} handleClick={handleClickMock} />)

  const icon = screen.getByTestId('circle-icon')

  fireEvent.click(icon)

  expect(handleClickMock).toBeCalledTimes(1)
})
