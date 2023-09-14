import Filter from '../filter'
import { TodoFilter } from '../../../data-structures'

import styles from './index.module.scss'

type Props = {
  uncompletedCount: number
  filter: TodoFilter
  deleteCompletedTodos: () => void
  setFilter: (filter: TodoFilter) => void
}

export default function Footer({
  uncompletedCount,
  filter,
  deleteCompletedTodos,
  setFilter
}: Props) {
  return (
    <div className={styles.container}>
      <div>
        <span>
          {uncompletedCount} {uncompletedCount === 1 ? 'item' : 'items'} left
        </span>
      </div>
      <div>
        <Filter filter={filter} setFilter={value => setFilter(value)} />
      </div>
      <div>
        <button
          type="button"
          className={styles['delete-completed-button']}
          onClick={deleteCompletedTodos}
        >
          Clear completed
        </button>
      </div>
    </div>
  )
}
