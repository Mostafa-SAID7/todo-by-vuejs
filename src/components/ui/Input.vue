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
      'dash-input w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-dash-orange/20 transition-all duration-200',
      'placeholder-dash-textmuted dark:placeholder-white/40 text-dash-text dark:text-dash-darktext',
      'bg-white dark:bg-dash-darkcard border-gray-200 dark:border-white/10 focus:border-dash-orange',
      'disabled:opacity-50 disabled:cursor-not-allowed',
    ]"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    @keyup="$emit('keyup', $event)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  />
</template>

<style scoped>
/* Calendar / date picker icon — light mode */
.dash-input[type='date']::-webkit-calendar-picker-indicator,
.dash-input[type='datetime-local']::-webkit-calendar-picker-indicator,
.dash-input[type='month']::-webkit-calendar-picker-indicator,
.dash-input[type='week']::-webkit-calendar-picker-indicator {
  cursor: pointer;
  border-radius: 4px;
  opacity: 0.6;
  transition: opacity 0.2s;
  filter: none;
}

.dash-input[type='date']::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}

/* Calendar icon — dark mode (invert to white) */
:global(.dark) .dash-input[type='date']::-webkit-calendar-picker-indicator,
:global(.dark) .dash-input[type='datetime-local']::-webkit-calendar-picker-indicator,
:global(.dark) .dash-input[type='month']::-webkit-calendar-picker-indicator,
:global(.dark) .dash-input[type='week']::-webkit-calendar-picker-indicator {
  filter: invert(1) brightness(0.8);
  opacity: 0.6;
}

:global(.dark) .dash-input[type='date']::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
</style>
