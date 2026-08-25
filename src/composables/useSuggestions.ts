/**
 * useSuggestions Composable
 * Manages todo suggestions and translations
 */

import { ref } from 'vue'
import type { Suggestion } from '@/types/todo'
import { suggestionService } from '@/services/suggestionService'
import { translateService } from '@/services/translateService'

export function useSuggestions() {
  const suggestions = ref<Suggestion[]>([])
  const showSuggestions = ref(false)
  const isTranslating = ref(false)
  const translation = ref('')

  /**
   * Get suggestions for input
   */
  const getSuggestions = async (input: string): Promise<void> => {
    if (input.length <= 2) {
      suggestions.value = []
      showSuggestions.value = false
      return
    }

    try {
      suggestions.value = await suggestionService.getSuggestions(input)
      showSuggestions.value = suggestions.value.length > 0
    } catch (error) {
      console.error('Error getting suggestions:', error)
      suggestions.value = []
    }
  }

  /**
   * Get translation for text
   */
  const getTranslation = async (text: string, targetLang: string): Promise<void> => {
    try {
      isTranslating.value = true
      translation.value = await translateService.translate(text, targetLang)
    } catch (error) {
      console.error('Error translating:', error)
      translation.value = ''
    } finally {
      isTranslating.value = false
    }
  }

  /**
   * Select a suggestion
   */
  const selectSuggestion = (): void => {
    showSuggestions.value = false
  }

  /**
   * Clear suggestions
   */
  const clearSuggestions = (): void => {
    suggestions.value = []
    showSuggestions.value = false
  }

  /**
   * Clear translation
   */
  const clearTranslation = (): void => {
    translation.value = ''
  }

  /**
   * Clear all suggestions and translations
   */
  const clearAll = (): void => {
    clearSuggestions()
    clearTranslation()
  }

  return {
    suggestions,
    showSuggestions,
    isTranslating,
    translation,
    getSuggestions,
    getTranslation,
    selectSuggestion,
    clearSuggestions,
    clearTranslation,
    clearAll,
  }
}
