/**
 * useTodo Composable
 * Manages todo CRUD operations and state
 */

import { ref, computed } from 'vue'
import type { Todo, CreateTodoPayload, UpdateTodoPayload } from '@/types/todo'
import { todoService } from '@/services/todoService'

export function useTodo() {
  const todos = ref<Todo[]>([])

  /**
   * Add a new todo
   */
  const addTodo = (payload: CreateTodoPayload): Todo => {
    const newTodo = todoService.create(payload)
    todos.value.unshift(newTodo)
    return newTodo
  }

  /**
   * Update an existing todo
   */
  const updateTodo = (id: number, payload: UpdateTodoPayload): boolean => {
    const index = todos.value.findIndex((t: Todo) => t.id === id)
    if (index === -1) return false

    todos.value[index] = {
      ...todos.value[index],
      ...payload,
      updatedAt: Date.now(),
    }
    return true
  }

  /**
   * Delete a todo
   */
  const deleteTodo = (id: number): boolean => {
    const index = todos.value.findIndex((t: Todo) => t.id === id)
    if (index === -1) return false

    todos.value.splice(index, 1)
    return true
  }

  /**
   * Toggle todo completion status
   */
  const toggleTodo = (id: number): boolean => {
    const todo = todos.value.find((t: Todo) => t.id === id)
    if (!todo) return false

    todo.completed = !todo.completed
    todo.updatedAt = Date.now()
    return true
  }

  /**
   * Get todo by ID
   */
  const getTodoById = (id: number): Todo | undefined => {
    return todos.value.find((t: Todo) => t.id === id)
  }

  /**
   * Clear all todos
   */
  const clearAllTodos = (): void => {
    todos.value = []
  }

  /**
   * Clear completed todos
   */
  const clearCompletedTodos = (): void => {
    todos.value = todos.value.filter((t: Todo) => !t.completed)
  }

  /**
   * Get todo statistics
   */
  const stats = computed(() => todoService.getStats(todos.value))

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    getTodoById,
    clearAllTodos,
    clearCompletedTodos,
    stats,
  }
}
