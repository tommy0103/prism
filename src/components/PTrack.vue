<template>
  <div class="prism-track" :data-lane="lane" :data-flag="flag">
    <div class="prism-track-lane" aria-hidden="true"></div>
    <div class="prism-track-body">
      <div class="prism-track-head">
        <span class="prism-track-title">{{ title }}</span>
        <span v-if="flag" class="prism-track-flag">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
               aria-hidden="true">
            <template v-if="flag === 'passed'">
              <polyline points="20 6 9 17 4 12" stroke-width="3"/>
            </template>
            <template v-else-if="flag === 'polish'">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>
            </template>
            <template v-else-if="flag === 'at-risk'">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </template>
            <template v-else-if="flag === 'blocked'">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </template>
            <template v-else-if="flag === 'note'">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </template>
          </svg>
          <span>{{ flagLabel || flagDefaults[flag] }}</span>
        </span>
      </div>
      <div v-if="hasContent" class="prism-track-desc">
        <slot>{{ desc }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

const props = defineProps<{
  /** 轨道标题 */
  title: string
  /** 描述(可选,也可以用默认 slot) */
  desc?: string
  /**
   * 状态评级。语义化命名:
   *   passed   — 完成且无问题
   *   polish   — 需要打磨/精修
   *   at-risk  — 有风险/警告
   *   blocked  — 严重阻塞
   *   note     — 中性补充说明
   */
  flag?: 'passed' | 'polish' | 'at-risk' | 'blocked' | 'note'
  /** 自定义 flag 标签文字。不传则用默认词 */
  flagLabel?: string
  /**
   * 显式指定 lane 色号(1-5)。不传时由 CSS counter 自动按出现顺序循环分配。
   * 高级用法:同一份内容里想让某条 track 用特定色,可以手动指定。
   */
  lane?: 1 | 2 | 3 | 4 | 5
}>()

const slots = useSlots()
const hasContent = computed(() => !!props.desc || !!slots.default)

const flagDefaults: Record<string, string> = {
  passed: 'PASSED',
  polish: 'POLISH',
  'at-risk': 'AT RISK',
  blocked: 'BLOCKED',
  note: 'NOTE',
}
</script>