<script setup lang="ts">
/**
 * TodoForm Component
 * Form for creating new todos
 */

import { ref } from 'vue'
import type { PriorityLevel, CreateTodoPayload } from '@/types/todo'
import Input from '@/components/ui/Input.vue'
import Select from '@/components/ui/Select.vue'
import Button from '@/components/ui/Button.vue'
import { useI18nWrapper } from '@/composables'
import { validateTodoText, validateCategory, validateDateFormat } from '@/utils/validators'

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

const priorityOptions = [
  { label: t('todo.priority.low'), value: 'low' },
  { label: t('todo.priority.medium'), value: 'medium' },
  { label: t('todo.priority.high'), value: 'high' },
]

const handleSubmit = () => {
  // Validate inputs
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

  // Reset form
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
  <div class="space-y-4 mb-6">
    <!-- Text Input -->
    <div class="relative">
      <Input
        v-model="text"
        type="text"
        :placeholder="t('todo.addPlaceholder')"
        :is-dark="isDark"
        @keyup="handleKeyUp"
      />
    </div>

    <!-- Metadata Fields -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Input
        v-model="category"
        type="text"
        :placeholder="t('todo.categoryPlaceholder')"
        :is-dark="isDark"
      />

      <Input
        v-model="dueDate"
        type="date"
        :is-dark="isDark"
      />

      <Select
        v-model="priority"
        :options="priorityOptions"
        :is-dark="isDark"
      />
    </div>

    <!-- Submit Button -->
    <Button
      type="button"
      variant="primary"
      full-width
      :is-dark="isDark"
      @click="handleSubmit"
    >
      {{ t('todo.add') }}
    </Button>
  </div>
</template>
