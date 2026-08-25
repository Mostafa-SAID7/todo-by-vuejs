<script setup lang="ts">
import { Search, Sun, Moon, Menu, X } from 'lucide-vue-next'

defineProps<{
  isDark: boolean
  isSidebarOpen: boolean
}>()

defineEmits<{
  toggleTheme: []
  toggleSidebar: []
}>()
</script>

<template>
  <div>
    <!-- Mobile Header Overlay (Hamburger) -->
    <div class="md:hidden flex justify-between items-center mb-2">
      <div class="w-10 h-10 rounded-full bg-dash-orange text-white flex items-center justify-center font-bold text-lg">
        S
      </div>
      <button @click="$emit('toggleSidebar')" class="text-dash-text dark:text-dash-darktext">
        <Menu v-if="!isSidebarOpen" class="w-8 h-8" />
        <X v-else class="w-8 h-8" />
      </button>
    </div>

    <!-- Header -->
    <header class="flex justify-between items-center mb-8 px-2">
      <h1 class="text-3xl font-bold text-dash-text dark:text-dash-darktext tracking-tight">My Dashboard</h1>
      <div class="flex items-center gap-6">
        <Search class="w-6 h-6 text-dash-text dark:text-dash-darktext cursor-pointer hover:text-dash-orange transition-colors" />
        <button @click="$emit('toggleTheme')" class="focus:outline-none relative w-6 h-6 overflow-hidden flex items-center justify-center">
          <transition name="theme-toggle">
            <Sun v-if="isDark" class="absolute w-6 h-6 text-dash-text dark:text-dash-darktext cursor-pointer hover:text-dash-orange" />
            <Moon v-else class="absolute w-6 h-6 text-dash-text dark:text-dash-darktext cursor-pointer hover:text-dash-orange" />
          </transition>
        </button>
      </div>
    </header>
  </div>
</template>

<style scoped>
/* Theme Toggle Animation */
.theme-toggle-enter-active,
.theme-toggle-leave-active {
  transition: all 0.5s ease;
}
.theme-toggle-enter-from {
  opacity: 0;
  transform: translateY(-20px) rotate(-90deg) scale(0.5);
}
.theme-toggle-leave-to {
  opacity: 0;
  transform: translateY(20px) rotate(90deg) scale(0.5);
}
</style>
