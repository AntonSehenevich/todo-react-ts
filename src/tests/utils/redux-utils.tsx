import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import React from 'react'
import setupStore, { StoreState } from '../../store'

type Options = object & {
  preloadedState?: Partial<StoreState>
  store?: ReturnType<typeof setupStore>
}

type WrapperProps = {
  children?: React.ReactNode
}

export default function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = undefined,
    store = setupStore(preloadedState),
    ...renderOptions
  }: Options = {}
) {
  function Wrapper({ children }: WrapperProps) {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
