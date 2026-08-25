/**
 * Storage Service
 * Abstracts localStorage operations with a clean API
 */

export interface IStorageService {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
  clear(): void
  getObject<T>(key: string): T | null
  setObject<T>(key: string, value: T): void
}

class StorageService implements IStorageService {
  /**
   * Get item from localStorage
   */
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error)
      return null
    }
  }

  /**
   * Set item in localStorage
   */
  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.error(`Error writing to localStorage: ${key}`, error)
    }
  }

  /**
   * Remove item from localStorage
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error)
    }
  }

  /**
   * Clear all localStorage
   */
  clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage', error)
    }
  }

  /**
   * Get parsed object from localStorage
   */
  getObject<T>(key: string): T | null {
    try {
      const item = this.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error parsing localStorage object: ${key}`, error)
      return null
    }
  }

  /**
   * Set object in localStorage as JSON
   */
  setObject<T>(key: string, value: T): void {
    try {
      this.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error stringifying localStorage object: ${key}`, error)
    }
  }
}

export const storageService = new StorageService()
