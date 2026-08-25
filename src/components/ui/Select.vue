<script setup lang="ts">
/**
 * Select Component
 * Delegates to CustomSelect for full styling control.
 */
import CustomSelect from './CustomSelect.vue'

interface Option {
  label: string
  value: string | number
}

interface Props {
  modelValue: string | number
  options: Option[]
  placeholder?: string
  disabled?: boolean
  isDark?: boolean
  required?: boolean
}

defineProps<Props>()

defineEmits<{
  'update:modelValue': [value: string | number]
  change: [event: Event]
}>()
</script>

<template>
  <CustomSelect
    :model-value="modelValue"
    :options="options"
    :placeholder="placeholder"
    :disabled="disabled"
    variant="default"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
