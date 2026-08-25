<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Todo, CreateTodoPayload, FilterStatus, SortOption } from '@/types/todo'
import Sidebar from './Sidebar.vue'
import TopNavBar from './TopNavBar.vue'

// Cards
import StatCard from '@/components/ui/StatCard.vue'
import ProductivityCard from '@/components/ui/ProductivityCard.vue'
import ProgressCard from '@/components/ui/ProgressCard.vue'
import AddTaskCard from '@/components/todo/AddTaskCard.vue'
import TaskListCard from '@/components/todo/TaskListCard.vue'
import TodoFilters from '@/components/todo/TodoFilters.vue'
import CustomSelect from '@/components/ui/CustomSelect.vue'

// Services/Composables for apps tab
import { suggestionService } from '@/services/suggestionService'
import { translateService } from '@/services/translateService'
import { useI18nWrapper } from '@/composables/useI18nWrapper'

// Icons
import { 
  FolderHeart, 
  Sparkles, 
  CircleDot,
  Trash2,
  Download,
  Upload,
  Globe,
  Sun,
  Moon
} from 'lucide-vue-next'

const props = defineProps<{
  todos: Todo[]
  isDark: boolean
  isSidebarOpen: boolean
  filteredTodos: Todo[]
  activeTab: string
  filterStatus: FilterStatus
  sortBy: SortOption
}>()

const emit = defineEmits<{
  'update:activeTab': [tab: string]
  'toggle-theme': []
  'toggle-sidebar': []
  'update:filterStatus': [status: FilterStatus]
  'update:sortBy': [sort: SortOption]
  'add-todo': [payload: CreateTodoPayload]
  'toggle-todo': [id: number]
  'edit-todo': [todo: Todo]
  'delete-todo': [todo: Todo]
  'import-todos': [todos: Todo[]]
  'clear-todos': []
}>()

const { locale, toggleLanguage } = useI18nWrapper()

const openTasksCount = computed(() => props.todos.filter(t => !t.completed).length)
const completedTasksCount = computed(() => props.todos.filter(t => t.completed).length)

// Projects/Categories tab state
const selectedProject = ref<string | null>(null)
const categoryStats = computed(() => {
  const map = new Map<string, { total: number; completed: number }>()
  props.todos.forEach(todo => {
    const cat = todo.category?.trim() || 'General'
    const stat = map.get(cat) || { total: 0, completed: 0 }
    stat.total++
    if (todo.completed) stat.completed++
    map.set(cat, stat)
  })
  return Array.from(map.entries()).map(([name, stat]) => ({
    name,
    total: stat.total,
    completed: stat.completed,
    percentage: stat.total ? Math.round((stat.completed / stat.total) * 100) : 0
  }))
})

// AI Apps tab state
const aiKeyword = ref('')
const aiSuggestions = ref<{ text: string }[]>([])
const isLoadingSuggestions = ref(false)

const generateSuggestions = async () => {
  if (aiKeyword.value.trim().length <= 2) return
  isLoadingSuggestions.value = true
  try {
    const res = await suggestionService.getSuggestions(aiKeyword.value)
    aiSuggestions.value = res
  } catch (error) {
    console.error(error)
  } finally {
    isLoadingSuggestions.value = false
  }
}

const addSuggestedTask = (text: string) => {
  emit('add-todo', {
    text,
    category: 'AI Helper',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium'
  })
  aiKeyword.value = ''
  aiSuggestions.value = []
}

// Translate state
const translationText = ref('')
const targetLanguage = ref<'ar' | 'en'>('ar')
const isTranslating = ref(false)
const translatedResult = ref('')

const translateText = async () => {
  if (!translationText.value.trim()) return
  isTranslating.value = true
  try {
    const res = await translateService.translate(translationText.value, targetLanguage.value)
    translatedResult.value = res
  } catch (error) {
    console.error(error)
  } finally {
    isTranslating.value = false
  }
}

// Settings export/import
const fileInput = ref<HTMLInputElement | null>(null)

const triggerImport = () => {
  fileInput.value?.click()
}

const handleImport = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target?.result as string)
      if (Array.isArray(parsed)) {
        emit('import-todos', parsed)
        alert('Tasks imported successfully!')
      } else {
        alert('Invalid file format.')
      }
    } catch (err) {
      alert('Error parsing JSON backup file.')
    }
  }
  reader.readAsText(file)
}

const exportTasks = () => {
  const data = JSON.stringify(props.todos, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'todo-backup.json'
  a.click()
  URL.revokeObjectURL(url)
}

const confirmClear = () => {
  if (window.confirm('Are you sure you want to clear all todos?')) {
    emit('clear-todos')
  }
}
</script>

<template>
  <div class="min-h-screen bg-dash-bg dark:bg-dash-darkbg p-4 md:p-6 flex flex-col md:flex-row gap-6 font-sans transition-colors duration-300">
    <!-- Navigation Sidebar -->
    <Sidebar 
      :active-tab="activeTab" 
      :is-open="isSidebarOpen" 
      @update:active-tab="$emit('update:activeTab', $event)" 
    />

    <!-- Main Workspace -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <TopNavBar 
        :is-dark="isDark" 
        :is-sidebar-open="isSidebarOpen" 
        @toggle-theme="$emit('toggle-theme')" 
        @toggle-sidebar="$emit('toggle-sidebar')" 
      />

      <!-- Views Container -->
      <div class="flex-1 flex flex-col overflow-hidden">
        
        <!-- Tab View: Home / Dashboard -->
        <div v-if="activeTab === 'home'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 auto-rows-min overflow-y-auto pr-2 pb-10 custom-scrollbar">
          <!-- Column 1 -->
          <div class="flex flex-col gap-6">
            <StatCard :value="openTasksCount" title="Open Tasks" subtitle="Active" />
            <StatCard :value="todos.length" title="Total tasks" subtitle="All recorded" is-dark-theme />
            <ProductivityCard />
          </div>

          <!-- Column 2 -->
          <div class="flex flex-col gap-6 lg:col-span-1 md:col-span-1">
            <ProgressCard :completed-count="completedTasksCount" :total-count="todos.length" />
            <AddTaskCard @submit="$emit('add-todo', $event)" />
          </div>

          <!-- Column 3 & 4 -->
          <div class="col-span-1 md:col-span-2">
            <TaskListCard 
              :todos="filteredTodos" 
              :is-dark="isDark" 
              @toggle-todo="$emit('toggle-todo', $event)"
              @edit-todo="$emit('edit-todo', $event)"
              @delete-todo="$emit('delete-todo', $event)"
            />
          </div>
        </div>

        <!-- Tab View: All Tasks Manager -->
        <div v-else-if="activeTab === 'tasks'" class="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto pr-2 pb-10 custom-scrollbar">
          <div class="flex flex-col gap-6 lg:col-span-1">
            <AddTaskCard @submit="$emit('add-todo', $event)" />
            <ProgressCard :completed-count="completedTasksCount" :total-count="todos.length" />
          </div>
          
          <div class="flex flex-col gap-4 lg:col-span-2">
            <!-- Inline Filters -->
            <div class="bg-white dark:bg-dash-darkcard rounded-3xl p-6 shadow-sm transition-colors flex flex-wrap justify-between items-center gap-4 shrink-0">
              <h2 class="text-lg font-bold text-dash-text dark:text-dash-darktext">Quick Filters</h2>
              <TodoFilters
                :filter-status="filterStatus"
                :sort-by="sortBy"
                :is-dark="isDark"
                class="mb-0"
                @update:filter-status="$emit('update:filterStatus', $event)"
                @update:sort-by="$emit('update:sortBy', $event)"
              />
            </div>
            
            <TaskListCard 
              :todos="filteredTodos" 
              :is-dark="isDark" 
              @toggle-todo="$emit('toggle-todo', $event)"
              @edit-todo="$emit('edit-todo', $event)"
              @delete-todo="$emit('delete-todo', $event)"
            />
          </div>
        </div>

        <!-- Tab View: Projects / Categories -->
        <div v-else-if="activeTab === 'projects'" class="flex-1 overflow-y-auto pr-2 pb-10 custom-scrollbar">
          <div v-if="!selectedProject" class="space-y-6">
            <div class="flex justify-between items-center">
              <h2 class="text-2xl font-bold text-dash-text dark:text-dash-darktext">Projects & Categories</h2>
              <span class="text-sm text-dash-textmuted">{{ categoryStats.length }} Categories</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="proj in categoryStats" 
                :key="proj.name"
                class="bg-white dark:bg-dash-darkcard rounded-3xl p-6 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col justify-between h-48 border border-transparent hover:border-dash-orange/20"
                @click="selectedProject = proj.name"
              >
                <div class="flex justify-between items-start">
                  <div class="p-3 bg-dash-orange/10 rounded-2xl text-dash-orange">
                    <FolderHeart class="w-6 h-6" />
                  </div>
                  
                  <div class="relative w-12 h-12 flex items-center justify-center">
                    <svg class="w-full h-full transform -rotate-90">
                      <circle cx="24" cy="24" r="20" class="stroke-current text-dash-dark/10 dark:text-white/10" stroke-width="4" fill="transparent" />
                      <circle 
                        cx="24" 
                        cy="24" 
                        r="20" 
                        class="stroke-current text-dash-orange" 
                        stroke-width="4" 
                        fill="transparent" 
                        :stroke-dasharray="2 * Math.PI * 20" 
                        :stroke-dashoffset="2 * Math.PI * 20 * (1 - proj.percentage / 100)" 
                      />
                    </svg>
                    <span class="absolute text-[10px] font-bold text-dash-text dark:text-dash-darktext">{{ proj.percentage }}%</span>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-bold text-dash-text dark:text-dash-darktext truncate mb-1">{{ proj.name }}</h3>
                  <p class="text-sm text-dash-textmuted">{{ proj.completed }} of {{ proj.total }} tasks completed</p>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="space-y-6">
            <div class="flex items-center gap-4">
              <button 
                class="px-4 py-2 bg-dash-dark text-white rounded-xl text-sm font-medium hover:bg-dash-dark/80 active:scale-95 transition-all"
                @click="selectedProject = null"
              >
                ← Back
              </button>
              <h2 class="text-2xl font-bold text-dash-text dark:text-dash-darktext">{{ selectedProject }} Category</h2>
            </div>

            <TaskListCard 
              :todos="todos.filter(t => (t.category || 'Uncategorized') === selectedProject)" 
              :is-dark="isDark" 
              @toggle-todo="$emit('toggle-todo', $event)"
              @edit-todo="$emit('edit-todo', $event)"
              @delete-todo="$emit('delete-todo', $event)"
            />
          </div>
        </div>

        <!-- Tab View: AI Suggestions & Translation -->
        <div v-else-if="activeTab === 'apps'" class="flex-1 overflow-y-auto pr-2 pb-10 custom-scrollbar grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Suggestion Tool -->
          <div class="bg-white dark:bg-dash-darkcard rounded-3xl p-6 shadow-sm transition-colors flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-3 mb-6">
                <div class="p-3 bg-dash-orange/10 rounded-2xl text-dash-orange animate-pulse">
                  <Sparkles class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-dash-text dark:text-dash-darktext">AI Task Copilot</h3>
                  <p class="text-sm text-dash-textmuted">Get fast automated suggestions for your goals</p>
                </div>
              </div>

              <div class="space-y-4">
                <input 
                  v-model="aiKeyword" 
                  type="text" 
                  placeholder="e.g. Health, Office, Study, Homework" 
                  class="w-full bg-white dark:bg-dash-darkcard border border-dash-dark/10 dark:border-white/10 rounded-xl px-4 py-3 text-dash-text dark:text-dash-darktext placeholder-dash-textmuted dark:placeholder-white/40 focus:outline-none focus:border-dash-orange focus:ring-2 focus:ring-dash-orange/20 transition-colors"
                  @keyup.enter="generateSuggestions"
                />
                <button 
                  class="w-full bg-dash-orange text-white font-bold rounded-xl py-3 hover:bg-dash-orange/90 active:scale-95 transition-all flex items-center justify-center gap-2"
                  :disabled="isLoadingSuggestions"
                  @click="generateSuggestions"
                >
                  <span v-if="isLoadingSuggestions">Generating Suggestion...</span>
                  <span v-else>Suggest Tasks</span>
                </button>
              </div>

              <div class="mt-8 space-y-3" v-if="aiSuggestions.length > 0">
                <h4 class="text-sm font-bold text-dash-text dark:text-dash-darktext">Suggestions (Tap to Quick-Add):</h4>
                <div 
                  v-for="sug in aiSuggestions" 
                  :key="sug.text"
                  class="p-4 bg-white dark:bg-white/5 hover:bg-dash-orange/10 dark:hover:bg-dash-orange/20 rounded-2xl cursor-pointer transition-all border border-dash-dark/10 dark:border-white/10 flex items-center justify-between group"
                  @click="addSuggestedTask(sug.text)"
                >
                  <span class="text-sm text-dash-text dark:text-white group-hover:text-dash-orange font-medium">{{ sug.text }}</span>
                  <span class="text-xs text-dash-orange font-bold opacity-0 group-hover:opacity-100 transition-opacity">Quick Add +</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Translation Tool -->
          <div class="bg-white dark:bg-dash-darkcard rounded-3xl p-6 shadow-sm transition-colors flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-3 mb-6">
                <div class="p-3 bg-dash-orange/10 rounded-2xl text-dash-orange">
                  <CircleDot class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-dash-text dark:text-dash-darktext">Quick Translator</h3>
                  <p class="text-sm text-dash-textmuted">Translate task lists/notes instantly</p>
                </div>
              </div>

              <div class="space-y-4">
                <textarea 
                  v-model="translationText" 
                  placeholder="Enter notes or task content..." 
                  rows="3"
                  class="w-full bg-white dark:bg-dash-darkcard border border-dash-dark/10 dark:border-white/10 rounded-xl px-4 py-3 text-dash-text dark:text-dash-darktext placeholder-dash-textmuted dark:placeholder-white/40 focus:outline-none focus:border-dash-orange focus:ring-2 focus:ring-dash-orange/20 transition-colors resize-none"
                ></textarea>
                
                <div class="flex gap-4">
                  <div class="flex-1">
                    <CustomSelect
                      :model-value="targetLanguage"
                      :options="[
                        { label: '🌐 Arabic (ar)', value: 'ar' },
                        { label: '🌐 English (en)', value: 'en' },
                      ]"
                      variant="default"
                      @update:model-value="targetLanguage = $event as 'ar' | 'en'"
                    />
                  </div>
                  <button 
                    class="bg-dash-dark text-white px-6 font-bold rounded-xl py-3 hover:bg-dash-dark/80 active:scale-95 transition-all"
                    :disabled="isTranslating"
                    @click="translateText"
                  >
                    <span v-if="isTranslating">Translating...</span>
                    <span v-else>Translate</span>
                  </button>
                </div>
              </div>

              <div class="mt-8 space-y-2" v-if="translatedResult">
                <h4 class="text-sm font-bold text-dash-text dark:text-dash-darktext">Translation Output:</h4>
                <div class="p-4 bg-dash-orange/10 rounded-2xl border border-dash-orange/20 text-dash-orange text-sm font-medium">
                  {{ translatedResult }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab View: Settings -->
        <div v-else-if="activeTab === 'settings'" class="flex-1 overflow-y-auto pr-2 pb-10 custom-scrollbar max-w-2xl">
          <div class="bg-white dark:bg-dash-darkcard rounded-3xl p-6 shadow-sm transition-colors space-y-8">
            <h2 class="text-2xl font-bold text-dash-text dark:text-dash-darktext">System Settings</h2>
            
            <!-- Language Setting -->
            <div class="flex items-center justify-between py-4 border-b border-gray-100 dark:border-white/10">
              <div class="flex items-center gap-3">
                <Globe class="w-5 h-5 text-dash-orange" />
                <div>
                  <h3 class="text-sm font-bold text-dash-text dark:text-dash-darktext">Language Option</h3>
                  <p class="text-xs text-dash-textmuted">Switch application language layout</p>
                </div>
              </div>
              <button 
                class="px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-dash-orange/10 dark:hover:bg-dash-orange/20 hover:text-dash-orange text-dash-text dark:text-white rounded-xl text-xs font-bold transition-all"
                @click="toggleLanguage"
              >
                {{ locale === 'en' ? 'English (RTL Arabic)' : 'العربية (LTR English)' }}
              </button>
            </div>

            <!-- Appearance Setting -->
            <div class="flex items-center justify-between py-4 border-b border-gray-100 dark:border-white/10">
              <div class="flex items-center gap-3">
                <component :is="isDark ? Sun : Moon" class="w-5 h-5 text-dash-orange" />
                <div>
                  <h3 class="text-sm font-bold text-dash-text dark:text-dash-darktext">Theme Display</h3>
                  <p class="text-xs text-dash-textmuted">Toggle display interface theme option</p>
                </div>
              </div>
              <button 
                class="px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-dash-orange/10 dark:hover:bg-dash-orange/20 hover:text-dash-orange text-dash-text dark:text-white rounded-xl text-xs font-bold transition-all"
                @click="$emit('toggle-theme')"
              >
                {{ isDark ? 'Switch Light Mode' : 'Switch Dark Mode' }}
              </button>
            </div>

            <!-- Data Settings -->
            <div class="space-y-4 pt-4">
              <h3 class="text-sm font-bold text-dash-text dark:text-dash-darktext">Local Storage Data Backup</h3>
              <p class="text-xs text-dash-textmuted">Import and export your list of tasks offline</p>
              
              <div class="flex flex-wrap gap-4">
                <button 
                  class="flex items-center gap-2 px-5 py-3 bg-dash-orange text-white rounded-xl text-sm font-bold hover:bg-dash-orange/90 active:scale-95 transition-all shadow-md shadow-dash-orange/20"
                  @click="exportTasks"
                >
                  <Download class="w-4 h-4" />
                  Export Tasks (JSON)
                </button>
                
                <input 
                  type="file" 
                  ref="fileInput" 
                  class="hidden" 
                  accept=".json" 
                  @change="handleImport" 
                />
                <button 
                  class="flex items-center gap-2 px-5 py-3 bg-dash-dark text-white rounded-xl text-sm font-bold hover:bg-dash-dark/80 active:scale-95 transition-all"
                  @click="triggerImport"
                >
                  <Upload class="w-4 h-4" />
                  Import Backup File
                </button>
                
                <button 
                  class="flex items-center gap-2 px-5 py-3 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 active:scale-95 transition-all"
                  @click="confirmClear"
                >
                  <Trash2 class="w-4 h-4" />
                  Reset Database
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
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
