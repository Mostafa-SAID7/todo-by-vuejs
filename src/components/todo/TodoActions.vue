<script setup lang="ts">
/**
 * TodoActions Component
 * Edit and delete action buttons with icons
 */

import { Pencil, Trash2 } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

interface Props {
  isDark?: boolean
}

defineProps<Props>()

defineEmits<{
  edit: []
  delete: []
}>()
</script>

<template>
  <div class="flex gap-2 ml-4">
    <Button
      variant="primary"
      size="sm"
      :is-dark="isDark"
      :icon="Pencil"
      @click="$emit('edit')"
    >
      Edit
    </Button>
    <Button
      variant="danger"
      size="sm"
      :is-dark="isDark"
      :icon="Trash2"
      @click="$emit('delete')"
    >
      Delete
    </Button>
  </div>
</template>
