/**
 * Date utilities
 * Date formatting and calculation helpers
 */

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
  if (!date) return ''

  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Check if date is today
 */
export function isToday(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const today = new Date()

  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  )
}

/**
 * Check if date is overdue
 */
export function isOverdue(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return dateObj < today
}

/**
 * Get relative date string (Today, Tomorrow, Yesterday, etc)
 */
export function getRelativeDateString(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (isToday(dateObj)) return 'Today'
  if (
    dateObj.getDate() === tomorrow.getDate() &&
    dateObj.getMonth() === tomorrow.getMonth() &&
    dateObj.getFullYear() === tomorrow.getFullYear()
  ) {
    return 'Tomorrow'
  }
  if (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  ) {
    return 'Yesterday'
  }

  return formatDate(dateObj)
}
