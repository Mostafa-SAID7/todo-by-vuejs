<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
</script>

<template>
  <div class="bg-white dark:bg-dash-darkcard rounded-3xl p-6 shadow-sm flex-1 flex flex-col transition-colors">
    <div class="flex justify-between items-start mb-12">
      <div class="w-4 h-1 bg-dash-text dark:bg-dash-darktext mt-2"></div>
      <div class="w-8 h-8 rounded-full bg-dash-dark text-white flex items-center justify-center cursor-pointer">
        <ArrowUpRight class="w-4 h-4" />
      </div>
    </div>
    <div class="font-medium text-lg leading-tight mb-8 text-dash-text dark:text-dash-darktext">Productivity<br/>Score</div>
    
    <div class="mt-auto">
      <div class="flex items-end gap-3 mb-6">
        <span class="text-6xl font-light tracking-tighter leading-none text-dash-text dark:text-dash-darktext">83%</span>
        <div class="text-sm text-dash-textmuted pb-1">
          <div class="font-medium text-dash-text dark:text-dash-darktext">Today</div>
        </div>
      </div>
      
      <!-- Bar Chart Mockup -->
      <div class="flex items-end justify-between h-24 gap-2">
        <div class="w-full bg-dash-dark rounded-t-sm h-[20%]"></div>
        <div class="w-full bg-dash-dark rounded-t-sm h-[40%] relative">
          <div class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-dash-orange -rotate-90 origin-left">Today</div>
          <div class="absolute inset-0 bg-dash-orange rounded-t-sm h-full"></div>
        </div>
        <div class="w-full bg-dash-dark rounded-t-sm h-[60%]"></div>
        <div class="w-full bg-dash-dark rounded-t-sm h-[30%]"></div>
        <div class="w-full bg-dash-dark rounded-t-sm h-[50%]"></div>
      </div>
    </div>
  </div>
</template>
