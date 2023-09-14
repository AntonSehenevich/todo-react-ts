/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import {
  EditTodoParams,
  ReorderTodosParams,
  TodoList
} from '../../data-structures'

type TodosSliceState = {
  items: TodoList
}

const initialState: TodosSliceState = {
  items: []
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: nanoid(),
        text: action.payload,
        completed: false
      })
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(todo => todo.id !== action.payload)
    },
    editTodoText: (state, action: PayloadAction<EditTodoParams>) => {
      const editedTodo = state.items.find(todo => todo.id === action.payload.id)

      editedTodo!.text = action.payload.text
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const toggledTodo = state.items.find(todo => todo.id === action.payload)

      toggledTodo!.completed = !toggledTodo!.completed
    },
    deleteCompletedTodos: state => {
      state.items = state.items.filter(todo => !todo.completed)
    },
    reorderTodos: (state, action: PayloadAction<ReorderTodosParams>) => {
      if (action.payload.source === action.payload.destination) {
        return
      }

      state.items = state.items.reduce<TodoList>(
        (items, todo, itemIndex, originalItems) => {
          if (todo.id !== action.payload.source) {
            if (todo.id === action.payload.destination) {
              const sourceTodo = originalItems.find(
                originalItem => originalItem.id === action.payload.source
              )
              const sourceTodoIndex = originalItems.indexOf(sourceTodo!)

              if (itemIndex < sourceTodoIndex) {
                items.push(sourceTodo!, todo)
              } else {
                items.push(todo, sourceTodo!)
              }
            } else {
              items.push(todo)
            }
          }

          return items
        },
        []
      )
    }
  }
})

export const {
  addTodo,
  deleteTodo,
  editTodoText,
  toggleTodo,
  deleteCompletedTodos,
  reorderTodos
} = todosSlice.actions

export default todosSlice.reducer
