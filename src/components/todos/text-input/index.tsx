import React, { forwardRef, useState } from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

const ENTER_KEY = 'Enter'

type Props = {
  className?: string
  text?: string
  placeholder?: string
  disableSaveOnBlur?: boolean
  onSave: (text: string) => void
}

const TextInput = forwardRef(function TextInput(
  {
    className,
    text,
    placeholder = '',
    disableSaveOnBlur = false,
    onSave
  }: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const [value, setValue] = useState(text || '')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ENTER_KEY) {
      onSave(value)
      setValue('')
    }
  }
  const handleBlur = () => {
    if (!disableSaveOnBlur) {
      onSave(value)
      setValue('')
    }
  }

  return (
    <input
      type="text"
      ref={ref}
      className={classNames(styles.input, className)}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  )
})

export default TextInput
