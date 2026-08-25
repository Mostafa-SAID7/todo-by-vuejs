<script setup lang="ts">
/**
 * Modal Component
 * Base modal/dialog component
 */

import { MODAL_OVERLAY, MODAL_SIZES, CARD_LIGHT, CARD_DARK } from '@/constants/ui'

interface Props {
  isOpen: boolean
  size?: 'sm' | 'md' | 'lg'
  isDark?: boolean
  title?: string
  showCloseButton?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  isDark: false,
  showCloseButton: true,
})

defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      :class="[
        'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50',
        'color-transition',
      ]"
      @click.self="$emit('close')"
    >
      <div
        :class="[
          'relative p-6 rounded-2xl shadow-2xl',
          'bg-[var(--bg-primary)] border border-[var(--border-accent)]',
          'color-transition',
          MODAL_SIZES[size],
        ]"
      >
        <!-- Close Button -->
        <button
          v-if="showCloseButton"
          type="button"
          :class="[
            'absolute top-4 right-4',
            'text-[var(--text-tertiary)] hover:text-[var(--accent-primary)]',
            'transition-colors duration-300',
          ]"
          @click="$emit('close')"
        >
          ✕
        </button>

        <!-- Title -->
        <h2
          v-if="title"
          :class="[
            'text-2xl font-bold mb-6',
            'text-[var(--text-primary)] color-transition',
          ]"
        >
          {{ title }}
        </h2>

        <!-- Content Slot -->
        <slot />
      </div>
    </div>
  </Teleport>
</template>
