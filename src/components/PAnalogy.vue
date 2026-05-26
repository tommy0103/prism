<template>
  <div class="prism-analogy">
    <div class="prism-analogy-row">
      <div class="prism-analogy-side source">
        <div class="role"><span class="role-icon"></span>{{ sourceLabel || '源域' }}</div>
        <div class="term">{{ source }}</div>
        <div v-if="sourceDesc" class="gloss">{{ sourceDesc }}</div>
      </div>
      <div class="prism-analogy-bridge">≈</div>
      <div class="prism-analogy-side target">
        <div class="role"><span class="role-icon"></span>{{ targetLabel || '目标' }}</div>
        <div class="term">{{ target }}</div>
        <div v-if="targetDesc" class="gloss">{{ targetDesc }}</div>
      </div>
    </div>
    <div v-if="because" class="prism-analogy-because">
      <svg class="prism-analogy-because-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 10 20 15 15 20"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>
      <span>{{ because }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  source: string
  sourceDesc?: string
  sourceLabel?: string
  target: string
  targetDesc?: string
  targetLabel?: string
  because?: string
}>()
</script>
