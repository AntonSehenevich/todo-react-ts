import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import Todos from '../../../components/todos'
import setupStore from '../../../store'

test('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={setupStore()}>
        <Todos />
      </Provider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
