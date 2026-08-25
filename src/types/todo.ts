/**
 * Todo domain types and interfaces
 * Single source of truth for todo-related data structures
 */

export type PriorityLevel = 'low' | 'medium' | 'high'
export type FilterStatus = 'all' | 'active' | 'completed'
export type SortOption = 'dueDate' | 'priority' | 'category'

/**
 * Core Todo entity
 */
export interface Todo {
  id: number
  text: string
  completed: boolean
  category: string
  dueDate: string
  priority: PriorityLevel
  createdAt?: number
  updatedAt?: number
}

/**
 * Todo creation payload (without id and timestamps)
 */
export interface CreateTodoPayload {
  text: string
  category: string
  dueDate: string
  priority: PriorityLevel
}

/**
 * Todo update payload (partial)
 */
export interface UpdateTodoPayload {
  text?: string
  completed?: boolean
  category?: string
  dueDate?: string
  priority?: PriorityLevel
}

/**
 * Suggestion for auto-completion
 */
export interface Suggestion {
  text: string
  translation?: string
}

/**
 * Filter and sort configuration
 */
export interface TodoFilters {
  status: FilterStatus
  sortBy: SortOption
}

/**
 * Todo statistics
 */
export interface TodoStats {
  total: number
  completed: number
  active: number
  highPriority: number
}
