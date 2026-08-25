/**
 * Sort options configuration
 */

import type { SortOption } from '@/types/todo'

export const SORT_OPTIONS: Record<SortOption, { label: string; value: SortOption }> = {
  dueDate: {
    label: 'todo.sort.dueDate',
    value: 'dueDate',
  },
  priority: {
    label: 'todo.sort.priority',
    value: 'priority',
  },
  category: {
    label: 'todo.sort.category',
    value: 'category',
  },
}

export const SORT_OPTION_KEYS = Object.keys(SORT_OPTIONS) as SortOption[]
