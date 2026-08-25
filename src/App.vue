<script setup lang="ts">
/**
 * App.vue
 * Root application component
 * Orchestrates composables and components with responsive sidebar + header layout
 */

import { onMounted, ref } from 'vue'
import type { UpdateTodoPayload, CreateTodoPayload } from '@/types/todo'

// Import Composables
import { useTodo } from '@/composables/useTodo'
import { useFilter } from '@/composables/useFilter'
import { useTheme } from '@/composables/useTheme'
import { useI18nWrapper } from '@/composables/useI18nWrapper'
import { useSuggestions } from '@/composables/useSuggestions'
import { useLocalStorage } from '@/composables/useLocalStorage'

// Import Layout Components
import MainLayout from '@/components/layout/MainLayout.vue'
import Container from '@/components/layout/Container.vue'

// Import Todo Components
import TodoForm from '@/components/todo/TodoForm.vue'
import TodoFilters from '@/components/todo/TodoFilters.vue'
import TodoItem from '@/components/todo/TodoItem.vue'
import TodoEmpty from '@/components/todo/TodoEmpty.vue'
import EditTodoModal from '@/components/modal/EditTodoModal.vue'
import DeleteConfirmModal from '@/components/modal/DeleteConfirmModal.vue'

// Initialize Composables
const { todos, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodo()
const { filterStatus, sortBy, filteredAndSortedTodos, setFilterStatus, setSortBy } =
  useFilter(todos)
const { isDark, initializeTheme, toggleTheme } = useTheme()
const { locale: currentLanguage, initializeLanguage, toggleLanguage } = useI18nWrapper()
const { suggestions, showSuggestions } = useSuggestions()
const { loadTodos, setupAutoSave } = useLocalStorage()

// Modal and Edit State
const editingTodo = ref<any>(null)
const todoToDelete = ref<any>(null)
const currentSection = ref<string>('all')
const searchQuery = ref<string>('')

/**
 * Initialize application on mount
 */
onMounted(() => {
  // Load and apply theme
  initializeTheme()

  // Load and apply language
  initializeLanguage()

  // Load todos from localStorage
  const savedTodos = loadTodos()
  todos.value = savedTodos

  // Setup auto-save for todos
  setupAutoSave(todos)
})

/**
 * Handle new todo submission
 */
const handleAddTodo = (payload: CreateTodoPayload) => {
  addTodo(payload)
}

/**
 * Handle edit modal save
 */
const handleSaveEdit = (payload: UpdateTodoPayload) => {
  if (editingTodo.value) {
    updateTodo(editingTodo.value.id, payload)
    editingTodo.value = null
  }
}

/**
 * Handle delete confirmation
 */
const handleConfirmDelete = () => {
  if (todoToDelete.value) {
    deleteTodo(todoToDelete.value.id)
    todoToDelete.value = null
  }
}

/**
 * Handle todo toggle completion
 */
const handleToggleTodo = (id: number) => {
  toggleTodo(id)
}

/**
 * Handle section navigation from sidebar
 */
const handleNavigate = (section: string) => {
  currentSection.value = section
}

/**
 * Handle search
 */
const handleSearch = (query: string) => {
  searchQuery.value = query
}
</script>

<template>
  <MainLayout
    :is-dark="isDark"
    :current-language="currentLanguage"
    :title="$t('app.title')"
    @toggle-theme="toggleTheme"
    @toggle-language="toggleLanguage"
    @navigate="handleNavigate"
    @search="handleSearch"
  >
    <Container :is-dark="isDark">
      <!-- Todo Form -->
      <TodoForm :is-dark="isDark" @submit="handleAddTodo" />

      <!-- Filters Section -->
      <TodoFilters
        :filter-status="filterStatus"
        :sort-by="sortBy"
        :is-dark="isDark"
        @update:filter-status="setFilterStatus"
        @update:sort-by="setSortBy"
      />

      <!-- Todo List or Empty State -->
      <div
        v-if="filteredAndSortedTodos.length > 0"
        class="space-y-3"
      >
        <TodoItem
          v-for="todo in filteredAndSortedTodos"
          :key="todo.id"
          :todo="todo"
          :is-dark="isDark"
          @update:completed="handleToggleTodo(todo.id)"
          @edit="editingTodo = todo"
          @delete="todoToDelete = todo"
        />
      </div>

      <!-- Empty State -->
      <TodoEmpty v-else :is-dark="isDark" />
    </Container>

    <!-- Edit Todo Modal -->
    <EditTodoModal
      :is-open="editingTodo !== null"
      :todo="editingTodo"
      :is-dark="isDark"
      @close="editingTodo = null"
      @save="handleSaveEdit"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmModal
      :is-open="todoToDelete !== null"
      :todo="todoToDelete"
      :is-dark="isDark"
      @close="todoToDelete = null"
      @confirm="handleConfirmDelete"
    />
  </MainLayout>
</template>