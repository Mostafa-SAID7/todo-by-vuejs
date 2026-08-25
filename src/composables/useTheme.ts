/**
 * useTheme Composable
 * Manages theme (dark/light mode) state and persistence
 */

import { ref, watch } from 'vue'
import type { ThemeMode } from '@/types/ui'
import { storageService } from '@/services/storageService'

const DARK_MODE_KEY = 'darkMode'

export function useTheme() {
  const isDark = ref<boolean>(false)

  /**
   * Initialize theme from localStorage or system preference
   */
  const initializeTheme = (): void => {
    const savedTheme = storageService.getItem(DARK_MODE_KEY)

    if (savedTheme === 'true') {
      isDark.value = true
      applyTheme('dark')
    } else if (savedTheme === 'false') {
      isDark.value = false
      applyTheme('light')
    } else {
      // Use system preference if no saved theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
      applyTheme(prefersDark ? 'dark' : 'light')
    }
  }

  /**
   * Toggle theme
   */
  const toggleTheme = (): void => {
    isDark.value = !isDark.value
  }

  /**
   * Set specific theme
   */
  const setTheme = (theme: ThemeMode): void => {
    isDark.value = theme === 'dark'
  }

  /**
   * Apply theme to DOM
   */
  const applyTheme = (theme: ThemeMode): void => {
    const html = document.documentElement

    if (theme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  /**
   * Watch theme changes and persist to localStorage
   */
  watch(isDark, (newValue) => {
    storageService.setItem(DARK_MODE_KEY, String(newValue))
    // Add slight delay to ensure CSS transitions are ready
    requestAnimationFrame(() => {
      applyTheme(newValue ? 'dark' : 'light')
    })
  })

  /**
   * Get current theme mode
   */
  const getCurrentTheme = (): ThemeMode => {
    return isDark.value ? 'dark' : 'light'
  }

  return {
    isDark,
    initializeTheme,
    toggleTheme,
    setTheme,
    getCurrentTheme,
  }
}
