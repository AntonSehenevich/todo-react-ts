import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './components/app'
import reportWebVitals from './reportWebVitals'
import setupStore from './store'
import setupWithStateChangedListener from './store/utils/state-changed-listener'
import StateRepository from './store/persistence/repository'

import './styles/main.scss'

const store = setupStore(StateRepository.getState(), middlewares =>
  setupWithStateChangedListener(middlewares, state =>
    StateRepository.updateState(state)
  )
)
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
