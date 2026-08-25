<script setup lang="ts">
/**
 * TodoEmpty Component
 * Empty state when no todos exist with icon
 */

import { CheckCircle2 } from 'lucide-vue-next'
import { useI18nWrapper } from '@/composables'

interface Props {
  isDark?: boolean
}

defineProps<Props>()

const { t } = useI18nWrapper()
</script>

<template>
  <div
    :class="[
      'flex flex-col items-center justify-center py-12',
    ]"
  >
    <div class="mb-4">
      <CheckCircle2
        :size="64"
        :class="[
          'text-[var(--accent-primary)]',
        ]"
      />
    </div>
    <p
      :class="[
        'text-lg font-medium',
        'text-[var(--text-secondary)]',
      ]"
    >
      {{ t('todo.empty') || 'No todos yet. Create one to get started!' }}
    </p>
  </div>
</template>
