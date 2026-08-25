/**
 * UI configuration constants
 * Centralized styling and layout constants
 */

export const CONTAINER_MAX_WIDTH = 'max-w-2xl'
export const CONTAINER_PADDING = 'px-4 py-8'

/**
 * Button size configuration
 */
export const BUTTON_SIZES = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
}

/**
 * Button variant colors for light theme
 */
export const BUTTON_VARIANTS_LIGHT = {
  primary: 'bg-blue-500 text-white hover:bg-blue-400',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  danger: 'bg-red-500 text-white hover:bg-red-400',
  success: 'bg-green-500 text-white hover:bg-green-400',
}

/**
 * Button variant colors for dark theme
 */
export const BUTTON_VARIANTS_DARK = {
  primary: 'bg-blue-600 text-white hover:bg-blue-500',
  secondary: 'bg-gray-700 text-white hover:bg-gray-600',
  danger: 'bg-red-600 text-white hover:bg-red-500',
  success: 'bg-green-600 text-white hover:bg-green-500',
}

/**
 * Input field styling for light theme
 */
export const INPUT_LIGHT =
  'bg-white text-gray-800 border-gray-300 focus:ring-blue-400'

/**
 * Input field styling for dark theme
 */
export const INPUT_DARK =
  'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'

/**
 * Common input classes
 */
export const INPUT_BASE = 'px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors'

/**
 * Card styling for light theme
 */
export const CARD_LIGHT = 'bg-white text-gray-800'

/**
 * Card styling for dark theme
 */
export const CARD_DARK = 'bg-gray-800 text-white'

/**
 * Modal overlay styling
 */
export const MODAL_OVERLAY = 'fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'

/**
 * Modal content sizing
 */
export const MODAL_SIZES = {
  sm: 'w-full max-w-sm',
  md: 'w-full max-w-md',
  lg: 'w-full max-w-lg',
}

/**
 * Transition durations
 */
export const TRANSITIONS = {
  fast: 'duration-150',
  normal: 'duration-300',
  slow: 'duration-500',
}

/**
 * Z-index configuration
 */
export const Z_INDEX = {
  dropdown: 'z-10',
  modal: 'z-50',
  tooltip: 'z-20',
}

/**
 * Spacing scale
 */
export const SPACING = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}
