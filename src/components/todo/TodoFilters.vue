<script setup lang="ts">
/**
 * TodoFilters Component
 * Filter and sort controls for todos
 */

import type { FilterStatus, SortOption } from '@/types/todo'
import { FILTER_OPTIONS, SORT_OPTIONS } from '@/constants'
import Select from '@/components/ui/Select.vue'

interface Props {
  filterStatus: FilterStatus
  sortBy: SortOption
  isDark?: boolean
}

defineProps<Props>()

defineEmits<{
  'update:filterStatus': [value: FilterStatus]
  'update:sortBy': [value: SortOption]
}>()

const filterOptions = Object.entries(FILTER_OPTIONS).map(([_, config]: [string, any]) => ({
  label: config.label,
  value: config.value,
}))

const sortOptions = Object.entries(SORT_OPTIONS).map(([_, config]: [string, any]) => ({
  label: config.label,
  value: config.value,
}))
</script>

<template>
  <div class="flex flex-wrap gap-4 mb-6">
    <Select
      :model-value="filterStatus"
      :options="filterOptions"
      :is-dark="isDark"
      @update:model-value="$emit('update:filterStatus', $event as FilterStatus)"
    />

    <Select
      :model-value="sortBy"
      :options="sortOptions"
      :is-dark="isDark"
      @update:model-value="$emit('update:sortBy', $event as SortOption)"
    />
  </div>
</template>
