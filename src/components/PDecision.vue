<template>
  <div class="prism-decision" :data-status="status">
    <div class="prism-decision-header">
      <div class="prism-decision-title"><slot name="title" /></div>
      <span class="prism-decision-verdict">{{ verdict }}</span>
    </div>
    <div class="prism-decision-body"><slot /></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  status: 'approved' | 'rejected' | 'exploring' | 'pending'
  verdict: string
}>()
</script>
