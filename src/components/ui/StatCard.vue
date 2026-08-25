<script setup lang="ts">
defineProps<{
  value: number | string
  title: string
  subtitle: string
  isDarkTheme?: boolean
}>()
</script>

<template>
  <div :class="[
    'rounded-3xl p-6 shadow-sm flex items-center justify-between transition-colors',
    isDarkTheme ? 'bg-dash-dark text-white' : 'bg-white dark:bg-dash-darkcard'
  ]">
    <div class="flex items-center gap-3">
      <div :class="['w-1.5 h-1.5 rounded-full', isDarkTheme ? 'bg-white' : 'bg-dash-text dark:bg-dash-darktext']"></div>
      <span :class="['text-5xl font-light tracking-tighter', isDarkTheme ? 'text-dash-orange' : 'text-dash-text dark:text-dash-darktext']">
        {{ value }}
      </span>
    </div>
    <div class="text-sm">
      <div :class="['font-medium', isDarkTheme ? '' : 'text-dash-text dark:text-dash-darktext']">
        {{ title }}
      </div>
      <div :class="isDarkTheme ? 'text-dash-textmuted' : 'text-dash-orange'">
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>
