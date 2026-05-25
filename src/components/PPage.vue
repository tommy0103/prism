<template>
  <div v-show="isActive" class="prism-page">
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
  registerPage: (title: string) => number
}>('prism-pages')!

const myIndex = context.registerPage(props.title)
const isActive = computed(() => context.activeIndex.value === myIndex)
</script>
