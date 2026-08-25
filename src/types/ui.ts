/**
 * UI and presentation types
 */

export type ThemeMode = 'light' | 'dark'
export type Language = 'en' | 'ar'

/**
 * Modal state configuration
 */
export interface ModalState {
  isOpen: boolean
  data?: any
}

/**
 * Edit mode state
 */
export interface EditState {
  isEditing: boolean
  todoId?: number
}

/**
 * Button variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'
export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * UI theme colors
 */
export interface ThemeColors {
  primary: string
  secondary: string
  danger: string
  success: string
  warning: string
}
