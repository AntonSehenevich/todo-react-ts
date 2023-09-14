import renderer from 'react-test-renderer'
import Item from '../../../components/todos/item'

test('renders correctly', () => {
  const tree = renderer
    .create(
      <Item
        handleDragStart={jest.fn()}
        handleDragEnter={jest.fn()}
        handleDragEnd={jest.fn()}
      />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
