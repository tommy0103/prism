<template>
  <div class="prism-tabs">
    <div class="prism-tabs-header">
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        :class="['prism-tabs-btn', { active: activeIndex === i }]"
        @click="activeIndex = i"
      >{{ tab }}</button>
    </div>
    <div class="prism-tabs-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed } from 'vue'

const activeIndex = ref(0)
const tabs = ref<string[]>([])

function registerTab(title: string): number {
  const index = tabs.value.length
  tabs.value.push(title)
  return index
}

provide('prism-tabs', { activeIndex: computed(() => activeIndex.value), registerTab })
</script>
