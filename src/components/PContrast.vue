<template>
  <div class="prism-contrast">
    <div class="prism-contrast-header">
      <svg class="prism-contrast-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
      <span class="word">{{ word }}</span>
      <span v-if="desc" class="tail">{{ desc }}</span>
    </div>
    <div class="prism-contrast-cols">
      <div class="prism-contrast-col">
        <slot name="left" />
      </div>
      <div class="prism-contrast-col">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  word: string
  desc?: string
}>()
</script>
