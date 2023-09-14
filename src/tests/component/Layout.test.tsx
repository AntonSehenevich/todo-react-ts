import { render, screen } from '@testing-library/react'
import Layout from '../../components/layout'

test('renders layout with text', () => {
  render(
    <Layout>
      <p>text</p>
    </Layout>
  )

  const text = screen.getByText(/text/i)

  expect(text).toBeInTheDocument()
})
