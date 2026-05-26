<template>
  <div :class="['prism-flow', { vertical, plain, 'no-stack': noStack }]">
    <div class="prism-flow-inner">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  vertical?: boolean
  plain?: boolean
  noStack?: boolean
}>()
</script>