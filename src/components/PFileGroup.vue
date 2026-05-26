<template>
  <div class="prism-file-group">
    <div class="prism-file-group-header">
      <span class="prism-file-group-name">{{ module }}</span>
      <div class="prism-file-group-meta">
        <span v-if="activeStatuses.length > 0" class="prism-file-group-legend">
          <span
            v-for="status in activeStatuses"
            :key="status"
            :class="['prism-file-group-legend-item', `is-${status}`]"
          >
            <span class="prism-file-group-legend-bar"></span>{{ status }}
          </span>
        </span>
        <span class="prism-file-group-count">{{ fileCount }} files</span>
      </div>
    </div>
    <ul class="prism-file-group-files">
      <slot />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, type VNode, Comment, Fragment } from 'vue'

defineProps<{
  /** 目录/模块名 */
  module: string
}>()

const slots = useSlots()

/** 展开 slot 拿到所有 PFile 的 vnode */
function flatten(nodes: VNode[] | undefined): VNode[] {
  if (!nodes) return []
  const out: VNode[] = []
  for (const node of nodes) {
    if (node.type === Comment) continue
    if (node.type === Fragment && Array.isArray(node.children)) {
      out.push(...flatten(node.children as VNode[]))
    } else {
      out.push(node)
    }
  }
  return out
}

const childFiles = computed(() => flatten(slots.default?.()))

const fileCount = computed(() => childFiles.value.length)

/** 收集出现过的 status,保持 added → modified → deleted 顺序 */
const activeStatuses = computed<Array<'added' | 'modified' | 'deleted'>>(() => {
  const set = new Set<string>()
  for (const vnode of childFiles.value) {
    const s = (vnode.props?.status as string) || ''
    if (s === 'added' || s === 'modified' || s === 'deleted') {
      set.add(s)
    }
  }
  const order: Array<'added' | 'modified' | 'deleted'> = ['added', 'modified', 'deleted']
  return order.filter(s => set.has(s))
})
</script>
