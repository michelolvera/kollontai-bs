<script setup lang="ts">
import { computed } from 'vue'
import { vReveal } from '../directives/reveal'

// Texto que aparece palabra por palabra. Cada elemento de `lines` es un renglón.
const props = withDefaults(defineProps<{ lines: string[]; tag?: string; delay?: number }>(), {
  tag: 'p',
  delay: 0,
})

const rows = computed(() => {
  let index = 0
  return props.lines.map((line) => line.split(' ').map((text) => ({ text, index: index++ })))
})
</script>

<template>
  <component :is="tag" v-reveal:words="delay">
    <span class="sr-only">{{ lines.join(' ') }}</span>
    <span v-for="(row, line) in rows" :key="line" class="line" aria-hidden="true">
      <span v-for="word in row" :key="word.index" class="word" :style="{ '--i': word.index }">
        {{ word.text }}
      </span>
    </span>
  </component>
</template>

<style scoped>
.line {
  display: block;
}
</style>
