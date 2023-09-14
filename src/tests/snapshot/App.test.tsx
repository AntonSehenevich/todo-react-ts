import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import App from '../../components/app'
import setupStore from '../../store'

test('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={setupStore()}>
        <App />
      </Provider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
