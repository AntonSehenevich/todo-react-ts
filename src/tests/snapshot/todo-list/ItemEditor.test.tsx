import renderer from 'react-test-renderer'
import ItemEditor from '../../../components/todos/item-editor'

test('renders correctly', () => {
  const tree = renderer
    .create(
      <ItemEditor
        handleDragStart={jest.fn()}
        handleDragEnter={jest.fn()}
        handleDragEnd={jest.fn()}
        item={{ id: '', text: '', completed: false }}
        deleteItem={jest.fn()}
        editItem={jest.fn()}
        toggleItem={jest.fn()}
      />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
