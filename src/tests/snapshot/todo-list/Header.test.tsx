import renderer from 'react-test-renderer'
import Header from '../../../components/todos/header'

test('renders correctly', () => {
  const tree = renderer.create(<Header addTodo={jest.fn()} />).toJSON()

  expect(tree).toMatchSnapshot()
})
