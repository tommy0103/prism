<template>
  <details ref="detailsRef" :class="['prism-collapse', { borderless }]" :open="open || undefined">
    <summary @click.prevent="toggle">{{ title }}</summary>
    <div class="prism-collapse-body" ref="bodyRef">
      <div class="prism-collapse-inner">
        <slot />
      </div>
    </div>
  </details>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  title: string
  open?: boolean
  borderless?: boolean
}>()

const detailsRef = ref<HTMLDetailsElement>()
const bodyRef = ref<HTMLElement>()
const isOpen = ref(props.open ?? false)

function openFromRef() { if (!isOpen.value) toggle() }

onMounted(() => {
  if (isOpen.value && detailsRef.value) {
    detailsRef.value.open = true
    if (bodyRef.value) bodyRef.value.style.gridTemplateRows = '1fr'
  }
  detailsRef.value?.addEventListener('prism-ref-open', openFromRef)
})

onUnmounted(() => {
  detailsRef.value?.removeEventListener('prism-ref-open', openFromRef)
})

function toggle() {
  isOpen.value = !isOpen.value
  const details = detailsRef.value
  const body = bodyRef.value
  if (!details || !body) return

  if (isOpen.value) {
    details.open = true
    body.style.gridTemplateRows = '0fr'
    requestAnimationFrame(() => { body.style.gridTemplateRows = '1fr' })
  } else {
    body.style.gridTemplateRows = '0fr'
    const onEnd = () => {
      details.open = false
      body.removeEventListener('transitionend', onEnd)
    }
    body.addEventListener('transitionend', onEnd)
  }
}
</script>
