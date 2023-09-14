import { useEffect, useRef } from 'react'
import TextInput from '../text-input'

import styles from './index.module.scss'

type Props = {
  addTodo: (text: string) => void
}

export default function Header({ addTodo }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const onSave = (text: string): void => {
    const tidyText = (text || '').trim()

    if (tidyText.length > 0) {
      addTodo(tidyText)
    }
  }

  useEffect(() => {
    inputRef.current!.focus()
  }, [])

  return (
    <div className={styles.container} data-testid="add-todo">
      <TextInput
        ref={inputRef}
        placeholder="Something to do?"
        disableSaveOnBlur
        onSave={onSave}
      />
    </div>
  )
}
