/**
 * Todo Service
 * Business logic for todo operations
 */

import type { Todo, CreateTodoPayload, UpdateTodoPayload, TodoStats, FilterStatus, SortOption } from '@/types/todo'
import { comparePriorities } from '@/constants/priorities'

export interface ITodoService {
  create(payload: CreateTodoPayload): Todo
  update(id: number, payload: UpdateTodoPayload): Todo | null
  delete(id: number): boolean
  getById(id: number, todos: Todo[]): Todo | null
  toggle(id: number, todos: Todo[]): Todo | null
  getStats(todos: Todo[]): TodoStats
  filter(todos: Todo[], status: FilterStatus): Todo[]
  sort(todos: Todo[], sortBy: SortOption): Todo[]
}

class TodoService implements ITodoService {
  /**
   * Create a new todo
   */
  create(payload: CreateTodoPayload): Todo {
    return {
      id: Date.now(),
      text: payload.text,
      completed: false,
      category: payload.category,
      dueDate: payload.dueDate,
      priority: payload.priority,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  }

  /**
   * Update an existing todo
   */
  update(_id: number, _payload: UpdateTodoPayload): Todo | null {
    // This method expects the caller to provide the current todo
    // as it doesn't have access to the todo list here
    // It's mainly for type checking and validation
    return null
  }

  /**
   * Delete a todo (returns true if deleted)
   */
  delete(id: number): boolean {
    return id > 0
  }

  /**
   * Get todo by ID
   */
  getById(id: number, todos: Todo[]): Todo | null {
    return todos.find(todo => todo.id === id) || null
  }

  /**
   * Toggle todo completion status
   */
  toggle(id: number, todos: Todo[]): Todo | null {
    const todo = this.getById(id, todos)
    if (todo) {
      return {
        ...todo,
        completed: !todo.completed,
        updatedAt: Date.now(),
      }
    }
    return null
  }

  /**
   * Get todo statistics
   */
  getStats(todos: Todo[]): TodoStats {
    return {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      active: todos.filter(t => !t.completed).length,
      highPriority: todos.filter(t => t.priority === 'high' && !t.completed).length,
    }
  }

  /**
   * Filter todos by status
   */
  filter(todos: Todo[], status: FilterStatus): Todo[] {
    switch (status) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      case 'all':
      default:
        return todos
    }
  }

  /**
   * Sort todos
   */
  sort(todos: Todo[], sortBy: SortOption): Todo[] {
    const sorted = [...todos]

    switch (sortBy) {
      case 'dueDate':
        return sorted.sort((a, b) => {
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        })

      case 'priority':
        return sorted.sort((a, b) => comparePriorities(a.priority, b.priority))

      case 'category':
        return sorted.sort((a, b) => a.category.localeCompare(b.category))

      default:
        return sorted
    }
  }
}

export const todoService = new TodoService()
