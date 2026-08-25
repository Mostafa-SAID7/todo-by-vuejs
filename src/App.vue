<script setup lang="ts">
import { onMounted, ref } from 'vue'

// Composables
import { useTodo } from '@/composables/useTodo'
import { useFilter } from '@/composables/useFilter'
import { useTheme } from '@/composables/useTheme'
import { useLocalStorage } from '@/composables/useLocalStorage'
import type { CreateTodoPayload, UpdateTodoPayload, Todo } from '@/types/todo'

// Modals
import EditTodoModal from '@/components/modal/EditTodoModal.vue'
import DeleteConfirmModal from '@/components/modal/DeleteConfirmModal.vue'

// Main Layout
import MainLayout from '@/components/layout/MainLayout.vue'

const { todos, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodo()
const { filterStatus, sortBy, filteredAndSortedTodos, setFilterStatus, setSortBy } = useFilter(todos)
const { isDark, toggleTheme, initializeTheme } = useTheme()
const { loadTodos, setupAutoSave } = useLocalStorage()

const editingTodo = ref<Todo | null>(null)
const todoToDelete = ref<Todo | null>(null)
const isSidebarOpen = ref(false)
const activeTab = ref('home')

onMounted(() => {
  initializeTheme()
  todos.value = loadTodos()
  setupAutoSave(todos)
})

const handleAddTodo = (payload: CreateTodoPayload) => addTodo(payload)
const handleSaveEdit = (payload: UpdateTodoPayload) => {
  if (editingTodo.value) {
    updateTodo(editingTodo.value.id, payload)
    editingTodo.value = null
  }
}
const handleConfirmDelete = () => {
  if (todoToDelete.value) {
    deleteTodo(todoToDelete.value.id)
    todoToDelete.value = null
  }
}

const handleImportTodos = (imported: Todo[]) => {
  todos.value = imported
}

const handleClearTodos = () => {
  todos.value = []
}
</script>

<template>
  <div :class="{'dark': isDark}">
    <MainLayout
      v-model:active-tab="activeTab"
      :todos="todos"
      :filtered-todos="filteredAndSortedTodos"
      :is-dark="isDark"
      :is-sidebar-open="isSidebarOpen"
      :filter-status="filterStatus"
      :sort-by="sortBy"
      @toggle-theme="toggleTheme"
      @toggle-sidebar="isSidebarOpen = !isSidebarOpen"
      @update:filter-status="setFilterStatus"
      @update:sort-by="setSortBy"
      @add-todo="handleAddTodo"
      @toggle-todo="toggleTodo"
      @edit-todo="editingTodo = $event"
      @delete-todo="todoToDelete = $event"
      @import-todos="handleImportTodos"
      @clear-todos="handleClearTodos"
    />

    <!-- Modals -->
    <EditTodoModal
      :is-open="editingTodo !== null"
      :todo="editingTodo"
      :is-dark="isDark"
      @close="editingTodo = null"
      @save="handleSaveEdit"
    />
    <DeleteConfirmModal
      :is-open="todoToDelete !== null"
      :todo="todoToDelete"
      :is-dark="isDark"
      @close="todoToDelete = null"
      @confirm="handleConfirmDelete"
    />
  </div>
</template>