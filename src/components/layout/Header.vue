<script setup lang="ts">
/**
 * Header Component
 * Application header with theme and language toggles with icons
 */

import { Moon, Sun, Globe } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

interface Props {
  isDark?: boolean
  currentLanguage?: string
}

withDefaults(defineProps<Props>(), {
  isDark: false,
  currentLanguage: 'en',
})

defineEmits<{
  toggleTheme: []
  toggleLanguage: []
}>()
</script>

<template>
  <div
    :class="[
      'flex justify-between items-center gap-4 mb-8',
      'flex-wrap sm:flex-nowrap',
    ]"
  >
    <!-- Title -->
    <h1
      :class="[
        'text-3xl font-bold',
        'text-[var(--text-primary)]',
      ]"
    >
      <slot name="title">My Todos</slot>
    </h1>

    <!-- Controls -->
    <div class="flex gap-3">
      <!-- Language Toggle -->
      <Button
        variant="secondary"
        :icon="Globe"
        :is-dark="isDark"
        @click="$emit('toggleLanguage')"
      >
        {{ currentLanguage === 'en' ? 'العربية' : 'English' }}
      </Button>

      <!-- Theme Toggle -->
      <Button
        variant="secondary"
        :icon="isDark ? Sun : Moon"
        :is-dark="isDark"
        @click="$emit('toggleTheme')"
      />
    </div>
  </div>
</template>
