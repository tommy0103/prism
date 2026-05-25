<template>
  <div :class="['prism-flow-node', color]"><slot /></div>
</template>

<script setup lang="ts">
defineProps<{
  color?: string
}>()
</script>
