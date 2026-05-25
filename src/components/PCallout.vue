<template>
  <div :class="['prism-callout', type]">
    <div v-if="icon" class="prism-callout-icon">{{ icon }}</div>
    <div class="prism-callout-content"><slot /></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'info' | 'success' | 'warning' | 'danger' | 'purple'
  icon?: string
}>()
</script>
