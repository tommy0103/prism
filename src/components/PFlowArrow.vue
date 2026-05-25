<template>
  <div class="prism-flow-arrow" :style="label ? { minWidth: Math.max(5, label.length * 0.65 + 1.5) + 'em' } : undefined">
    <span v-if="label" class="prism-flow-label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>
