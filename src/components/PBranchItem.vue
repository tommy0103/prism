<template>
  <li :class="['prism-branch-item', status]">
    <span class="node"></span>
    <span v-if="cond" class="cond">{{ cond }}</span>
    <span class="path"><slot /></span>
    <div v-if="outcome" class="outcome">
      <svg class="outcome-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></svg>
      <span>{{ outcome }}</span>
    </div>
    <ul v-if="$slots.children">
      <slot name="children" />
    </ul>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  cond?: string
  outcome?: string
  status?: 'leaf' | 'danger' | 'success'
}>()
</script>
