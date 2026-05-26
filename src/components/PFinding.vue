<template>
  <div class="prism-finding">
    <div v-if="title" class="prism-finding-title">{{ title }}</div>
    <div class="prism-finding-body">
      <slot />
    </div>
    <div v-if="$slots.detail" class="prism-finding-detail">
      <slot name="detail" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  /** 观察标题(可选)。如果只有一句话陈述,可以不传 title,直接写在 body 里 */
  title?: string
}>()
</script>