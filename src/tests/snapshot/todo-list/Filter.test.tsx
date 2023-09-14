import renderer from 'react-test-renderer'
import Filter from '../../../components/todos/filter'
import { TodoFilter } from '../../../data-structures'

test('renders correctly', () => {
  const tree = renderer
    .create(<Filter filter={TodoFilter.All} setFilter={jest.fn()} />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
