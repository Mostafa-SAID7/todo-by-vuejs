/**
 * Priority levels configuration
 * Centralized priority constants with color mappings
 */

import type { PriorityLevel } from '@/types/todo'

export const PRIORITY_LEVELS: Record<PriorityLevel, { label: string; weight: number }> = {
  low: {
    label: 'todo.priority.low',
    weight: 0,
  },
  medium: {
    label: 'todo.priority.medium',
    weight: 1,
  },
  high: {
    label: 'todo.priority.high',
    weight: 2,
  },
}

/**
 * Priority colors for light theme
 */
export const PRIORITY_COLORS_LIGHT: Record<PriorityLevel, string> = {
  low: 'bg-green-200 text-green-800',
  medium: 'bg-yellow-200 text-yellow-800',
  high: 'bg-red-200 text-red-800',
}

/**
 * Priority colors for dark theme
 */
export const PRIORITY_COLORS_DARK: Record<PriorityLevel, string> = {
  low: 'bg-green-900 text-green-200',
  medium: 'bg-yellow-900 text-yellow-200',
  high: 'bg-red-900 text-red-200',
}

/**
 * Get priority color based on theme
 */
export const getPriorityColor = (priority: PriorityLevel, isDark: boolean): string => {
  return isDark ? PRIORITY_COLORS_DARK[priority] : PRIORITY_COLORS_LIGHT[priority]
}

/**
 * Get priority weight for sorting
 */
export const getPriorityWeight = (priority: PriorityLevel): number => {
  return PRIORITY_LEVELS[priority].weight
}

/**
 * Sort priorities in descending order (high to low)
 */
export const comparePriorities = (a: PriorityLevel, b: PriorityLevel): number => {
  return getPriorityWeight(b) - getPriorityWeight(a)
}
