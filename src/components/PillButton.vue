<script setup lang="ts">
import { ref } from 'vue'
import { maskIcon } from '../design'
import { vMagnetic } from '../directives/magnetic'

withDefaults(
  defineProps<{
    href: string
    /** Imagen de un solo color (máscara) que se pinta del color del texto */
    icon?: string
    external?: boolean
    /** primary: rosa · light: crema sobre fondos oscuros · ghost: vidrio sobre fondos oscuros */
    variant?: 'primary' | 'light' | 'ghost'
    /** Halo que late para llamar la atención sobre la acción principal */
    pulse?: boolean
  }>(),
  { variant: 'primary' },
)

// Onda que nace donde se toca el botón
const ripples = ref<{ id: number; x: number; y: number }[]>([])
let nextId = 0

function addRipple(event: PointerEvent) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  ripples.value.push({ id: nextId++, x: event.clientX - rect.left, y: event.clientY - rect.top })
}

function removeRipple(id: number) {
  ripples.value = ripples.value.filter((ripple) => ripple.id !== id)
}
</script>

<template>
  <a
    v-magnetic
    class="pill"
    :class="[`pill--${variant}`, { 'pill--pulse': pulse }]"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    @pointerdown="addRipple"
  >
    <span class="pill__ink" aria-hidden="true">
      <span
        v-for="ripple in ripples"
        :key="ripple.id"
        class="pill__ripple"
        :style="{ left: `${ripple.x}px`, top: `${ripple.y}px` }"
        @animationend="removeRipple(ripple.id)"
      />
    </span>
    <span v-if="icon" class="pill__icon icon-mask" :style="maskIcon(icon)" aria-hidden="true" />
    <span class="pill__label"><slot /></span>
  </a>
</template>

<style scoped>
.pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: calc(var(--s) * 11);
  min-height: max(calc(var(--s) * 52), 48px);
  padding: 0 calc(var(--s) * 26);
  border: 1px solid rgb(255 255 255 / 0.55);
  border-radius: 999px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: max(calc(var(--s) * 17), 15px);
  line-height: 1;
  letter-spacing: 0.03em;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    scale 0.35s var(--ease-spring),
    box-shadow 0.35s ease,
    filter 0.35s ease;
}

.pill--primary {
  background: linear-gradient(135deg, #dc8ea6, #b9607d 58%, var(--pink-deep));
  color: #fff;
  box-shadow:
    0 calc(var(--s) * 12) calc(var(--s) * 26) calc(var(--s) * -10) rgb(164 80 106 / 0.7),
    inset 0 1px 0 rgb(255 255 255 / 0.45);
}

.pill--light {
  background: linear-gradient(135deg, #fff, #fdf1f3);
  color: var(--pink-deep);
  box-shadow:
    0 calc(var(--s) * 14) calc(var(--s) * 30) calc(var(--s) * -12) rgb(40 50 10 / 0.6),
    inset 0 1px 0 #fff;
}

.pill--ghost {
  border-color: rgb(255 255 255 / 0.6);
  background: rgb(255 255 255 / 0.14);
  color: #fff;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

@media (hover: hover) {
  .pill:hover {
    scale: 1.04;
    filter: brightness(1.05);
  }

  .pill:hover .pill__icon {
    rotate: -10deg;
    scale: 1.12;
  }

  .pill:hover .pill__ink::before {
    translate: 260% 0;
    transition: translate 0.9s var(--ease-out);
  }
}

.pill:active {
  scale: 0.95;
  transition-duration: 0.12s;
}

.pill:focus-visible {
  outline: 3px solid var(--olive-dark);
  outline-offset: 3px;
}

.pill--light:focus-visible,
.pill--ghost:focus-visible {
  outline-color: #fff;
}

/* Capa recortada a la pastilla: contiene el brillo y las ondas */
.pill__ink {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
}

.pill__ink::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 45%;
  background: linear-gradient(100deg, transparent, rgb(255 255 255 / 0.5), transparent);
  translate: -130% 0;
}

.pill__ripple {
  position: absolute;
  width: calc(var(--s) * 16);
  height: calc(var(--s) * 16);
  margin: calc(var(--s) * -8);
  border-radius: 50%;
  background: currentColor;
  opacity: 0.3;
  animation: ripple 0.65s ease-out forwards;
}

@keyframes ripple {
  to {
    scale: 22;
    opacity: 0;
  }
}

/* Halo que se expande desde el borde del botón */
.pill--pulse::after {
  content: '';
  position: absolute;
  inset: -1px;
  border: 2px solid currentColor;
  border-radius: inherit;
  pointer-events: none;
  animation: pulse 2.4s ease-out infinite;
}

.pill--light.pill--pulse::after {
  border-color: #fff;
}

.pill--primary.pill--pulse::after {
  border-color: var(--pink-soft);
}

@keyframes pulse {
  from {
    transform: scale(1);
    opacity: 0.75;
  }
  70%,
  to {
    transform: scale(1.12, 1.5);
    opacity: 0;
  }
}

.pill__icon {
  position: relative;
  flex: none;
  width: calc(var(--s) * 19);
  height: calc(var(--s) * 19);
  transition:
    rotate 0.35s var(--ease-spring),
    scale 0.35s var(--ease-spring);
}

.pill__label {
  position: relative;
  display: inline-flex;
  align-items: center;
}
</style>
