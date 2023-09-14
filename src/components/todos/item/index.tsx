import styles from './index.module.scss'

type Props = {
  children?: React.ReactNode
  draggable?: boolean
  handleDragStart: () => void
  handleDragEnter: () => void
  handleDragEnd: () => void
}

export default function Item({
  children,
  draggable = true,
  handleDragStart,
  handleDragEnter,
  handleDragEnd
}: Props) {
  return (
    <li
      className={styles.item}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragEnd={handleDragEnd}
      onDragOver={e => {
        e.preventDefault()
      }}
    >
      {children}
    </li>
  )
}
