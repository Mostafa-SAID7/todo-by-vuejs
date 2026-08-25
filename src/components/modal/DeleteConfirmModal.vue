<script setup lang="ts">
/**
 * DeleteConfirmModal Component
 * Confirmation modal for deleting todos
 */

import type { Todo } from '@/types/todo'
import Modal from '@/components/ui/Modal.vue'
import Button from '@/components/ui/Button.vue'
import { useI18nWrapper } from '@/composables'

interface Props {
  isOpen: boolean
  todo: Todo | null
  isDark?: boolean
}

defineProps<Props>()

defineEmits<{
  close: []
  confirm: []
}>()

const { t } = useI18nWrapper()
</script>

<template>
  <Modal
    :is-open="isOpen"
    size="sm"
    :title="t('modal.delete.title')"
    :is-dark="isDark"
    @close="$emit('close')"
  >
    <div class="space-y-4">
      <!-- Message -->
      <p
        :class="[
          isDark ? 'text-gray-300' : 'text-gray-600',
        ]"
      >
        {{ t('modal.delete.message') }}
      </p>

      <!-- Todo Text -->
      <p
        :class="[
          'font-medium',
          isDark ? 'text-white' : 'text-gray-800',
        ]"
      >
        "{{ todo?.text }}"
      </p>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-2 mt-6">
        <Button
          variant="secondary"
          :is-dark="isDark"
          @click="$emit('close')"
        >
          {{ t('modal.delete.cancel') }}
        </Button>
        <Button
          variant="danger"
          :is-dark="isDark"
          @click="$emit('confirm')"
        >
          {{ t('modal.delete.confirm') }}
        </Button>
      </div>
    </div>
  </Modal>
</template>
