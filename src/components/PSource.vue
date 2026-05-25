<template>
  <details ref="detailsRef" class="prism-source" :id="id">
    <summary @click.prevent="toggle">
      <span class="prism-source-path">{{ path }}</span>
      <span v-if="lang" class="prism-source-lang">{{ lang }}</span>
    </summary>
    <div class="prism-source-body" ref="bodyRef">
      <div class="prism-source-inner">
        <slot />
        <div v-if="$slots.note" class="prism-source-note">
          <slot name="note" />
        </div>
      </div>
    </div>
  </details>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { hljs } from '../hljs'
import { addLineNumbers, parseLineRange } from '../line-numbers'
import { addCopyButton } from '../copy-button'

const props = defineProps<{
  path: string
  lang?: string
  id?: string
}>()

const detailsRef = ref<HTMLDetailsElement>()
const bodyRef = ref<HTMLElement>()
const isOpen = ref(false)
let highlighted = false

function highlightCode() {
  if (highlighted) return
  const el = detailsRef.value
  if (!el) return
  el.querySelectorAll('pre code').forEach(block => {
    hljs.highlightElement(block as HTMLElement)
  })
  const startLine = parseLineRange(props.path)
  addLineNumbers(el, startLine)
  addCopyButton(el)
  highlighted = true
}

function toggle() {
  isOpen.value = !isOpen.value
  const details = detailsRef.value
  const body = bodyRef.value
  if (!details || !body) return
  if (isOpen.value) {
    details.open = true
    body.style.gridTemplateRows = '0fr'
    requestAnimationFrame(() => {
      body.style.gridTemplateRows = '1fr'
      highlightCode()
    })
  } else {
    body.style.gridTemplateRows = '0fr'
    const onEnd = () => { details.open = false; body.removeEventListener('transitionend', onEnd) }
    body.addEventListener('transitionend', onEnd)
  }
}

defineExpose({ open: () => { if (!isOpen.value) toggle() } })
</script>
