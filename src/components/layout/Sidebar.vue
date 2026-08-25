<script setup lang="ts">
import { 
  Home, 
  ListTodo, 
  FolderHeart, 
  Sparkles, 
  Settings,
  CircleDot
} from 'lucide-vue-next'

defineProps<{
  activeTab: string
  isOpen: boolean
}>()

defineEmits<{
  'update:activeTab': [tab: string]
}>()

const menuItems = [
  { id: 'home', label: 'Home Dashboard', icon: Home },
  { id: 'tasks', label: 'All Tasks', icon: ListTodo },
  { id: 'projects', label: 'Projects', icon: FolderHeart },
  { id: 'apps', label: 'AI Suggestion Apps', icon: Sparkles },
]
</script>

<template>
  <aside :class="[
    'w-full md:w-20 bg-dash-dark rounded-[2rem] flex flex-col items-center py-6 shadow-xl relative z-20 transition-all duration-300',
    'md:h-[calc(100vh-3rem)] md:sticky md:top-6',
    isOpen ? 'block' : 'hidden md:flex'
  ]">
    <!-- Logo -->
    <div 
      class="hidden md:flex w-10 h-10 rounded-full bg-dash-orange text-white items-center justify-center font-bold text-lg mb-10 shrink-0 cursor-pointer hover:scale-105 transition-transform"
      @click="$emit('update:activeTab', 'home')"
    >
      S
    </div>
    
    <!-- Navigation Menu Items -->
    <nav class="flex-1 flex flex-row md:flex-col items-center gap-8 md:mt-0 mt-4 px-4 md:px-0">
      <div 
        v-for="item in menuItems" 
        :key="item.id"
        class="relative group cursor-pointer"
        @click="$emit('update:activeTab', item.id)"
      >
        <div :class="[
          'p-3 rounded-2xl transition-all duration-300 relative flex items-center justify-center',
          activeTab === item.id 
            ? 'bg-dash-orange text-white scale-110 shadow-lg shadow-dash-orange/30' 
            : 'text-white/60 hover:text-white hover:bg-white/10'
        ]">
          <component :is="item.icon" class="w-5 h-5" />
          
          <!-- Small active indicator dot underneath icon on mobile / next to it on desktop -->
          <span 
            v-if="activeTab === item.id" 
            class="absolute bottom-1 w-1 h-1 rounded-full bg-white md:hidden"
          ></span>
        </div>

        <!-- Tooltip -->
        <div class="absolute left-14 top-1/2 -translate-y-1/2 bg-dash-dark text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-md">
          {{ item.label }}
        </div>
      </div>
    </nav>
    
    <!-- Settings Button (Bottom) -->
    <div 
      class="mt-8 md:mt-auto relative group shrink-0 cursor-pointer"
      @click="$emit('update:activeTab', 'settings')"
    >
      <div :class="[
        'p-3 rounded-2xl transition-all duration-300 flex items-center justify-center',
        activeTab === 'settings' 
          ? 'bg-dash-orange text-white scale-110 shadow-lg shadow-dash-orange/30' 
          : 'text-white/60 hover:text-white hover:bg-white/10'
      ]">
        <Settings :class="[
          'w-5 h-5 transition-transform duration-500',
          activeTab === 'settings' ? 'rotate-45' : 'group-hover:rotate-45'
        ]" />
      </div>
      <div class="absolute left-14 top-1/2 -translate-y-1/2 bg-dash-dark text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-md">
        Settings
      </div>
    </div>
  </aside>
</template>

