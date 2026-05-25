<template>
  <li :class="{ checked: checked }">
    <slot />
  </li>
</template>

<script setup lang="ts">
defineProps<{
  checked?: boolean
}>()
</script>
