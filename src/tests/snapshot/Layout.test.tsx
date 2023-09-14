import renderer from 'react-test-renderer'
import Layout from '../../components/layout'

test('renders correctly', () => {
  const tree = renderer.create(<Layout />).toJSON()

  expect(tree).toMatchSnapshot()
})
