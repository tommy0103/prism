<template>
  <dl class="prism-kv">
    <template v-for="(item, i) in items" :key="i">
      <dt>{{ item.key }}</dt>
      <dd>{{ item.value }}</dd>
    </template>
  </dl>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{ key: string; value: string }>
}>()
</script>
