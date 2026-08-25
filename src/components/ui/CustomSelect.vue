<script setup lang="ts">
/**
 * CustomSelect Component
 * Fully custom styled dropdown — bypasses native select limitations
 * to allow rich option styling in both light and dark modes.
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

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
  variant?: 'default' | 'ghost'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  disabled: false,
  isDark: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  const found = props.options.find(o => o.value === props.modelValue)
  return found ? found.label : props.placeholder ?? 'Select...'
})

const isPlaceholder = computed(() => {
  return !props.options.find(o => o.value === props.modelValue)
})

const select = (option: Option) => {
  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
}

const toggle = () => {
  if (!props.disabled) isOpen.value = !isOpen.value
}

const handleOutsideClick = (e: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleOutsideClick))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleOutsideClick))
</script>

<template>
  <div ref="containerRef" class="relative w-full select-none" :class="{ 'opacity-50 pointer-events-none': disabled }">
    <!-- Trigger Button -->
    <button
      type="button"
      :class="[
        'w-full flex items-center justify-between pl-4 pr-3 py-2.5 rounded-lg border transition-all duration-150',
        'focus:outline-none focus:ring-2 focus:ring-dash-orange/20 focus:border-dash-orange',
        'hover:border-dash-orange/50',
        variant === 'default'
          ? 'bg-white dark:bg-dash-darkcard border-gray-200 dark:border-white/10'
          : 'bg-white/10 border-white/20 hover:border-white/50',
        isOpen ? 'border-dash-orange ring-2 ring-dash-orange/20' : '',
      ]"
      @click="toggle"
    >
      <span :class="[
        'text-sm truncate',
        variant === 'default'
          ? (isPlaceholder ? 'text-dash-textmuted' : 'text-dash-text dark:text-dash-darktext')
          : (isPlaceholder ? 'text-white/50' : 'text-white'),
      ]">
        {{ selectedLabel }}
      </span>
      <!-- Animated chevron -->
      <svg
        :class="['w-4 h-4 shrink-0 ml-2 transition-transform duration-200', isOpen ? 'rotate-180' : '']"
        :style="variant === 'default' ? {} : { color: 'rgba(255,255,255,0.6)' }"
        class="text-dash-textmuted"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Panel -->
    <Transition
      enter-active-class="transition-all duration-150 ease-out"
      enter-from-class="opacity-0 scale-y-95 -translate-y-1"
      enter-to-class="opacity-100 scale-y-100 translate-y-0"
      leave-active-class="transition-all duration-100 ease-in"
      leave-from-class="opacity-100 scale-y-100 translate-y-0"
      leave-to-class="opacity-0 scale-y-95 -translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute z-[9999] top-full mt-1.5 w-full rounded-xl overflow-hidden shadow-xl origin-top"
        :class="[
          variant === 'default'
            ? 'bg-white dark:bg-dash-darkcard border border-gray-200 dark:border-white/10'
            : 'bg-dash-dark border border-white/10'
        ]"
      >
        <div class="py-1 max-h-52 overflow-y-auto">
          <button
            v-for="option in options"
            :key="option.value"
            type="button"
            :class="[
              'w-full text-left px-4 py-2.5 text-sm transition-colors duration-100 flex items-center gap-2',
              option.value === modelValue
                ? (variant === 'default'
                    ? 'bg-dash-orange/10 text-dash-orange font-semibold'
                    : 'bg-dash-orange text-white font-semibold')
                : (variant === 'default'
                    ? 'text-dash-text dark:text-dash-darktext hover:bg-dash-orange/5 dark:hover:bg-white/5'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'),
            ]"
            @click="select(option)"
          >
            <!-- Active tick -->
            <span class="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
              <svg
                v-if="option.value === modelValue"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"
                class="w-3 h-3"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            {{ option.label }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
