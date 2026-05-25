<template>
  <div class="prism-file-list">
    <div v-for="(group, i) in groups" :key="i" class="prism-file-group">
      <div class="prism-file-group-header">
        <span class="prism-file-group-name">{{ group.module }}</span>
        <span class="prism-file-group-count">{{ group.files.length }} 个文件</span>
      </div>
      <ul class="prism-file-group-files">
        <li v-for="(file, j) in group.files" :key="j" :class="['prism-file-item', 'prism-file-' + changeType(file.change)]">
          <span class="prism-file-path">{{ file.path }}</span>
          <span class="prism-file-change">{{ file.change }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  groups: Array<{
    module: string
    files: Array<{ path: string; change: string }>
  }>
}>()

function changeType(change: string): string {
  const map: Record<string, string> = {
    '新增': 'added', 'added': 'added', 'new': 'added',
    '修改': 'modified', 'modified': 'modified', 'changed': 'modified',
    '签名变更': 'breaking', 'breaking': 'breaking',
    '仅 import': 'minor', 'import-only': 'minor',
    '删除': 'removed', 'removed': 'removed', 'deleted': 'removed',
  }
  return map[change.toLowerCase()] || 'default'
}
</script>
