<script setup lang="ts">
import { maskIcon } from '../design'

defineProps<{
  href: string
  /** Imagen de un solo color (máscara) que se pinta del color del texto */
  icon?: string
  external?: boolean
}>()
</script>

<template>
  <a
    class="pill"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <span class="pill__label"><slot /></span>
    <span v-if="icon" class="pill__icon" :style="maskIcon(icon)" aria-hidden="true" />
  </a>
</template>

<style scoped>
.pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: calc(var(--u) * 22);
  min-height: max(calc(var(--u) * 70), 38px);
  padding: 0 max(calc(var(--u) * 44), 16px);
  border: max(calc(var(--u) * 3), 1.5px) solid var(--pink-deep);
  border-radius: 999px;
  background: var(--pink-button);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: max(calc(var(--u) * 36), 13px);
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    scale 0.2s ease;
}

.pill:hover {
  background: #cd7b95;
  box-shadow: 0 calc(var(--u) * 8) calc(var(--u) * 22) rgb(164 80 106 / 0.3);
  scale: 1.03;
}

.pill:active {
  scale: 0.98;
}

.pill:focus-visible {
  outline: 3px solid var(--olive-dark);
  outline-offset: 3px;
}

.pill__icon {
  flex: none;
  width: max(calc(var(--u) * 40), 15px);
  height: max(calc(var(--u) * 40), 15px);
  background: currentColor;
  -webkit-mask: var(--icon) center / contain no-repeat;
  mask: var(--icon) center / contain no-repeat;
}
</style>
