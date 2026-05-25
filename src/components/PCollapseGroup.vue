<template>
  <div :class="['prism-collapse-group']" :data-accordion="accordion || undefined">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  accordion?: boolean
}>()
</script>
