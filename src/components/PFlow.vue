<template>
  <div :class="['prism-flow', { vertical }]"><slot /></div>
</template>

<script setup lang="ts">
defineProps<{
  vertical?: boolean
}>()
</script>
