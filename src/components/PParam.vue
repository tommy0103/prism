<template>
  <div class="prism-param">
    <label class="prism-param-label">
      <span class="prism-param-name">{{ label }}</span>
      <span class="prism-param-value">{{ displayValue }}</span>
    </label>

    <input
      v-if="type === 'range'"
      type="range"
      class="prism-param-range"
      :min="min"
      :max="max"
      :step="step"
      :value="currentValue"
      @input="onInput"
    />

    <select
      v-else-if="type === 'select'"
      class="prism-param-select"
      :value="currentValue"
      @change="onInput"
    >
      <option v-for="opt in parsedOptions" :key="opt" :value="opt">{{ opt }}</option>
    </select>

    <button
      v-else-if="type === 'toggle'"
      class="prism-param-toggle"
      :class="{ active: currentValue }"
      @click="toggleValue"
    >
      <span class="prism-param-toggle-track">
        <span class="prism-param-toggle-thumb"></span>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, onMounted } from 'vue'

const props = defineProps<{
  name: string
  label: string
  type?: 'range' | 'select' | 'toggle'
  value?: string | number | boolean
  min?: number
  max?: number
  step?: number
  options?: string
  unit?: string
}>()

const ctx = inject<{
  store: Record<string, any>
  set: (name: string, value: any) => void
}>('prism-params')!

onMounted(() => {
  if (!(props.name in ctx.store)) {
    const initial = props.type === 'toggle'
      ? (props.value === true || props.value === 'true')
      : (props.value ?? (props.type === 'range' ? props.min ?? 0 : ''))
    ctx.set(props.name, props.type === 'range' ? Number(initial) : initial)
  }
})

const currentValue = computed(() => ctx.store[props.name])

const displayValue = computed(() => {
  const v = currentValue.value
  if (props.type === 'toggle') return v ? 'ON' : 'OFF'
  return props.unit ? `${v} ${props.unit}` : String(v)
})

const parsedOptions = computed(() => {
  if (!props.options) return []
  return props.options.split(',').map(s => s.trim())
})

function onInput(ev: Event) {
  const target = ev.target as HTMLInputElement | HTMLSelectElement
  const val = props.type === 'range' ? Number(target.value) : target.value
  ctx.set(props.name, val)
}

function toggleValue() {
  ctx.set(props.name, !currentValue.value)
}
</script>
