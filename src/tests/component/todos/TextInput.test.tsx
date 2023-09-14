import { render, fireEvent, screen } from '@testing-library/react'
import TextInput from '../../../components/todos/text-input'

test('renders properly', () => {
  const className = 'class'
  const placeholder = 'placeholder'

  render(
    <TextInput
      className={className}
      placeholder={placeholder}
      text="text"
      onSave={jest.fn()}
    />
  )

  const input = screen.getByDisplayValue(/text/i)

  expect(input).toBeInTheDocument()
  expect(input).toHaveClass(`input ${className}`)
  expect(input).toHaveAttribute('placeholder', placeholder)
})

test('renders properly (only required fields)', () => {
  render(<TextInput onSave={jest.fn()} />)

  const input = screen.getByDisplayValue('')

  expect(input).toBeInTheDocument()
  expect(input).toHaveClass('input')
  expect(input).toHaveAttribute('placeholder', '')
})

test('saves ("Enter" key)', () => {
  const handleOnSave = jest.fn()

  render(<TextInput onSave={handleOnSave} />)

  const input = screen.getByDisplayValue('')

  fireEvent.change(input, { target: { value: 'text' } })
  fireEvent.keyDown(input, { keyCode: 13 })

  expect(handleOnSave).toBeCalledTimes(1)
  expect(handleOnSave).toBeCalledWith('text')
})

test('saves (onBlur)', () => {
  const handleOnSave = jest.fn()

  render(<TextInput onSave={handleOnSave} />)

  const input = screen.getByDisplayValue('')

  fireEvent.change(input, { target: { value: 'text' } })
  fireEvent.blur(input)

  expect(handleOnSave).toBeCalledTimes(1)
  expect(handleOnSave).toBeCalledWith('text')
})

test('does not save (not "Enter" key)', () => {
  const handleOnSave = jest.fn()

  render(<TextInput onSave={handleOnSave} />)

  const input = screen.getByDisplayValue('')

  fireEvent.change(input, { target: { value: 'text' } })
  fireEvent.keyDown(input, { keyCode: 1 })

  expect(handleOnSave).not.toBeCalled()
})

test('does not save (onBlur)', () => {
  const handleOnSave = jest.fn()

  render(<TextInput disableSaveOnBlur onSave={handleOnSave} />)

  const input = screen.getByDisplayValue('')

  fireEvent.change(input, { target: { value: 'text' } })
  fireEvent.blur(input)

  expect(handleOnSave).not.toBeCalled()
})
