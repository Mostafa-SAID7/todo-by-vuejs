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
      class="w-5 h-5 rounded cursor-pointer accent-blue-500"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span
      v-if="label"
      :class="[
        'text-sm',
        isDark ? 'text-gray-200' : 'text-gray-800',
        disabled ? 'opacity-50' : '',
      ]"
    >
      {{ label }}
    </span>
  </label>
</template>
