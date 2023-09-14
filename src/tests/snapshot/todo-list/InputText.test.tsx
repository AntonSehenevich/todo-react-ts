import renderer from 'react-test-renderer'
import TextInput from '../../../components/todos/text-input'

test('renders correctly', () => {
  const tree = renderer.create(<TextInput onSave={jest.fn()} />).toJSON()

  expect(tree).toMatchSnapshot()
})
