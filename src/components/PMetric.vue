<template>
  <div class="prism-metric">
    <div class="prism-metric-value">{{ value }}</div>
    <div class="prism-metric-label">{{ label }}</div>
    <div v-if="delta" :class="['prism-metric-delta', deltaDir]">{{ delta }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string
  label: string
  delta?: string
  deltaDir?: 'up' | 'down'
}>()
</script>
