import renderer from 'react-test-renderer'
import Logo from '../../components/header/logo'

test('renders correctly', () => {
  const tree = renderer.create(<Logo width={10} height={10} />).toJSON()

  expect(tree).toMatchSnapshot()
})
