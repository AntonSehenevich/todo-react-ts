import { useSelector, useDispatch } from 'react-redux'
import {
  addTodo,
  editTodoText,
  deleteTodo,
  toggleTodo,
  reorderTodos,
  deleteCompletedTodos
} from '../../store/slices/todos'
import { setFilter } from '../../store/slices/filter'
import selectTodos from '../../store/selectors'
import Header from './header'
import ItemsList from './items-list'
import Footer from './footer'

import styles from './index.module.scss'

type Props = {
  className?: string
}

export default function Todos({ className }: Props) {
  const dispatch = useDispatch()
  const state = useSelector(selectTodos)

  return (
    <div className={className}>
      <Header addTodo={text => dispatch(addTodo(text))} />
      {state.totalCount > 0 && (
        <>
          <div className={styles.content}>
            <ItemsList
              todos={state.filteredItems}
              editTodo={todo => dispatch(editTodoText(todo))}
              deleteTodo={id => dispatch(deleteTodo(id))}
              toggleTodo={id => dispatch(toggleTodo(id))}
              reorderTodos={todos => dispatch(reorderTodos(todos))}
            />
            <Footer
              uncompletedCount={state.uncompletedCount}
              filter={state.filter}
              deleteCompletedTodos={() => dispatch(deleteCompletedTodos())}
              setFilter={filter => dispatch(setFilter(filter))}
            />
          </div>
          <p className={styles.hint}>Drag and drop to reorder list</p>
        </>
      )}
    </div>
  )
}
