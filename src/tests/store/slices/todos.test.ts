import reducer, {
  addTodo,
  deleteTodo,
  editTodoText,
  toggleTodo,
  deleteCompletedTodos,
  reorderTodos
} from '../../../store/slices/todos'

test('returns the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    items: []
  })
})

test('"addTodo" action adds todo', () => {
  const previousState = {
    items: [
      {
        id: '1',
        text: 'text',
        completed: false
      }
    ]
  }

  expect(reducer(previousState, addTodo('text'))).toEqual({
    items: [
      {
        id: '1',
        text: 'text',
        completed: false
      },
      {
        id: expect.any(String),
        text: 'text',
        completed: false
      }
    ]
  })
})

test('"deleteTodo" action removes todo', () => {
  const previousState = {
    items: [
      {
        id: '1',
        text: 'text',
        completed: false
      }
    ]
  }

  expect(reducer(previousState, deleteTodo('1'))).toEqual({
    items: []
  })
})

test('"editTodoText" action changes todo text', () => {
  const previousState = {
    items: [
      {
        id: '1',
        text: 'text',
        completed: false
      }
    ]
  }

  expect(
    reducer(previousState, editTodoText({ id: '1', text: 'edited text' }))
  ).toEqual({
    items: [
      {
        id: '1',
        text: 'edited text',
        completed: false
      }
    ]
  })
})

test('"toggleTodo" action changes todo status', () => {
  const previousState = {
    items: [
      {
        id: '1',
        text: 'text',
        completed: false
      }
    ]
  }

  expect(reducer(previousState, toggleTodo('1'))).toEqual({
    items: [
      {
        id: '1',
        text: 'text',
        completed: true
      }
    ]
  })
})

test('"deleteCompletedTodos" removes all todos with completed status', () => {
  const previousState = {
    items: [
      {
        id: '1',
        text: 'text',
        completed: true
      },
      {
        id: '2',
        text: 'text',
        completed: false
      }
    ]
  }

  expect(reducer(previousState, deleteCompletedTodos())).toEqual({
    items: [
      {
        id: '2',
        text: 'text',
        completed: false
      }
    ]
  })
})

test('"reorderTodos" action changes todos order (1-st to 2-nd)', () => {
  const previousState = {
    items: [
      {
        id: '1',
        text: 'text 1',
        completed: false
      },
      {
        id: '2',
        text: 'text 2',
        completed: false
      },
      {
        id: '3',
        text: 'text 3',
        completed: false
      }
    ]
  }

  expect(
    reducer(previousState, reorderTodos({ source: '1', destination: '2' }))
  ).toEqual({
    items: [
      {
        id: '2',
        text: 'text 2',
        completed: false
      },
      {
        id: '1',
        text: 'text 1',
        completed: false
      },
      {
        id: '3',
        text: 'text 3',
        completed: false
      }
    ]
  })
})

test('"reorderTodos" action changes todos order (2-nd to 1-st)', () => {
  const previousState = {
    items: [
      {
        id: '1',
        text: 'text 1',
        completed: false
      },
      {
        id: '2',
        text: 'text 2',
        completed: false
      },
      {
        id: '3',
        text: 'text 3',
        completed: false
      }
    ]
  }

  expect(
    reducer(previousState, reorderTodos({ source: '2', destination: '1' }))
  ).toEqual({
    items: [
      {
        id: '2',
        text: 'text 2',
        completed: false
      },
      {
        id: '1',
        text: 'text 1',
        completed: false
      },
      {
        id: '3',
        text: 'text 3',
        completed: false
      }
    ]
  })
})

test('"reorderTodos" action does not change todos order', () => {
  const previousState = {
    items: [
      {
        id: '1',
        text: 'text 1',
        completed: false
      },
      {
        id: '2',
        text: 'text 2',
        completed: false
      }
    ]
  }

  expect(
    reducer(previousState, reorderTodos({ source: '1', destination: '1' }))
  ).toEqual({
    items: [
      {
        id: '1',
        text: 'text 1',
        completed: false
      },
      {
        id: '2',
        text: 'text 2',
        completed: false
      }
    ]
  })
})
