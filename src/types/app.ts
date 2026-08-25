/**
 * Application-level types
 */

import type { ThemeMode, Language } from './ui'

/**
 * Application state
 */
export interface AppState {
  theme: ThemeMode
  language: Language
  initialized: boolean
}

/**
 * Local storage data structure
 */
export interface StorageData {
  todos: any[]
  theme: ThemeMode
  language: Language
}
