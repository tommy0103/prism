<template>
  <li
    class="prism-step"
    :data-progress="resolvedProgress"
    :data-flag="resolvedFlag"
  >
    <div class="prism-step-num">
      <span v-if="resolvedFlag" class="prism-step-flag">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <template v-if="resolvedFlag === 'warning'">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </template>
          <template v-else-if="resolvedFlag === 'danger'">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </template>
          <template v-else-if="resolvedFlag === 'success'">
            <polyline points="20 6 9 17 4 12" stroke-width="3"/>
          </template>
          <template v-else-if="resolvedFlag === 'info'">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </template>
        </svg>
        <span>{{ flagLabel || flagDefaults[resolvedFlag] }}</span>
      </span>
    </div>
    <div class="prism-step-title">{{ title }}</div>
    <div v-if="desc" class="prism-step-desc">{{ desc }}</div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** 标题 */
  title: string
  /** 描述(可选) */
  desc?: string

  /** 进度状态:done / active / todo(默认 todo) */
  progress?: 'done' | 'active' | 'todo'
  /** 内容标记(可选) */
  flag?: 'warning' | 'danger' | 'success' | 'info'
  /** flag 旁的短标签文字。不传则用默认词 */
  flagLabel?: string

  /**
   * 旧 API,向后兼容。映射规则:
   *   completed → progress=done
   *   active    → progress=active
   *   danger    → progress=active + flag=danger
   *   warning   → progress=todo   + flag=warning
   * 新代码请改用 progress + flag。
   */
  status?: 'completed' | 'active' | 'danger' | 'warning'
}>()

/** 把 status 解析成 progress + flag */
const resolvedProgress = computed<'done' | 'active' | 'todo'>(() => {
  if (props.progress) return props.progress
  switch (props.status) {
    case 'completed': return 'done'
    case 'active':    return 'active'
    case 'danger':    return 'active'
    case 'warning':   return 'todo'
    default:          return 'todo'
  }
})

const resolvedFlag = computed<'warning' | 'danger' | 'success' | 'info' | undefined>(() => {
  if (props.flag) return props.flag
  if (props.status === 'danger')  return 'danger'
  if (props.status === 'warning') return 'warning'
  return undefined
})

const flagDefaults: Record<string, string> = {
  warning: 'REVIEW',
  danger: 'BLOCKED',
  success: 'PASSED',
  info: 'NOTE',
}
</script>