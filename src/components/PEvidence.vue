<template>
  <div class="prism-evidence">
    <div v-if="hasConclusion" class="prism-evidence-conclusion">
      <span><slot name="conclusion">{{ conclusion }}</slot></span>
    </div>
    <div class="prism-evidence-items">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

const props = defineProps<{
  /** 结论文字。需要复杂 markup 时改用 #conclusion slot */
  conclusion?: string
}>()

const slots = useSlots()
const hasConclusion = computed(() => !!slots.conclusion || !!props.conclusion)
</script>