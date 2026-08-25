/**
 * Suggestion Service
 * Handles suggestion/autocomplete operations
 */

import type { Suggestion } from '@/types/todo'

export interface ISuggestionService {
  getSuggestions(input: string): Promise<Suggestion[]>
  getMockSuggestions(input: string): Suggestion[]
}

class SuggestionService implements ISuggestionService {
  /**
   * Get suggestions for input
   * Mock implementation - replace with real API call
   */
  async getSuggestions(input: string): Promise<Suggestion[]> {
    try {
      if (input.length <= 2) {
        return []
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 200))

      return this.getMockSuggestions(input)
    } catch (error) {
      console.error('Error getting suggestions:', error)
      return []
    }
  }

  /**
   * Get mock suggestions based on input
   */
  getMockSuggestions(input: string): Suggestion[] {
    return [
      { text: `${input} today` },
      { text: `${input} tomorrow` },
      { text: `${input} next week` },
    ]
  }
}

export const suggestionService = new SuggestionService()
