/**
 * useLocalStorage Composable
 * Handles persistent storage of todos and app state
 */

import { watch } from 'vue'
import type { Todo } from '@/types/todo'
import { storageService } from '@/services/storageService'

const TODOS_KEY = 'todos'

export function useLocalStorage() {
  /**
   * Load todos from localStorage
   */
  const loadTodos = (): Todo[] => {
    const saved = storageService.getObject<Todo[]>(TODOS_KEY)
    return saved || []
  }

  /**
   * Save todos to localStorage
   */
  const saveTodos = (todos: Todo[]): void => {
    storageService.setObject(TODOS_KEY, todos)
  }

  /**
   * Setup auto-save watcher for todos
   */
  const setupAutoSave = (todosRef: { value: Todo[] }): void => {
    watch(
      () => todosRef.value,
      (newTodos) => {
        saveTodos(newTodos)
      },
      { deep: true }
    )
  }

  /**
   * Clear all saved data
   */
  const clearStorage = (): void => {
    storageService.clear()
  }

  return {
    loadTodos,
    saveTodos,
    setupAutoSave,
    clearStorage,
  }
}
