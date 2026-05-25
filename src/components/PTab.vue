<template>
  <div v-show="isActive" class="prism-tab-pane">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, computed, type ComputedRef } from 'vue'

const props = defineProps<{
  title: string
}>()

const context = inject<{
  activeIndex: ComputedRef<number>
  registerTab: (title: string) => number
}>('prism-tabs')!

const myIndex = context.registerTab(props.title)
const isActive = computed(() => context.activeIndex.value === myIndex)
</script>
