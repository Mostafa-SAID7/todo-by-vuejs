/**
 * useFilter Composable
 * Manages todo filtering and sorting
 */

import { ref, computed } from 'vue'
import type { Todo, FilterStatus, SortOption } from '@/types/todo'
import { todoService } from '@/services/todoService'

export function useFilter(todos: { value: Todo[] }) {
  const filterStatus = ref<FilterStatus>('all')
  const sortBy = ref<SortOption>('dueDate')

  /**
   * Get filtered and sorted todos
   */
  const filteredAndSortedTodos = computed(() => {
    let filtered = todoService.filter(todos.value, filterStatus.value)
    return todoService.sort(filtered, sortBy.value)
  })

  /**
   * Set filter status
   */
  const setFilterStatus = (status: FilterStatus): void => {
    filterStatus.value = status
  }

  /**
   * Set sort option
   */
  const setSortBy = (sort: SortOption): void => {
    sortBy.value = sort
  }

  /**
   * Reset filters to defaults
   */
  const resetFilters = (): void => {
    filterStatus.value = 'all'
    sortBy.value = 'dueDate'
  }

  return {
    filterStatus,
    sortBy,
    filteredAndSortedTodos,
    setFilterStatus,
    setSortBy,
    resetFilters,
  }
}
