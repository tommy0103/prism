<template>
  <div
    :class="[
      'prism-flow-node',
      color,
      type,
      { filled, 'has-subtitle': !!subtitle }
    ]"
  >
    <template v-if="subtitle">
      <span class="prism-flow-node-title"><slot /></span>
      <span class="prism-flow-node-subtitle">{{ subtitle }}</span>
    </template>
    <template v-else>
      <slot />
      <span v-if="meta" class="prism-flow-node-meta">{{ meta }}</span>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  /** 语义色 — 默认只染 border-left(轻量化) */
  color?: 'accent' | 'success' | 'warning' | 'danger' | 'purple'
  /** 节点形态,可以和 color 组合 */
  type?: 'store' | 'external' | 'decision'
  /** 旧的"全染色"行为,需显式启用 */
  filled?: boolean
  /** 右侧 mono chip,短信息用(12ms, ×32, v2.1) */
  meta?: string
  /** 副标题,长信息用(POST /api/v2/payments)。设置后 meta 被忽略 */
  subtitle?: string
}>()
</script>