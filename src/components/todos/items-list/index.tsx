import { useRef } from 'react'
import ItemEditor from '../item-editor'
import {
  EditTodoParams,
  ReorderTodosParams,
  TodoList
} from '../../../data-structures'

type Props = {
  todos: TodoList
  editTodo: (editTodoParams: EditTodoParams) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  reorderTodos: (reorderTodosParams: ReorderTodosParams) => void
}

export default function ItemsList({
  todos,
  editTodo,
  deleteTodo,
  toggleTodo,
  reorderTodos
}: Props) {
  const dndSource = useRef<string | null>(null)
  const dndDestination = useRef<string | null>(null)

  return (
    <ul data-testid="todos-list">
      {todos.map(todo => (
        <ItemEditor
          key={todo.id}
          handleDragStart={() => {
            dndSource.current = todo.id
          }}
          handleDragEnter={() => {
            dndDestination.current = todo.id
          }}
          handleDragEnd={() => {
            const source = dndSource.current
            const destination = dndDestination.current

            dndSource.current = null
            dndDestination.current = null

            reorderTodos({ source: source!, destination: destination! })
          }}
          item={todo}
          editItem={(id: string, text: string) => editTodo({ id, text })}
          deleteItem={(id: string) => deleteTodo(id)}
          toggleItem={(id: string) => toggleTodo(id)}
        />
      ))}
    </ul>
  )
}
