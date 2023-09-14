import React, { useState } from 'react'
import Item from './item'

export interface WithDragAndDropProps {
  handleDragStart: () => void
  handleDragEnter: () => void
  handleDragEnd: () => void
}

export interface EditableComponentProps {
  onEditStateChanged: (isEdit: boolean) => void
}

export default function withDragAndDrop<
  P extends WithDragAndDropProps = WithDragAndDropProps,
  C extends EditableComponentProps = EditableComponentProps
>(Component: React.ComponentType<C>) {
  function ComponentWithDragAndDrop({
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    ...rest
  }: P & Omit<C, keyof EditableComponentProps>) {
    const [isDraggable, setIsDraggable] = useState(true)
    const wrappedProps = {
      ...rest,
      onEditStateChanged: (isEdit: boolean) => setIsDraggable(!isEdit)
    }

    return (
      <Item
        draggable={isDraggable}
        handleDragStart={handleDragStart}
        handleDragEnter={handleDragEnter}
        handleDragEnd={handleDragEnd}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...(wrappedProps as unknown as C)} />
      </Item>
    )
  }

  ComponentWithDragAndDrop.displayName = `WithDragAndDrop(${
    Component.displayName || Component.name
  })`

  return ComponentWithDragAndDrop
}
