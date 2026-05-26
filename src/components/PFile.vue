<template>
  <li
    :class="['prism-file-item', status && `prism-file-${status}`]"
  >
    <div class="prism-file-item-bar"></div>
    <div class="prism-file-item-body">
      <div class="prism-file-item-path">{{ path }}</div>
      <div v-if="hasPurpose" class="prism-file-item-purpose">
        <slot>{{ purpose }}</slot>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

const props = defineProps<{
  /** 文件路径 */
  path: string
  /** Diff 状态。不传则不渲染色条 */
  status?: 'added' | 'modified' | 'deleted'
  /** 文件用途。也可以用默认 slot */
  purpose?: string
}>()

const slots = useSlots()
const hasPurpose = computed(() => !!props.purpose || !!slots.default)
</script>