import renderer from 'react-test-renderer'
import CloseIcon from '../../../components/icons/close'

test('renders correctly', () => {
  const tree = renderer
    .create(<CloseIcon width={10} height={10} handleClick={jest.fn()} />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
