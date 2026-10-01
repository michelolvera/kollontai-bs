<script setup lang="ts">
import { useTemplateRef } from 'vue'
import presentIcon from '../assets/img/icon-present.webp'
import { maskIcon } from '../design'
import { finePointer, reducedMotion } from '../motion'

defineProps<{ href: string; store: string; tone: 'pink' | 'olive' }>()

// Con mouse, la tarjeta se inclina hacia el cursor y el brillo lo sigue
const card = useTemplateRef<HTMLElement>('card')

function tilt(event: PointerEvent) {
  const element = card.value
  if (!element || !finePointer || reducedMotion) return
  const rect = element.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height
  element.style.setProperty('--tilt-x', `${(0.5 - y) * 14}deg`)
  element.style.setProperty('--tilt-y', `${(x - 0.5) * 16}deg`)
  element.style.setProperty('--glare-x', `${x * 100}%`)
  element.style.setProperty('--glare-y', `${y * 100}%`)
}

function settle() {
  card.value?.style.removeProperty('--tilt-x')
  card.value?.style.removeProperty('--tilt-y')
}
</script>

<template>
  <a
    ref="card"
    class="registry glass"
    :class="`registry--${tone}`"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`Mesa de regalos en ${store}`"
    @pointermove="tilt"
    @pointerleave="settle"
  >
    <span class="registry__glare" aria-hidden="true" />
    <span class="registry__badge" aria-hidden="true">
      <span class="icon-mask" :style="maskIcon(presentIcon)" />
    </span>
    <span class="registry__kicker">Mesa de regalos</span>
    <span class="registry__store">{{ store }}</span>
    <span class="registry__go">
      Ver lista
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m-5-5.5 5.5 5.5-5.5 5.5" /></svg>
    </span>
  </a>
</template>

<style scoped>
.registry {
  --accent: var(--pink-deep);
  --wash: rgb(229 104 129 / 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  padding: calc(var(--s) * 18) calc(var(--s) * 16) calc(var(--s) * 16);
  border-radius: calc(var(--s) * 28);
  color: var(--accent);
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transform: perspective(700px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
  transition:
    transform 0.5s var(--ease-out),
    scale 0.35s var(--ease-spring),
    box-shadow 0.4s ease;
}

.registry--olive {
  --accent: var(--olive-dark);
  --wash: rgb(189 208 141 / 0.5);
}

/* Aguada de color en la esquina */
.registry::before {
  content: '';
  position: absolute;
  top: calc(var(--s) * -50);
  right: calc(var(--s) * -50);
  width: calc(var(--s) * 150);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(closest-side, var(--wash), transparent);
}

/* Brillo: con mouse sigue al cursor; al tacto cruza la tarjeta cada tanto */
.registry__glare {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--glare-x, 50%) var(--glare-y, 0%),
    rgb(255 255 255 / 0.75),
    transparent 55%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

@media (hover: hover) {
  .registry:hover {
    scale: 1.03;
    box-shadow:
      0 calc(var(--s) * 30) calc(var(--s) * 50) calc(var(--s) * -22) rgb(164 80 106 / 0.6),
      inset 0 1px 0 #fff;
  }

  .registry:hover .registry__glare {
    opacity: 1;
  }

  .registry:hover .registry__go svg {
    translate: calc(var(--s) * 5) 0;
  }

  .registry:hover .registry__badge {
    rotate: -10deg;
    scale: 1.08;
  }
}

@media (hover: none) {
  .registry__glare {
    inset: 0 auto 0 0;
    width: 60%;
    background: linear-gradient(100deg, transparent, rgb(255 255 255 / 0.7), transparent);
    opacity: 1;
    animation: sheen 5s ease-in-out infinite;
  }

  .registry--olive .registry__glare {
    animation-delay: 0.5s;
  }
}

@keyframes sheen {
  from,
  55% {
    transform: translateX(-120%);
  }
  to {
    transform: translateX(290%);
  }
}

.registry:active {
  scale: 0.96;
  transition-duration: 0.12s;
}

.registry:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

.registry > :not(.registry__glare) {
  position: relative;
}

.registry__badge {
  display: grid;
  place-items: center;
  width: calc(var(--s) * 48);
  height: calc(var(--s) * 48);
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  box-shadow: 0 calc(var(--s) * 8) calc(var(--s) * 16) calc(var(--s) * -6) var(--accent);
  transition:
    rotate 0.4s var(--ease-spring),
    scale 0.4s var(--ease-spring);
}

.registry__badge .icon-mask {
  width: 46%;
  height: 46%;
}

.registry__kicker {
  margin-top: calc(var(--s) * 22);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: max(calc(var(--s) * 10.5), 10px);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.8;
}

.registry__store {
  margin-top: calc(var(--s) * 2);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: calc(var(--s) * 29);
  line-height: 1.1;
}

.registry__go {
  display: flex;
  align-items: center;
  gap: calc(var(--s) * 7);
  margin-top: calc(var(--s) * 16);
  font-size: var(--fs-small);
}

.registry__go svg {
  width: calc(var(--s) * 18);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: translate 0.4s var(--ease-out);
}
</style>
