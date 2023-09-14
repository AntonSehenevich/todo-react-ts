import renderer from 'react-test-renderer'
import ItemsList from '../../../components/todos/items-list'

test('renders correctly', () => {
  const tree = renderer
    .create(
      <ItemsList
        todos={[]}
        editTodo={jest.fn()}
        deleteTodo={jest.fn()}
        toggleTodo={jest.fn()}
        reorderTodos={jest.fn()}
      />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
