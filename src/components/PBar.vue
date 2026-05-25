<template>
  <div class="prism-bar">
    <span class="prism-bar-label">{{ label }}</span>
    <div class="prism-bar-track">
      <div :class="['prism-bar-fill', color]" :style="{ width: percent + '%' }"></div>
    </div>
    <span class="prism-bar-value">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string
  percent: number
  color?: string
}>()
</script>
