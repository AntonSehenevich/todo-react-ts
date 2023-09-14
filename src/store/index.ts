import {
  AnyAction,
  Dispatch,
  Middleware,
  MiddlewareArray,
  PreloadedState,
  StateFromReducersMapObject,
  configureStore
} from '@reduxjs/toolkit'
import todosReducer from './slices/todos'
import filterReducer from './slices/filter'

const reducer = {
  todos: todosReducer,
  filter: filterReducer
}

export type StoreState = StateFromReducersMapObject<typeof reducer>
export type MiddlewareList = MiddlewareArray<
  Middleware<object, StoreState, Dispatch<AnyAction>>[]
>

export default function setupStore(
  preloadedState?: PreloadedState<Partial<StoreState>>,
  setupMiddlewares = (middlewares: MiddlewareList) => middlewares
) {
  return configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
      setupMiddlewares(getDefaultMiddleware()),
    preloadedState
  })
}
