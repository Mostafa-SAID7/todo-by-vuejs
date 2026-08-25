<script setup lang="ts">
/**
 * Checkbox Component
 * Reusable checkbox with theme support
 */

interface Props {
  modelValue: boolean
  disabled?: boolean
  isDark?: boolean
  label?: string
}

defineProps<Props>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <label class="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="w-5 h-5 rounded cursor-pointer accent-dash-orange border-gray-300 dark:border-white/10 dark:bg-white/5 focus:ring-0"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span
      v-if="label"
      :class="[
        'text-sm text-dash-text dark:text-dash-darktext',
        disabled ? 'opacity-50' : '',
      ]"
    >
      {{ label }}
    </span>
  </label>
</template>
