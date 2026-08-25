<script setup lang="ts">
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
      'flex items-center justify-between p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300',
      'bg-white dark:bg-dash-darkcard border-gray-100 dark:border-white/5',
    ]"
  >
    <div class="flex items-center gap-4 flex-1">
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
            'transition-colors font-medium text-sm md:text-base',
            todo.completed 
              ? 'line-through text-dash-textmuted dark:text-dash-textmuted opacity-50' 
              : 'text-dash-text dark:text-dash-darktext',
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

