<script setup lang="ts">
import TodoForm from '@/components/todo/TodoForm.vue'
import type { CreateTodoPayload } from '@/types/todo'

defineEmits<{
  submit: [payload: CreateTodoPayload]
}>()
</script>

<template>
  <div class="bg-dash-orange rounded-3xl p-6 shadow-md text-white flex flex-col relative overflow-hidden">
    <h2 class="text-2xl font-medium leading-tight mb-4 relative z-10">
      Add New Task
    </h2>
    <div class="relative z-10 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
      <TodoForm :is-dark="true" @submit="$emit('submit', $event)" />
    </div>
  </div>
</template>
