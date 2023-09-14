/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TodoFilter } from '../../data-structures'

type FilterSliceState = {
  current: TodoFilter
}

const initialState: FilterSliceState = {
  current: TodoFilter.All
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.current = action.payload
    }
  }
})

export const { setFilter } = filterSlice.actions

export default filterSlice.reducer
