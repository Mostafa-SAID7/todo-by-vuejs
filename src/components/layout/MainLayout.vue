<script setup lang="ts">
/**
 * MainLayout Component
 * Main application layout wrapper with responsive sidebar + header
 * Handles all breakpoints and screen sizes
 */

import { onMounted, onUnmounted } from 'vue'
import Sidebar from './Sidebar.vue'
import TopNavBar from './TopNavBar.vue'
import { useMobileMenu } from '@/composables/useMobileMenu'

interface Props {
  isDark?: boolean
  currentLanguage?: string
  title?: string
}

withDefaults(defineProps<Props>(), {
  isDark: false,
  currentLanguage: 'en',
  title: 'Tasks',
})

defineEmits<{
  toggleTheme: []
  toggleLanguage: []
  navigate: [section: string]
  search: [query: string]
}>()

const {
  isSidebarOpen,
  isMobile,
  showSidebar,
  toggleSidebar,
  closeSidebar,
  initializeResizeListener,
  removeResizeListener,
} = useMobileMenu()

onMounted(() => {
  initializeResizeListener()
})

onUnmounted(() => {
  removeResizeListener()
})
</script>

<template>
  <div class="flex h-screen flex-col md:flex-row bg-[var(--bg-primary)] border-t-4 border-[var(--accent-primary)]">
    <!-- Sidebar -->
    <Sidebar
      :is-open="isSidebarOpen"
      :is-mobile="isMobile"
      :is-dark="isDark"
      @close="closeSidebar"
      @navigate="$emit('navigate', $event)"
    />

    <!-- Main Content Area -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Top Navigation Bar -->
      <TopNavBar
        :is-mobile="isMobile"
        :is-dark="isDark"
        :current-language="currentLanguage"
        :title="title"
        @toggle-sidebar="toggleSidebar"
        @toggle-theme="$emit('toggleTheme')"
        @toggle-language="$emit('toggleLanguage')"
        @search="$emit('search', $event)"
      />

      <!-- Main Content -->
      <main
        class="flex-1 overflow-y-auto"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Layout wrapper */
div {
  background-color: var(--bg-primary);
}

/* Smooth color transitions */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* Main content scrollbar */
main::-webkit-scrollbar {
  width: 10px;
}

main::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

main::-webkit-scrollbar-thumb {
  background: var(--text-tertiary);
  border-radius: 5px;
}

main::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}
</style>
