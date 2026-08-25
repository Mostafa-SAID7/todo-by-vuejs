<script setup lang="ts">
/**
 * Container Component
 * Main application container with consistent padding and max width
 */

import { CONTAINER_MAX_WIDTH, CONTAINER_PADDING, CARD_LIGHT, CARD_DARK } from '@/constants/ui'

interface Props {
  isDark?: boolean
  withCard?: boolean
}

withDefaults(defineProps<Props>(), {
  isDark: false,
  withCard: true,
})
</script>

<template>
  <div
    :class="[
      'mx-auto',
      CONTAINER_MAX_WIDTH,
      CONTAINER_PADDING,
      withCard && (isDark ? CARD_DARK : CARD_LIGHT),
      withCard ? 'rounded-lg shadow-lg' : '',
    ]"
  >
    <slot />
  </div>
</template>
