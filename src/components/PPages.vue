<template>
  <div class="prism-pages">
    <div class="prism-pages-bar">
      <button
        v-for="(page, i) in pages"
        :key="i"
        :class="['prism-pages-btn', { active: activeIndex === i }]"
        @click="activeIndex = i"
      >{{ page }}</button>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed } from 'vue'

const activeIndex = ref(0)
const pages = ref<string[]>([])

function registerPage(title: string): number {
  const index = pages.value.length
  pages.value.push(title)
  return index
}

provide('prism-pages', { activeIndex: computed(() => activeIndex.value), registerPage })
</script>
