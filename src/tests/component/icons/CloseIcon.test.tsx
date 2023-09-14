import { render, fireEvent, screen } from '@testing-library/react'
import CloseIcon from '../../../components/icons/close'

test('handles click properly', () => {
  const handleClickMock = jest.fn()

  render(<CloseIcon width={10} height={10} handleClick={handleClickMock} />)

  const icon = screen.getByTestId('close-icon')

  fireEvent.click(icon)

  expect(handleClickMock).toBeCalledTimes(1)
})
