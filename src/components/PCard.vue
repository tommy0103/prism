<template>
  <div class="prism-card">
    <div v-if="$slots.header || title" class="prism-card-header">
      <slot name="header">
        <div class="prism-card-title">{{ title }}</div>
      </slot>
    </div>
    <div class="prism-card-body"><slot /></div>
    <div v-if="$slots.footer" class="prism-card-footer"><slot name="footer" /></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>
