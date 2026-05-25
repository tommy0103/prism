<template>
  <span :class="['prism-badge', color]"><slot /></span>
</template>

<script setup lang="ts">
defineProps<{
  color?: string
}>()
</script>
