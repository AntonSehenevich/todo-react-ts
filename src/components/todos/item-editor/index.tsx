import { useState } from 'react'
import withDragAndDrop, { EditableComponentProps } from '../with-drag-and-drop'
import CloseIcon from '../../icons/close'
import CircleIcon from '../../icons/circle'
import CheckedCircleIcon from '../../icons/checked-circle'
import TextInput from '../text-input'
import { Todo } from '../../../data-structures'

import styles from './index.module.scss'

interface Props extends EditableComponentProps {
  item: Todo
  editItem: (id: string, text: string) => void
  deleteItem: (id: string) => void
  toggleItem: (id: string) => void
}

function ItemEditor({
  item,
  editItem,
  deleteItem,
  toggleItem,
  onEditStateChanged
}: Props) {
  const [isEdit, setIsEdit] = useState(false)
  const onSave = (text: string): void => {
    setIsEdit(false)
    onEditStateChanged(false)
    editItem(item.id, text)
  }

  return (
    <div className={styles.container}>
      {item.completed ? (
        <CheckedCircleIcon
          width={30}
          height={30}
          handleClick={() => toggleItem(item.id)}
        />
      ) : (
        <CircleIcon
          width={30}
          height={30}
          handleClick={() => toggleItem(item.id)}
        />
      )}
      {isEdit ? (
        <TextInput className={styles.editor} text={item.text} onSave={onSave} />
      ) : (
        <button
          type="button"
          className={item.completed ? styles.completed : styles.text}
          onClick={() => {
            setIsEdit(true)
            onEditStateChanged(true)
          }}
        >
          {item.text}
        </button>
      )}
      <CloseIcon
        className={styles['icon-delete']}
        width={30}
        height={30}
        handleClick={() => deleteItem(item.id)}
      />
    </div>
  )
}

export default withDragAndDrop(ItemEditor)
