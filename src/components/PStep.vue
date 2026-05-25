<template>
  <li :class="['prism-step', status]">
    <div class="prism-step-title">{{ title }}</div>
    <div v-if="desc" class="prism-step-desc">{{ desc }}</div>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  status?: 'completed' | 'active' | 'danger' | 'warning'
  title: string
  desc?: string
}>()
</script>
