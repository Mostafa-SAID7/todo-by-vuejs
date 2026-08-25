/**
 * Filter options configuration
 */

import type { FilterStatus } from '@/types/todo'

export const FILTER_OPTIONS: Record<FilterStatus, { label: string; value: FilterStatus }> = {
  all: {
    label: 'todo.filter.all',
    value: 'all',
  },
  active: {
    label: 'todo.filter.active',
    value: 'active',
  },
  completed: {
    label: 'todo.filter.completed',
    value: 'completed',
  },
}

export const FILTER_OPTION_KEYS = Object.keys(FILTER_OPTIONS) as FilterStatus[]
