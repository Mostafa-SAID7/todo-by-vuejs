<script setup lang="ts">
/**
 * Select Component
 * Reusable select dropdown with professional styling
 */

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
  <select
    :value="modelValue"
    :disabled="disabled"
    :required="required"
    :class="[
      'w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200',
      'placeholder-[var(--text-tertiary)] text-[var(--text-primary)]',
      'bg-[var(--bg-primary)] border-[var(--border-primary)]',
      'focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'appearance-none bg-no-repeat bg-right pr-10',
      'cursor-pointer hover:border-[var(--border-secondary)]',
    ]"
    @change="
      $emit('update:modelValue', ($event.target as HTMLSelectElement).value);
      $emit('change', $event);
    "
  >
    <option v-if="placeholder" value="" disabled>
      {{ placeholder }}
    </option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
