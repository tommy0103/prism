<template>
  <div :class="['prism-flow', { vertical, plain }]"><slot /></div>
</template>

<script setup lang="ts">
import { provide, toRef } from 'vue'
const props = defineProps<{
  /** 纵向布局 */
  vertical?: boolean
  /** 去掉容器底色,放在密集正文里用 */
  plain?: boolean
}>()
provide('prism-flow-vertical', toRef(props, 'vertical'))
</script>