import renderer from 'react-test-renderer'
import Footer from '../../../components/todos/footer'
import { TodoFilter } from '../../../data-structures'

test('renders correctly', () => {
  const tree = renderer
    .create(
      <Footer
        filter={TodoFilter.All}
        uncompletedCount={1}
        deleteCompletedTodos={jest.fn()}
        setFilter={jest.fn()}
      />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
