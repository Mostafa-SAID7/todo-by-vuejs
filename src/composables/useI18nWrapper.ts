/**
 * useI18nWrapper Composable
 * Wrapper around vue-i18n for consistent usage
 */

import { ref, watch } from 'vue'
import { useI18n as vueUseI18n } from 'vue-i18n'
import type { Language } from '@/types/ui'
import { storageService } from '@/services/storageService'

const LOCALE_KEY = 'locale'

export function useI18nWrapper() {
  const { t, locale } = vueUseI18n()
  const currentLanguage = ref<Language>('en')

  /**
   * Initialize i18n from localStorage
   */
  const initializeLanguage = (): void => {
    const savedLocale = storageService.getItem(LOCALE_KEY)

    if (savedLocale === 'en' || savedLocale === 'ar') {
      currentLanguage.value = savedLocale as Language
      locale.value = savedLocale
    } else {
      currentLanguage.value = 'en'
      locale.value = 'en'
    }

    updateDocumentDirection()
  }

  /**
   * Update document direction based on language (RTL for Arabic)
   */
  const updateDocumentDirection = (): void => {
    const isArabic = currentLanguage.value === 'ar'
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
  }

  /**
   * Switch language
   */
  const switchLanguage = (lang: Language): void => {
    currentLanguage.value = lang
    locale.value = lang
  }

  /**
   * Toggle between English and Arabic
   */
  const toggleLanguage = (): void => {
    const newLang = currentLanguage.value === 'en' ? 'ar' : 'en'
    switchLanguage(newLang)
  }

  /**
   * Get current language
   */
  const getCurrentLanguage = (): Language => {
    return currentLanguage.value
  }

  /**
   * Watch language changes and persist to localStorage
   */
  watch(currentLanguage, (newLang) => {
    storageService.setItem(LOCALE_KEY, newLang)
    updateDocumentDirection()
  })

  return {
    t,
    locale: currentLanguage,
    initializeLanguage,
    switchLanguage,
    toggleLanguage,
    getCurrentLanguage,
  }
}
