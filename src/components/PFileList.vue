<template>
  <div class="prism-file-list">
    <slot />
  </div>
</template>

<script setup lang="ts">
// 纯容器,无 props。可以包含一个或多个 <PFileGroup>。
// 也可以直接包含 <PFile>(不分组,扁平列文件)。
</script>