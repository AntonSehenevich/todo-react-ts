import {
  AnyAction,
  Dispatch,
  TypedStartListening,
  createListenerMiddleware
} from '@reduxjs/toolkit'
import { MiddlewareList, StoreState } from '..'

type AppStartListening = TypedStartListening<StoreState, Dispatch<AnyAction>>

export default function setupWithStateChangedListener(
  middlewares: MiddlewareList,
  handleStateChanged: (state: StoreState) => void
): MiddlewareList {
  const listenerMiddleware = createListenerMiddleware()
  const startAppListening =
    listenerMiddleware.startListening as AppStartListening

  startAppListening({
    predicate: (_, currentState, previousState) =>
      currentState !== previousState,
    effect: (_, listenerApi) => {
      const state = listenerApi.getState()

      handleStateChanged(state)
    }
  })

  return middlewares.prepend(listenerMiddleware.middleware)
}
