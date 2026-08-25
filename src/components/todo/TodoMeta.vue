<script setup lang="ts">
/**
 * TodoMeta Component
 * Displays todo metadata (category, due date, priority)
 */

import type { PriorityLevel } from '@/types/todo'
import Badge from '@/components/ui/Badge.vue'
import { formatDate } from '@/utils/date'
import { useI18nWrapper } from '@/composables'

interface Props {
  category?: string
  dueDate?: string
  priority: PriorityLevel
  isDark?: boolean
}

defineProps<Props>()

const { t } = useI18nWrapper()
</script>

<template>
  <div class="flex gap-2 flex-wrap mt-2">
    <!-- Category Badge -->
    <Badge
      v-if="category"
      :text="category"
      variant="secondary"
      size="sm"
      :is-dark="isDark"
    />

    <!-- Due Date Badge -->
    <Badge
      v-if="dueDate"
      :text="`${t('todo.dueDate', { date: formatDate(dueDate) })}`"
      variant="secondary"
      size="sm"
      :is-dark="isDark"
    />

    <!-- Priority Badge -->
    <Badge
      :text="t(`todo.priority.${priority}`)"
      :variant="priority === 'high' ? 'danger' : priority === 'medium' ? 'warning' : 'success'"
      size="sm"
      :is-dark="isDark"
    />
  </div>
</template>
