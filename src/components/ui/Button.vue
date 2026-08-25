<script setup lang="ts">
/**
 * Button Component
 * Reusable button with variants and sizes using professional color system
 */

import type { ButtonVariant, ButtonSize } from '@/types/ui'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  isDark?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  icon?: any
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  isDark: false,
  type: 'button',
  fullWidth: false,
  icon: null,
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const sizeClasses = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
}

const variantClasses = {
  primary:
    'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-dark)] active:bg-[var(--accent-darker)]',
  secondary:
    'bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] border border-[var(--border-primary)]',
  danger:
    'bg-[var(--danger-primary)] text-white hover:bg-[var(--danger-light)] active:bg-[var(--danger-primary)]',
  success:
    'bg-[var(--success-primary)] text-white hover:bg-[var(--success-light)] active:bg-[var(--success-primary)]',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'rounded-lg font-medium',
      'active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
      'inline-flex items-center gap-2 justify-center',
      'btn-animated btn-perf',
      sizeClasses[size],
      variantClasses[variant],
      fullWidth ? 'w-full' : '',
    ]"
    @click="$emit('click', $event)"
  >
    <component v-if="icon" :is="icon" :size="20" class="transition-transform duration-300" />
    <slot />
  </button>
</template>
