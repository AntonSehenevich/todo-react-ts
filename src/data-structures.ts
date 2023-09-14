export enum TodoFilter {
  All = 1,
  Completed,
  Uncompleted
}

export type Todo = {
  id: string
  text: string
  completed: boolean
}

export type TodoList = Todo[]

export type EditTodoParams = Pick<Todo, 'id' | 'text'>

export type ReorderTodosParams = {
  source: string
  destination: string
}
