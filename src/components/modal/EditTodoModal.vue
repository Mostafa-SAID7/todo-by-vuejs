<script setup lang="ts">
/**
 * EditTodoModal Component
 * Modal for editing existing todo items
 */

import { ref, watch } from 'vue'
import type { Todo, UpdateTodoPayload } from '@/types/todo'
import Modal from '@/components/ui/Modal.vue'
import Input from '@/components/ui/Input.vue'
import Select from '@/components/ui/Select.vue'
import Button from '@/components/ui/Button.vue'
import { useI18nWrapper } from '@/composables'
import { validateTodoText, validateCategory, validateDateFormat } from '@/utils/validators'

interface Props {
  isOpen: boolean
  todo: Todo | null
  isDark?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  save: [payload: UpdateTodoPayload]
}>()

const { t } = useI18nWrapper()

const editText = ref('')
const editCategory = ref('')
const editDueDate = ref('')
const editPriority = ref<'low' | 'medium' | 'high'>('medium')

const priorityOptions = [
  { label: t('todo.priority.low'), value: 'low' },
  { label: t('todo.priority.medium'), value: 'medium' },
  { label: t('todo.priority.high'), value: 'high' },
]

/**
 * Initialize form with todo data
 */
watch(
  () => props.todo,
  (newTodo) => {
    if (newTodo) {
      editText.value = newTodo.text
      editCategory.value = newTodo.category
      editDueDate.value = newTodo.dueDate
      editPriority.value = newTodo.priority
    }
  },
  { immediate: true }
)

const handleSave = () => {
  // Validate inputs
  if (!validateTodoText(editText.value)) {
    alert('Todo text is required and must be less than 500 characters')
    return
  }

  if (!validateCategory(editCategory.value)) {
    alert('Category must be less than 50 characters')
    return
  }

  if (!validateDateFormat(editDueDate.value)) {
    alert('Invalid date format')
    return
  }

  const payload: UpdateTodoPayload = {
    text: editText.value.trim(),
    category: editCategory.value.trim(),
    dueDate: editDueDate.value,
    priority: editPriority.value,
  }

  emit('save', payload)
  emit('close')
}
</script>

<template>
  <Modal
    :is-open="isOpen"
    size="md"
    :title="t('modal.edit.title')"
    :is-dark="isDark"
    @close="$emit('close')"
  >
    <div class="space-y-4">
      <!-- Text Input -->
      <Input
        v-model="editText"
        type="text"
        :is-dark="isDark"
        @keyup.enter="handleSave"
      />

      <!-- Category Input -->
      <Input
        v-model="editCategory"
        type="text"
        :placeholder="t('todo.categoryPlaceholder')"
        :is-dark="isDark"
      />

      <!-- Due Date Input -->
      <Input
        v-model="editDueDate"
        type="date"
        :is-dark="isDark"
      />

      <!-- Priority Select -->
      <Select
        v-model="editPriority"
        :options="priorityOptions"
        :is-dark="isDark"
      />

      <!-- Action Buttons -->
      <div class="flex justify-end gap-2 mt-6">
        <Button
          variant="secondary"
          :is-dark="isDark"
          @click="$emit('close')"
        >
          {{ t('modal.edit.cancel') }}
        </Button>
        <Button
          variant="primary"
          :is-dark="isDark"
          @click="handleSave"
        >
          {{ t('modal.edit.save') }}
        </Button>
      </div>
    </div>
  </Modal>
</template>
