<script setup lang="ts">
/**
 * TopNavBar Component
 * Horizontal header navigation with smooth theme/language controls
 * Fully responsive with hamburger menu on mobile
 */

import { ref } from 'vue'
import { Menu, Moon, Sun, Globe, Search } from 'lucide-vue-next'

interface Props {
  isMobile?: boolean
  isDark?: boolean
  currentLanguage?: string
  title?: string
}

withDefaults(defineProps<Props>(), {
  isMobile: false,
  isDark: false,
  currentLanguage: 'en',
  title: 'Tasks',
})

const emit = defineEmits<{
  toggleSidebar: []
  toggleTheme: []
  toggleLanguage: []
  search: [query: string]
}>()

const isThemeToggling = ref(false)
const isLangToggling = ref(false)

const handleThemeToggle = () => {
  isThemeToggling.value = true
  emit('toggleTheme')
  // Reset after animation completes
  setTimeout(() => {
    isThemeToggling.value = false
  }, 600)
}

const handleLanguageToggle = () => {
  isLangToggling.value = true
  emit('toggleLanguage')
  // Reset after animation completes
  setTimeout(() => {
    isLangToggling.value = false
  }, 400)
}
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-40',
      'bg-[var(--bg-primary)] border-b border-[var(--border-accent)]',
      'px-4 md:px-6 py-4',
      'shadow-sm',
    ]"
  >
    <div class="flex items-center justify-between gap-4">
      <!-- Left Section: Hamburger + Title -->
      <div class="flex items-center gap-4 min-w-0">
        <!-- Hamburger Menu (Mobile) -->
        <button
          class="md:hidden p-2 hover:bg-[var(--bg-hover)] rounded-lg transition-colors"
          aria-label="Toggle sidebar"
          @click="$emit('toggleSidebar')"
        >
          <Menu :size="24" class="text-[var(--text-primary)]" />
        </button>

        <!-- Title -->
        <h1
          class="text-xl md:text-2xl font-bold text-[var(--text-primary)] truncate"
        >
          {{ title }}
        </h1>
      </div>

      <!-- Right Section: Search + Controls -->
      <div class="flex items-center gap-3">
        <!-- Search Bar (Hidden on Mobile) -->
        <div
          class="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--accent-bg)] border border-[var(--border-accent)] transition-all duration-200 hover:border-[var(--accent-light)]"
        >
          <Search :size="18" class="text-[var(--accent-primary)]" />
          <input
            type="text"
            placeholder="Search..."
            class="bg-transparent text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none w-32 text-sm"
            @input="$emit('search', ($event.target as HTMLInputElement).value)"
          />
        </div>

        <!-- Language Toggle - Icon Only -->
        <button
          :class="[
            'p-2.5 rounded-lg transition-all duration-200',
            'text-[var(--text-primary)] hover:text-[var(--accent-primary)]',
            'hover:bg-[var(--accent-bg)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]',
            isLangToggling ? 'scale-110' : 'scale-100',
          ]"
          :aria-label="`Switch to ${currentLanguage === 'en' ? 'Arabic' : 'English'}`"
          @click="handleLanguageToggle"
        >
          <Globe :size="24" :class="isLangToggling ? 'rotate-12' : ''" />
        </button>

        <!-- Theme Toggle - Icon Only -->
        <button
          :class="[
            'p-2.5 rounded-lg transition-all duration-200',
            'text-[var(--text-primary)] hover:text-[var(--accent-primary)]',
            'hover:bg-[var(--accent-bg)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]',
          ]"
          aria-label="Toggle theme"
          @click="handleThemeToggle"
        >
          <component
            :is="isDark ? Sun : Moon"
            :size="24"
            :class="[
              'transition-transform duration-600 ease-out',
              isThemeToggling ? 'rotate-360' : '',
            ]"
          />
        </button>

        <!-- Mobile Menu (Icons Only) -->
        <div class="sm:hidden flex gap-2">
          <button
            data-lang-btn
            :class="[
              'p-2.5 rounded-lg transition-all duration-200',
              'text-[var(--text-primary)] hover:text-[var(--accent-primary)]',
              'hover:bg-[var(--accent-bg)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]',
            ]"
            aria-label="Change language"
            @click="handleLanguageToggle"
          >
            <Globe :size="24" />
          </button>
          <button
            :class="[
              'p-2.5 rounded-lg transition-all duration-200',
              'text-[var(--text-primary)] hover:text-[var(--accent-primary)]',
              'hover:bg-[var(--accent-bg)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]',
            ]"
            aria-label="Toggle theme"
            @click="handleThemeToggle"
          >
            <component
              :is="isDark ? Sun : Moon"
              :size="24"
              class="transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Smooth transitions */
header {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
</style>
