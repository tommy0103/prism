<template>
  <div class="prism-stacked-bar">
    <div class="prism-stacked-track">
      <div v-for="(seg, i) in segments" :key="i" :class="['prism-stacked-segment', seg.color]" :style="{ width: seg.percent + '%' }"></div>
    </div>
    <div v-if="legend" class="prism-stacked-legend">
      <span v-for="(item, i) in legend" :key="i" class="prism-stacked-legend-item">
        <span class="prism-stacked-legend-dot" :style="{ background: item.color }"></span>
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  segments: Array<{ percent: number; color: string }>
  legend?: Array<{ label: string; color: string }>
}>()
</script>
