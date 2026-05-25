<template>
  <div class="prism-code" ref="codeRef">
    <div v-if="file" class="prism-code-header">{{ file }}</div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { hljs } from '../hljs'
import { addLineNumbers } from '../line-numbers'
import { addCopyButton } from '../copy-button'

defineProps<{
  file?: string
  lines?: string
}>()

const codeRef = ref<HTMLElement>()

onMounted(() => {
  if (!codeRef.value) return
  codeRef.value.querySelectorAll('pre code').forEach(block => {
    hljs.highlightElement(block as HTMLElement)
  })
  addLineNumbers(codeRef.value)
  addCopyButton(codeRef.value)
})
</script>
