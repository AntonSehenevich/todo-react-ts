import { StoreState } from '..'

const STATE_KEY = 'STATE'

export default class StateRepository {
  static getState(): StoreState | undefined {
    const jsonContent = localStorage.getItem(STATE_KEY)

    return jsonContent ? JSON.parse(jsonContent) : undefined
  }

  static updateState(state: StoreState) {
    const jsonContent = JSON.stringify(state)

    localStorage.setItem(STATE_KEY, jsonContent)
  }
}
