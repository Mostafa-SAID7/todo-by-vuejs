<script setup lang="ts">
import TodoItem from '@/components/todo/TodoItem.vue'
import type { Todo } from '@/types/todo'

defineProps<{
  todos: Todo[]
  isDark: boolean
}>()

defineEmits<{
  toggleTodo: [id: number]
  editTodo: [todo: Todo]
  deleteTodo: [todo: Todo]
}>()
</script>

<template>
  <div class="flex flex-col gap-6 h-[80vh] overflow-hidden">
    <!-- Top wide block: List Header -->
    <div class="bg-white dark:bg-dash-darkcard rounded-3xl p-6 shadow-sm flex justify-between items-center transition-colors shrink-0">
      <div class="flex items-center gap-4">
        <div class="w-4 h-4 border-2 border-dash-text dark:border-dash-darktext rounded-sm flex items-center justify-center">
          <div class="w-2 h-2 bg-dash-text dark:bg-dash-darktext"></div>
        </div>
        <div class="text-xl font-medium text-dash-text dark:text-dash-darktext">Task List</div>
      </div>
      <div class="text-dash-orange font-bold text-lg">{{ todos.length }} items</div>
    </div>

    <!-- The List itself -->
    <div class="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar pb-6">
      <template v-if="todos.length > 0">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          :is-dark="isDark"
          @update:completed="$emit('toggleTodo', todo.id)"
          @edit="$emit('editTodo', todo)"
          @delete="$emit('deleteTodo', todo)"
        />
      </template>
      <div v-else class="text-center p-10 text-dash-textmuted">
        No tasks found.
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d95a25;
  border-radius: 4px;
}
</style>
