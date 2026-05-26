<template>
  <span class="prism-term" :data-first="first || undefined">
    <slot />
    <span class="prism-term-pop">
      <span class="term-name">{{ word }}</span>
      <span class="term-def">{{ def }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  word: string
  def: string
  first?: boolean
}>()
</script>
