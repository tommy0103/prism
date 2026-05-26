<template>
  <div :class="['prism-flow-arrow', variant]">
    <svg
      v-if="!isVertical"
      class="prism-flow-arrow-svg"
      viewBox="0 0 48 16"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line class="arrow-line" x1="0" y1="8" x2="42" y2="8" />
      <polyline class="arrow-head" points="38,4 44,8 38,12" />
    </svg>
    <svg
      v-else
      class="prism-flow-arrow-svg"
      viewBox="0 0 16 36"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line class="arrow-line" x1="8" y1="0" x2="8" y2="30" />
      <polyline class="arrow-head" points="4,26 8,32 12,26" />
    </svg>
    <span
      v-if="label"
      class="prism-flow-label"
      :class="{ terse: isTerse }"
    >{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'

const props = defineProps<{
  /** 流转条件 / 触发原因。短词为主(miss, 2xx, event, retry…) */
  label?: string
  /** 箭头视觉变体 */
  variant?: 'dashed' | 'thick' | 'async' | 'fail'
  /**
   * 强制标签不换行。不传时按 label 长度自动判断:
   * ≤ 8 字符 → terse(单行),> 8 → 允许换行
   */
  terse?: boolean
}>()

// 从父 <PFlow> 注入 vertical 状态
const verticalRef = inject<Ref<boolean | undefined>>('prism-flow-vertical')
const isVertical = computed(() => !!verticalRef?.value)

// 自动判定短标签
const isTerse = computed(() => {
  if (props.terse !== undefined) return props.terse
  return !!props.label && props.label.length <= 8
})
</script>