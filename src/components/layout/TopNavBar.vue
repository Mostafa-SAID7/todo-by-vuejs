<script setup lang="ts">
/**
 * TopNavBar Component
 * Horizontal header navigation with smooth theme/language controls
 * Fully responsive with hamburger menu on mobile
 * Uses Motion library for professional animations
 */

import { ref } from 'vue'
import { Menu, Moon, Sun, Globe, Search } from 'lucide-vue-next'
import { animate } from 'motion'
import Button from '@/components/ui/Button.vue'

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

const themeIconRef = ref<SVGElement | null>(null)

const handleThemeToggle = async () => {
  // Animate icon rotation with Motion library
  if (themeIconRef.value) {
    await animate(
      themeIconRef.value,
      { rotate: [0, 360] },
      { duration: 0.6, easing: 'ease-out' }
    )
  }
  emit('toggleTheme')
}

const handleLanguageToggle = () => {
  // Simple animation for language toggle
  const langBtn = document.querySelector('[data-lang-btn]') as HTMLElement
  if (langBtn) {
    animate(
      langBtn,
      { rotate: [0, 10, -10, 0] },
      { duration: 0.4, easing: 'ease-out' }
    )
  }
  emit('toggleLanguage')
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
          data-lang-btn
          :class="[
            'p-2.5 rounded-lg transition-all duration-200',
            'text-[var(--text-primary)] hover:text-[var(--accent-primary)]',
            'hover:bg-[var(--accent-bg)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]',
          ]"
          :aria-label="`Switch to ${currentLanguage === 'en' ? 'Arabic' : 'English'}`"
          @click="handleLanguageToggle"
        >
          <Globe :size="24" />
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
            ref="themeIconRef"
            :is="isDark ? Sun : Moon"
            :size="24"
            class="transition-transform duration-300"
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
