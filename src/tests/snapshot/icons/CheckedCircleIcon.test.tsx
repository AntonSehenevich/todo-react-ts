import renderer from 'react-test-renderer'
import CheckedCircleIcon from '../../../components/icons/checked-circle'

test('renders correctly', () => {
  const tree = renderer
    .create(
      <CheckedCircleIcon width={10} height={10} handleClick={jest.fn()} />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
