<script setup lang="ts">
/**
 * Badge Component
 * Reusable badge/tag component with professional colors
 */

interface Props {
  text: string
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
  isDark?: boolean
  removable?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  size: 'md',
  isDark: false,
  removable: false,
})

defineEmits<{
  remove: []
}>()

const variantClasses = {
  primary: 'bg-dash-orange/15 text-dash-orange',
  secondary: 'bg-gray-100 dark:bg-white/10 text-dash-text dark:text-dash-darktext',
  success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  danger: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
}

const sizeClasses = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-2.5 py-1.5',
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors',
      sizeClasses[size],
      variantClasses[variant],
    ]"
  >
    {{ text }}
    <button
      v-if="removable"
      type="button"
      class="ml-1 hover:opacity-70 transition-opacity focus:outline-none"
      @click="$emit('remove')"
    >
      ✕
    </button>
  </span>
</template>
