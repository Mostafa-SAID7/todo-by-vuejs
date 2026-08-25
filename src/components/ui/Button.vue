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
    'bg-dash-orange text-white hover:bg-dash-orange/90 active:scale-[0.98]',
  secondary:
    'bg-dash-dark/5 dark:bg-white/10 text-dash-text dark:text-dash-darktext hover:bg-dash-dark/10 dark:hover:bg-white/20 border border-dash-dark/10 dark:border-white/5',
  danger:
    'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
  success:
    'bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-750',
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
