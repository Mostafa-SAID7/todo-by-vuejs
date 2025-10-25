<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import OpenAI from 'openai'

interface Todo {
  id: number
  text: string
  completed: boolean
  category: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
}

interface Suggestion {
  text: string
  translation?: string
}

const { t, locale } = useI18n()

const todos = ref<Todo[]>([])
const newTodo = ref('')
const newCategory = ref('')
const newDueDate = ref('')
const newPriority = ref<'low' | 'medium' | 'high'>('medium')
const isDark = ref(false)
const filterStatus = ref<'all' | 'active' | 'completed'>('all')
const sortBy = ref<'dueDate' | 'priority' | 'category'>('dueDate')
const suggestions = ref<Suggestion[]>([])
const showSuggestions = ref(false)
const isTranslating = ref(false)
const translation = ref('')

// Edit mode state
const editingTodo = ref<Todo | null>(null)
const editText = ref('')
const editCategory = ref('')
const editDueDate = ref('')
const editPriority = ref<'low' | 'medium' | 'high'>('medium')

// Delete confirmation state
const todoToDelete = ref<Todo | null>(null)

// Load todos from localStorage
onMounted(() => {
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos)
  }
  
  const savedTheme = localStorage.getItem('darkMode')
  if (savedTheme === 'true') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }

  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    locale.value = savedLocale
  }
  document.documentElement.dir = locale.value === 'ar' ? 'rtl' : 'ltr'
})

// Save todos to localStorage whenever they change
watch(todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos))
}, { deep: true })

// Save theme preference
watch(isDark, (newValue) => {
  localStorage.setItem('darkMode', String(newValue))
})

// Save locale preference and update document direction
watch(locale, (newLocale) => {
  localStorage.setItem('locale', newLocale)
  document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
})

// Watch for input changes to provide suggestions
watch(newTodo, async (value) => {
  if (value.length > 2) {
    await getSuggestions(value)
  } else {
    suggestions.value = []
    showSuggestions.value = false
  }
})

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.unshift({
      id: Date.now(),
      text: newTodo.value,
      completed: false,
      category: newCategory.value,
      dueDate: newDueDate.value,
      priority: newPriority.value
    })
    newTodo.value = ''
    newCategory.value = ''
    newDueDate.value = ''
    newPriority.value = 'medium'
    translation.value = ''
    suggestions.value = []
    showSuggestions.value = false
  }
}

const confirmDelete = (todo: Todo) => {
  todoToDelete.value = todo
}

const removeTodo = () => {
  if (todoToDelete.value) {
    todos.value = todos.value.filter(todo => todo.id !== todoToDelete.value!.id)
    todoToDelete.value = null
  }
}

const cancelDelete = () => {
  todoToDelete.value = null
}

const startEditing = (todo: Todo) => {
  editingTodo.value = todo
  editText.value = todo.text
  editCategory.value = todo.category
  editDueDate.value = todo.dueDate
  editPriority.value = todo.priority
}

const saveEdit = () => {
  if (editingTodo.value && editText.value.trim()) {
    const index = todos.value.findIndex(t => t.id === editingTodo.value!.id)
    if (index !== -1) {
      todos.value[index] = {
        ...editingTodo.value,
        text: editText.value,
        category: editCategory.value,
        dueDate: editDueDate.value,
        priority: editPriority.value
      }
    }
    cancelEdit()
  }
}

const cancelEdit = () => {
  editingTodo.value = null
  editText.value = ''
  editCategory.value = ''
  editDueDate.value = ''
  editPriority.value = 'medium'
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'ar' : 'en'
}

const getSuggestions = async (input: string) => {
  try {
    // This is a mock implementation. In a real app, you would call an API
    const mockSuggestions = [
      { text: input + ' today' },
      { text: input + ' tomorrow' },
      { text: input + ' next week' }
    ]
    suggestions.value = mockSuggestions
    showSuggestions.value = true

    // Get translation if input is complete word
    if (input.endsWith(' ') || input.length > 10) {
      await getTranslation(input)
    }
  } catch (error) {
    console.error('Error getting suggestions:', error)
  }
}

const getTranslation = async (text: string) => {
  try {
    isTranslating.value = true
    // This is a mock implementation. In a real app, you would call a translation API
    const targetLang = locale.value === 'en' ? 'ar' : 'en'
    const mockTranslation = `${text} (translated to ${targetLang})`
    translation.value = mockTranslation
  } catch (error) {
    console.error('Error translating:', error)
  } finally {
    isTranslating.value = false
  }
}

const selectSuggestion = (suggestion: Suggestion) => {
  newTodo.value = suggestion.text
  showSuggestions.value = false
}

const filteredAndSortedTodos = computed(() => {
  let filtered = [...todos.value]
  
  if (filterStatus.value === 'active') {
    filtered = filtered.filter(todo => !todo.completed)
  } else if (filterStatus.value === 'completed') {
    filtered = filtered.filter(todo => todo.completed)
  }
  
  filtered.sort((a, b) => {
    if (sortBy.value === 'dueDate') {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    } else if (sortBy.value === 'priority') {
      const priorityWeight = { low: 0, medium: 1, high: 2 }
      return priorityWeight[b.priority] - priorityWeight[a.priority]
    } else {
      return a.category.localeCompare(b.category)
    }
  })
  
  return filtered
})

const getPriorityColor = (priority: string) => {
  return {
    low: isDark.value ? 'bg-green-800' : 'bg-green-200',
    medium: isDark.value ? 'bg-yellow-800' : 'bg-yellow-200',
    high: isDark.value ? 'bg-red-800' : 'bg-red-200'
  }[priority]
}
</script>

<template>
  <div :class="['min-h-screen transition-colors duration-300', isDark ? 'bg-gray-900' : 'bg-gray-100']">
    <div class="container mx-auto px-4 py-8 max-w-2xl">
      <div class="flex justify-end gap-2 mb-6">
        <button
          @click="toggleLanguage"
          :class="[
            'px-4 py-2 rounded-lg shadow-md transition-colors',
            isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-50'
          ]"
        >
          {{ locale === 'en' ? 'العربية' : 'English' }}
        </button>
        <button
          @click="toggleDarkMode"
          :class="[
            'px-4 py-2 rounded-lg shadow-md transition-colors',
            isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-50'
          ]"
        >
          {{ isDark ? t('app.lightMode') : t('app.darkMode') }}
        </button>
      </div>
      
      <div :class="['rounded-lg shadow-lg p-6', isDark ? 'bg-gray-800' : 'bg-white']">
        <h1 :class="['text-3xl font-bold mb-6 text-center', isDark ? 'text-white' : 'text-gray-800']">
          {{ t('app.title') }}
        </h1>
        
        <!-- Add Todo Form -->
        <div class="space-y-4 mb-6">
          <div class="relative">
            <input
              v-model="newTodo"
              @keyup.enter="addTodo"
              type="text"
              :placeholder="t('todo.addPlaceholder')"
              :class="[
                'w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors',
                isDark ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-400'
              ]"
            >
            
            <!-- Translation -->
            <div
              v-if="translation"
              :class="[
                'mt-1 text-sm',
                isDark ? 'text-gray-400' : 'text-gray-600'
              ]"
            >
              {{ translation }}
            </div>

            <!-- Suggestions Dropdown -->
            <div
              v-if="showSuggestions && suggestions.length > 0"
              class="absolute z-10 w-full mt-1 rounded-lg shadow-lg"
              :class="[
                isDark ? 'bg-gray-700' : 'bg-white'
              ]"
            >
              <div
                v-for="suggestion in suggestions"
                :key="suggestion.text"
                @click="selectSuggestion(suggestion)"
                class="px-4 py-2 cursor-pointer first:rounded-t-lg last:rounded-b-lg"
                :class="[
                  isDark ? 'hover:bg-gray-600 text-white' : 'hover:bg-gray-100 text-gray-800'
                ]"
              >
                {{ suggestion.text }}
                <span
                  v-if="suggestion.translation"
                  :class="[
                    'block text-sm',
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  ]"
                >
                  {{ suggestion.translation }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              v-model="newCategory"
              type="text"
              :placeholder="t('todo.categoryPlaceholder')"
              :class="[
                'px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors',
                isDark ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-400'
              ]"
            >
            
            <input
              v-model="newDueDate"
              type="date"
              :class="[
                'px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors',
                isDark ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-400'
              ]"
            >
            
            <select
              v-model="newPriority"
              :class="[
                'px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors',
                isDark ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-400'
              ]"
            >
              <option value="low">{{ t('todo.priority.low') }}</option>
              <option value="medium">{{ t('todo.priority.medium') }}</option>
              <option value="high">{{ t('todo.priority.high') }}</option>
            </select>
          </div>
          
          <button
            @click="addTodo"
            :class="[
              'w-full px-4 py-2 rounded-lg shadow-md transition-colors',
              isDark ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-500 text-white hover:bg-blue-400'
            ]"
          >
            {{ t('todo.add') }}
          </button>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-4 mb-6">
          <select
            v-model="filterStatus"
            :class="[
              'px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors',
              isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
            ]"
          >
            <option value="all">{{ t('todo.filter.all') }}</option>
            <option value="active">{{ t('todo.filter.active') }}</option>
            <option value="completed">{{ t('todo.filter.completed') }}</option>
          </select>

          <select
            v-model="sortBy"
            :class="[
              'px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors',
              isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
            ]"
          >
            <option value="dueDate">{{ t('todo.sort.dueDate') }}</option>
            <option value="priority">{{ t('todo.sort.priority') }}</option>
            <option value="category">{{ t('todo.sort.category') }}</option>
          </select>
        </div>

        <!-- Todo List -->
        <div class="space-y-3 max-h-[calc(100vh-24rem)] overflow-y-auto">
          <div
            v-for="todo in filteredAndSortedTodos"
            :key="todo.id"
            :class="[
              'flex items-center justify-between p-4 rounded-lg shadow-md transition-colors',
              isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            ]"
          >
            <div class="flex items-center gap-3 flex-1">
              <input
                type="checkbox"
                v-model="todo.completed"
                class="w-5 h-5 rounded"
              >
              <div class="flex flex-col flex-1">
                <span
                  :class="[
                    'transition-colors',
                    todo.completed ? 'line-through opacity-50' : '',
                    isDark ? 'text-white' : 'text-gray-800'
                  ]"
                >
                  {{ todo.text }}
                </span>
                <div class="flex gap-2 mt-1">
                  <span
                    v-if="todo.category"
                    :class="[
                      'text-xs px-2 py-1 rounded',
                      isDark ? 'bg-gray-600' : 'bg-gray-200'
                    ]"
                  >
                    {{ todo.category }}
                  </span>
                  <span
                    v-if="todo.dueDate"
                    :class="[
                      'text-xs px-2 py-1 rounded',
                      isDark ? 'bg-gray-600' : 'bg-gray-200'
                    ]"
                  >
                    {{ t('todo.dueDate', { date: new Date(todo.dueDate).toLocaleDateString() }) }}
                  </span>
                  <span
                    :class="[
                      'text-xs px-2 py-1 rounded',
                      getPriorityColor(todo.priority)
                    ]"
                  >
                    {{ t(`todo.priority.${todo.priority}`) }}
                  </span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2 ml-4">
                <button
                  @click="startEditing(todo)"
                  :class="[
                    'px-3 py-1 rounded-lg transition-colors',
                    isDark ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-500 text-white hover:bg-blue-400'
                  ]"
                >
                  {{ t('todo.edit') }}
                </button>
                <button
                  @click="confirmDelete(todo)"
                  :class="[
                    'px-3 py-1 rounded-lg transition-colors',
                    isDark ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-red-500 text-white hover:bg-red-400'
                  ]"
                >
                  {{ t('todo.delete') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="editingTodo" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" @click="cancelEdit"></div>
      <div 
        :class="[
          'relative w-full max-w-md p-6 rounded-lg shadow-xl',
          isDark ? 'bg-gray-800' : 'bg-white'
        ]"
      >
        <h2 :class="['text-xl font-bold mb-4', isDark ? 'text-white' : 'text-gray-800']">
          {{ t('modal.edit.title') }}
        </h2>
        <div class="space-y-4">
          <input
            v-model="editText"
            type="text"
            :class="[
              'w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors',
              isDark ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-400'
            ]"
            @keyup.enter="saveEdit"
          >
          <div class="grid grid-cols-1 gap-4">
            <input
              v-model="editCategory"
              type="text"
              :placeholder="t('todo.categoryPlaceholder')"
              :class="[
                'w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors',
                isDark ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-400'
              ]"
            >
            <input
              v-model="editDueDate"
              type="date"
              :class="[
                'w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors',
                isDark ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-400'
              ]"
            >
            <select
              v-model="editPriority"
              :class="[
                'w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors',
                isDark ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-400'
              ]"
            >
              <option value="low">{{ t('todo.priority.low') }}</option>
              <option value="medium">{{ t('todo.priority.medium') }}</option>
              <option value="high">{{ t('todo.priority.high') }}</option>
            </select>
          </div>
          <div class="flex justify-end gap-2 mt-6">
            <button
              @click="cancelEdit"
              :class="[
                'px-4 py-2 rounded-lg transition-colors',
                isDark ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              ]"
            >
              {{ t('modal.edit.cancel') }}
            </button>
            <button
              @click="saveEdit"
              :class="[
                'px-4 py-2 rounded-lg transition-colors',
                isDark ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-500 text-white hover:bg-blue-400'
              ]"
            >
              {{ t('modal.edit.save') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="todoToDelete" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" @click="cancelDelete"></div>
      <div 
        :class="[
          'relative w-full max-w-sm p-6 rounded-lg shadow-xl',
          isDark ? 'bg-gray-800' : 'bg-white'
        ]"
      >
        <h2 :class="['text-xl font-bold mb-4', isDark ? 'text-white' : 'text-gray-800']">
          {{ t('modal.delete.title') }}
        </h2>
        <p :class="[isDark ? 'text-gray-300' : 'text-gray-600']">
          {{ t('modal.delete.message') }}
        </p>
        <p :class="['font-medium mt-2', isDark ? 'text-white' : 'text-gray-800']">
          "{{ todoToDelete.text }}"
        </p>
        <div class="flex justify-end gap-2 mt-6">
          <button
            @click="cancelDelete"
            :class="[
              'px-4 py-2 rounded-lg transition-colors',
              isDark ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            ]"
          >
            {{ t('modal.delete.cancel') }}
          </button>
          <button
            @click="removeTodo"
            :class="[
              'px-4 py-2 rounded-lg transition-colors',
              isDark ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-red-500 text-white hover:bg-red-400'
            ]"
          >
            {{ t('modal.delete.confirm') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
[dir="rtl"] .ml-4 {
  margin-left: 0;
  margin-right: 1rem;
}

[dir="rtl"] .space-x-2 > :not([hidden]) ~ :not([hidden]) {
  margin-left: 0;
  margin-right: 0.5rem;
}
</style>