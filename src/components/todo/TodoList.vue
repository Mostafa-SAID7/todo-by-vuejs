<script setup lang="ts">
/**
 * TodoList Component
 * Container for todo items with scrolling
 */

import type { Todo } from '@/types/todo'

interface Props {
  todos: Todo[]
  isDark?: boolean
  maxHeight?: string
}

withDefaults(defineProps<Props>(), {
  maxHeight: 'calc(100vh - 24rem)',
})

defineEmits<{
  'todo:toggle': [id: number]
  'todo:edit': [todo: Todo]
  'todo:delete': [todo: Todo]
}>()
</script>

<template>
  <div
    :style="{ maxHeight }"
    class="space-y-3 overflow-y-auto"
  >
    <slot>
      <div
        v-for="todo in todos"
        :key="todo.id"
      >
        <div
          :class="[
            'flex items-center justify-between p-4 rounded-lg shadow-md transition-colors',
            isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100',
          ]"
        >
          <!-- Content will be filled by parent component -->
        </div>
      </div>
    </slot>
  </div>
</template>
