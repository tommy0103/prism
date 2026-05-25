<template>
  <button class="prism-copy" @click="copy">
    <span v-if="!copied"><slot>{{ label || 'Copy' }}</slot></span>
    <span v-else class="prism-copy-done">Copied!</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  content: string
  label?: string
}>()

const copied = ref(false)

function copy() {
  navigator.clipboard.writeText(props.content).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  })
}
</script>
