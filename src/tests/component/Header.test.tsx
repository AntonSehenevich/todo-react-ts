import { render, screen } from '@testing-library/react'
import Header from '../../components/header'

test('renders header with title', () => {
  render(<Header />)

  const title = screen.getByText(/TODO/i)
  const logo = screen.getByTestId('logo-icon')

  expect(title).toBeInTheDocument()
  expect(logo).toBeInTheDocument()
})
