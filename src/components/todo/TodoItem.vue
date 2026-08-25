<script setup lang="ts">
/**
 * TodoItem Component
 * Individual todo item display
 */

import type { Todo } from '@/types/todo'
import Checkbox from '@/components/ui/Checkbox.vue'
import TodoMeta from '@/components/todo/TodoMeta.vue'
import TodoActions from '@/components/todo/TodoActions.vue'

interface Props {
  todo: Todo
  isDark?: boolean
}

defineProps<Props>()

defineEmits<{
  'update:completed': [value: boolean]
  edit: []
  delete: []
}>()
</script>

<template>
  <div
    :class="[
      'flex items-center justify-between p-4 rounded-lg shadow-md transition-colors',
      isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100',
    ]"
  >
    <div class="flex items-center gap-3 flex-1">
      <!-- Checkbox -->
      <Checkbox
        :model-value="todo.completed"
        :is-dark="isDark"
        @update:model-value="$emit('update:completed', $event)"
      />

      <!-- Todo Content -->
      <div class="flex flex-col flex-1">
        <span
          :class="[
            'transition-colors',
            todo.completed ? 'line-through opacity-50' : '',
            isDark ? 'text-white' : 'text-gray-800',
          ]"
        >
          {{ todo.text }}
        </span>

        <!-- Todo Metadata -->
        <TodoMeta
          :category="todo.category"
          :due-date="todo.dueDate"
          :priority="todo.priority"
          :is-dark="isDark"
        />
      </div>

      <!-- Action Buttons -->
      <TodoActions
        :is-dark="isDark"
        @edit="$emit('edit')"
        @delete="$emit('delete')"
      />
    </div>
  </div>
</template>
