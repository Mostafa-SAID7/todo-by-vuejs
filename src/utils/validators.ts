/**
 * Validation utilities
 * Input validation helpers
 */

/**
 * Validate todo text
 */
export function validateTodoText(text: string): boolean {
  const trimmed = text.trim()
  return trimmed.length > 0 && trimmed.length <= 500
}

/**
 * Validate category
 */
export function validateCategory(category: string): boolean {
  return category.length === 0 || (category.length > 0 && category.length <= 50)
}

/**
 * Validate date format (YYYY-MM-DD)
 */
export function validateDateFormat(date: string): boolean {
  if (!date) return true // Date is optional

  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(date)) return false

  const dateObj = new Date(date)
  return dateObj instanceof Date && !isNaN(dateObj.getTime())
}

/**
 * Sanitize input text
 */
export function sanitizeInput(text: string): string {
  return text.trim().replace(/\s+/g, ' ')
}
