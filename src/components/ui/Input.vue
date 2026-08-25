<script setup lang="ts">
/**
 * Input Component
 * Reusable text input field with professional styling
 */

interface Props {
  modelValue: string
  placeholder?: string
  type?: string
  disabled?: boolean
  isDark?: boolean
  required?: boolean
}

defineProps<Props>()

defineEmits<{
  'update:modelValue': [value: string]
  keyup: [event: KeyboardEvent]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()
</script>

<template>
  <input
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :class="[
      'w-full px-4 py-3 rounded-lg border-2 focus:outline-none',
      'placeholder-[var(--text-tertiary)] text-[var(--text-primary)]',
      'bg-[var(--bg-primary)] border-[var(--border-primary)]',
      'form-input-animated input-focus input-perf',
      'disabled:opacity-50 disabled:cursor-not-allowed',
    ]"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    @keyup="$emit('keyup', $event)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  />
</template>
