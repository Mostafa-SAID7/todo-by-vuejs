<script setup lang="ts">
defineProps<{
  completedCount: number
  totalCount: number
}>()
</script>

<template>
  <div class="bg-white dark:bg-dash-darkcard rounded-3xl p-6 shadow-sm transition-colors">
    <div class="w-4 h-3 bg-dash-text dark:bg-dash-darktext rounded-sm mb-4"></div>
    <div class="text-sm font-medium mb-6 text-dash-text dark:text-dash-darktext">Done Tasks</div>
    <div class="flex items-baseline gap-2">
      <span class="text-6xl font-light tracking-tighter leading-none text-dash-text dark:text-dash-darktext">
        {{ completedCount }}
      </span>
      <span class="text-3xl font-light text-dash-textmuted">/</span>
      <div class="text-sm">
        <div class="font-medium text-dash-text dark:text-dash-darktext text-lg leading-none">
          {{ totalCount }}
        </div>
      </div>
    </div>
    <div class="h-1 w-full bg-dash-dark/10 dark:bg-white/10 rounded-full mt-6 overflow-hidden flex">
      <div class="h-full bg-dash-orange transition-all duration-500" :style="{ width: totalCount ? `${(completedCount / totalCount) * 100}%` : '0%' }"></div>
    </div>
  </div>
</template>
