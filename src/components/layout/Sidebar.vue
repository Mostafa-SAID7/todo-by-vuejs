<script setup lang="ts">
/**
 * Sidebar Component
 * Left vertical navigation with collapsible menu items
 * Fully responsive - collapses on mobile
 */

import {
  ListTodo,
  CheckCircle2,
  Clock,
  AlertCircle,
  Settings,
  LogOut,
} from 'lucide-vue-next'

interface Props {
  isOpen?: boolean
  isMobile?: boolean
  isDark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  isMobile: false,
  isDark: false,
})

const emit = defineEmits<{
  close: []
  navigate: [section: string]
}>()

const menuItems = [
  {
    id: 'all',
    label: 'All Tasks',
    icon: ListTodo,
  },
  {
    id: 'completed',
    label: 'Completed',
    icon: CheckCircle2,
  },
  {
    id: 'overdue',
    label: 'Overdue',
    icon: Clock,
  },
  {
    id: 'priority',
    label: 'High Priority',
    icon: AlertCircle,
  },
]

const handleNavigate = (section: string) => {
  emit('navigate', section)
  if (props.isMobile) {
    emit('close')
  }
}
</script>

<template>
  <!-- Sidebar Overlay (Mobile) -->
  <div
    v-if="props.isMobile && props.isOpen"
    class="fixed inset-0 bg-black/50 z-40 md:hidden"
    @click="$emit('close')"
  />

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed md:static top-0 left-0 h-screen z-50',
      'w-64 md:w-20 lg:w-64',
      'transition-transform duration-300 ease-out',
      'flex flex-col',
      'bg-[var(--bg-secondary)] border-r border-[var(--border-primary)]',
      {
        'translate-x-0': props.isOpen || !props.isMobile,
        '-translate-x-full': !props.isOpen && props.isMobile,
      },
    ]"
  >
    <!-- Sidebar Header -->
    <div
      class="flex items-center justify-between px-4 py-6 border-b border-[var(--border-accent)]"
    >
      <!-- Logo -->
      <div
        :class="[
          'flex items-center justify-center w-10 h-10 rounded-lg',
          'bg-[var(--accent-primary)]',
          'font-bold text-white text-lg',
          'hidden lg:flex',
          'shadow-lg',
        ]"
      >
        ✓
      </div>

      <!-- Close Button (Mobile) -->
      <button
        v-if="isMobile"
        class="md:hidden text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
        @click="$emit('close')"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Menu Items -->
    <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-2">
      <button
        v-for="item in menuItems"
        :key="item.id"
        :class="[
          'w-full flex items-center gap-4 px-3 py-3 rounded-lg',
          'text-[var(--text-secondary)] hover:text-[var(--accent-primary)]',
          'hover:bg-[var(--accent-bg)] transition-all duration-200',
          'lg:flex md:justify-center lg:justify-start',
          'focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]',
        ]"
        @click="handleNavigate(item.id)"
      >
        <component :is="item.icon" :size="20" />
        <span class="hidden lg:inline text-sm font-medium">
          {{ item.label }}
        </span>
      </button>
    </nav>

    <!-- Sidebar Footer -->
    <div
      class="border-t border-[var(--border-accent)] px-3 py-4 space-y-2"
    >
      <!-- Settings Button -->
      <button
        :class="[
          'w-full flex items-center gap-4 px-3 py-3 rounded-lg',
          'text-[var(--accent-light)] hover:text-[var(--accent-primary)]',
          'hover:bg-[var(--accent-bg)] transition-all duration-200',
          'lg:flex md:justify-center lg:justify-start',
          'focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]',
        ]"
      >
        <Settings :size="20" />
        <span class="hidden lg:inline text-sm font-medium">Settings</span>
      </button>

      <!-- Logout Button -->
      <button
        :class="[
          'w-full flex items-center gap-4 px-3 py-3 rounded-lg',
          'text-[var(--accent-primary)] hover:text-white',
          'hover:bg-[var(--accent-primary)] transition-all duration-200',
          'lg:flex md:justify-center lg:justify-start',
          'focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]',
        ]"
      >
        <LogOut :size="20" />
        <span class="hidden lg:inline text-sm font-medium">Logout</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
/* Smooth scrollbar for sidebar */
aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

aside::-webkit-scrollbar-thumb {
  background: var(--text-tertiary);
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}
</style>
