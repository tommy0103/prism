<template>
  <a :href="'#' + to" class="prism-ref" @click.prevent="handleClick">
    <slot>{{ label }}</slot>
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{ to: string; label?: string }>()

function handleClick() {
  const target = document.getElementById(props.to)
  if (!target) return
  if (target instanceof HTMLDetailsElement && !target.open) {
    const body = target.querySelector('.prism-source-body, .prism-collapse-body') as HTMLElement
    if (body) {
      target.open = true
      body.style.gridTemplateRows = '0fr'
      requestAnimationFrame(() => { body.style.gridTemplateRows = '1fr' })
    }
  }
  target.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  target.style.outline = '2px solid var(--p-accent)'
  target.style.outlineOffset = '2px'
  target.style.borderRadius = 'var(--p-radius)'
  setTimeout(() => { target.style.outline = 'none' }, 1500)
}
</script>
