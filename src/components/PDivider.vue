<template>
  <div v-if="label" class="prism-divider">{{ label }}</div>
  <hr v-else />
</template>

<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>
