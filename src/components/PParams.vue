<template>
  <div class="prism-params">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, provide } from 'vue'

const rootParams = inject<Record<string, any>>('prism-root-params', {})

function set(name: string, value: any) {
  rootParams[name] = value
}

provide('prism-params', { store: rootParams, set })
</script>
