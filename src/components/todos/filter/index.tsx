import classNames from 'classnames'
import { TodoFilter } from '../../../data-structures'

import styles from './index.module.scss'

type Props = {
  filter: TodoFilter
  setFilter: (filter: TodoFilter) => void
}

export default function Filter({ filter, setFilter }: Props) {
  return (
    <ul className={styles.list} data-testid="todos-filter">
      <li>
        <button
          type="button"
          className={classNames(
            styles.button,
            filter === TodoFilter.All ? styles.active : null
          )}
          onClick={() => setFilter(TodoFilter.All)}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={classNames(
            styles.button,
            filter === TodoFilter.Uncompleted ? styles.active : null
          )}
          onClick={() => setFilter(TodoFilter.Uncompleted)}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={classNames(
            styles.button,
            filter === TodoFilter.Completed ? styles.active : null
          )}
          onClick={() => setFilter(TodoFilter.Completed)}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}
