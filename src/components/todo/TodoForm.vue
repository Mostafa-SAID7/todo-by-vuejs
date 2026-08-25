<script setup lang="ts">
import { ref } from 'vue'
import type { PriorityLevel, CreateTodoPayload } from '@/types/todo'
import { useI18nWrapper } from '@/composables'
import { validateTodoText, validateCategory, validateDateFormat } from '@/utils/validators'
import { Calendar, Tag } from 'lucide-vue-next'
import CustomSelect from '@/components/ui/CustomSelect.vue'

interface Props {
  isDark?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  submit: [payload: CreateTodoPayload]
}>()

const { t } = useI18nWrapper()

const text = ref('')
const category = ref('')
const dueDate = ref('')
const priority = ref<PriorityLevel>('medium')

const handleSubmit = () => {
  if (!validateTodoText(text.value)) {
    alert('Todo text is required and must be less than 500 characters')
    return
  }
  if (!validateCategory(category.value)) {
    alert('Category must be less than 50 characters')
    return
  }
  if (!validateDateFormat(dueDate.value)) {
    alert('Invalid date format')
    return
  }

  const payload: CreateTodoPayload = {
    text: text.value.trim(),
    category: category.value.trim(),
    dueDate: dueDate.value,
    priority: priority.value,
  }

  emit('submit', payload)

  text.value = ''
  category.value = ''
  dueDate.value = ''
  priority.value = 'medium'
}

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && event.ctrlKey) {
    handleSubmit()
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Text Input -->
    <div>
      <input
        v-model="text"
        type="text"
        placeholder="What needs to be done?"
        class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white/50 transition-colors"
        @keyup="handleKeyUp"
      />
    </div>

    <!-- Metadata Fields -->
    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-3 gap-3">
      <!-- Category -->
      <div class="relative">
        <Tag class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none z-10" />
        <input
          v-model="category"
          type="text"
          placeholder="Category"
          class="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/50 transition-colors"
        />
      </div>

      <!-- Date -->
      <div class="relative">
        <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none z-10" />
        <input
          v-model="dueDate"
          type="date"
          class="todo-form-date w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
        />
      </div>

      <!-- Priority -->
      <div>
        <CustomSelect
          v-model="priority"
          :options="[
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ]"
          variant="ghost"
        />
      </div>
    </div>

    <!-- Submit Button -->
    <button
      type="button"
      class="w-full bg-white text-dash-orange font-bold rounded-xl py-3 mt-2 hover:bg-white/90 active:scale-[0.98] transition-all"
      @click="handleSubmit"
    >
      Add Todo
    </button>
  </div>
</template>

<style scoped>
/* Date picker icon — white (for orange card context) */
.todo-form-date::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.2s;
}

.todo-form-date::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}

/* Ensure native date text color on webkit */
.todo-form-date::-webkit-datetime-edit {
  color: white;
}

.todo-form-date::-webkit-datetime-edit-fields-wrapper {
  color: white;
}

.todo-form-date::-webkit-datetime-edit-text {
  color: rgba(255, 255, 255, 0.6);
}

.todo-form-date::-webkit-datetime-edit-day-field,
.todo-form-date::-webkit-datetime-edit-month-field,
.todo-form-date::-webkit-datetime-edit-year-field {
  color: white;
}

.todo-form-date::-webkit-inner-spin-button {
  display: none;
}
</style>
