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
  primary: 'bg-[var(--accent-bg)] text-[var(--accent-primary)]',
  secondary: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]',
  success: 'bg-[var(--success-bg)] text-[var(--success-primary)]',
  warning: 'bg-[var(--warning-bg)] text-[var(--warning-primary)]',
  danger: 'bg-[var(--danger-bg)] text-[var(--danger-primary)]',
  info: 'bg-[var(--info-bg)] text-[var(--info-primary)]',
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
