<template>
  <div class="prism-branch">
    <div class="prism-branch-root">
      <svg class="prism-branch-root-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l10 10-10 10L2 12z"/></svg>
      <span>{{ root }}</span>
    </div>
    <ul>
      <slot />
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  root: string
}>()
</script>
