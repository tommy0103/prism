<template>
  <ol class="prism-steps" :style="progressStyle">
    <slot />
  </ol>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /**
   * 轨道线进度。0-100 的数字(百分比),或 CSS 字符串如 "40%"。
   * 不传时默认 50%。
   */
  progress?: number | string
}>()

const progressStyle = computed(() => {
  if (props.progress === undefined) return undefined
  const v = typeof props.progress === 'number' ? `${props.progress}%` : props.progress
  return { '--progress': v }
})
</script>