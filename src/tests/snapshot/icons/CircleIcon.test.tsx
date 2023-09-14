import renderer from 'react-test-renderer'
import CircleIcon from '../../../components/icons/circle'

test('renders correctly', () => {
  const tree = renderer
    .create(<CircleIcon width={10} height={10} handleClick={jest.fn()} />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
