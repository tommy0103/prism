<template>
  <div :class="['prism-grid', cols ? 'cols-' + cols : '']"><slot /></div>
</template>

<script setup lang="ts">
defineProps<{
  cols?: 2 | 3 | 4
}>()
</script>
