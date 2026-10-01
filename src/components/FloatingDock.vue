<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import calendarIcon from '../assets/img/icon-calendar.webp'
import pinIcon from '../assets/img/icon-pin.webp'
import presentIcon from '../assets/img/icon-present.webp'
import whatsappIcon from '../assets/img/icon-whatsapp.svg'
import { maskIcon } from '../design'
import { ScrollTrigger, scrollToSection } from '../motion'

// Accesos directos flotantes a lo que más se consulta de la invitación
const items = [
  { id: 'fecha', label: 'Fecha', icon: calendarIcon },
  { id: 'lugar', label: 'Lugar', icon: pinIcon },
  { id: 'regalos', label: 'Regalos', icon: presentIcon },
  { id: 'confirmacion', label: 'Confirmar', icon: whatsappIcon },
]

const visible = ref(false)
const active = ref('')

const top = (id: string) => document.getElementById(id)?.getBoundingClientRect().top ?? Infinity

function update() {
  const height = window.innerHeight
  // Aparece al dejar el video y se retira al llegar a la confirmación,
  // donde los botones grandes ya hacen su trabajo.
  visible.value = top('invitacion') < height * 0.35 && top('confirmacion') > height * 0.8

  let current = ''
  for (const item of items) if (top(item.id) < height * 0.55) current = item.id
  active.value = current
}

let trigger: ScrollTrigger | undefined

onMounted(() => {
  trigger = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: update, onRefresh: update })
  update()
})

onUnmounted(() => trigger?.kill())
</script>

<template>
  <nav class="dock glass" :class="{ 'is-visible': visible }" aria-label="Secciones de la invitación">
    <a
      v-for="item in items"
      :key="item.id"
      class="dock__item"
      :class="{ 'is-active': active === item.id, 'dock__item--cta': item.id === 'confirmacion' }"
      :href="`#${item.id}`"
      :aria-current="active === item.id ? 'true' : undefined"
      @click.prevent="scrollToSection(item.id)"
    >
      <span class="dock__icon icon-mask" :style="maskIcon(item.icon)" aria-hidden="true" />
      {{ item.label }}
    </a>
  </nav>
</template>

<style scoped>
.dock {
  position: fixed;
  bottom: calc(env(safe-area-inset-bottom, 0px) + var(--s) * 14);
  left: 50%;
  z-index: 20;
  display: flex;
  gap: calc(var(--s) * 2);
  padding: calc(var(--s) * 6);
  border-radius: 999px;
  translate: -50% 160%;
  visibility: hidden;
  transition:
    translate 0.7s var(--ease-out),
    visibility 0s 0.7s;
}

.dock.is-visible {
  translate: -50% 0;
  visibility: visible;
  transition-delay: 0s;
}

.dock__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: calc(var(--s) * 4);
  min-width: max(calc(var(--s) * 66), 60px);
  min-height: max(calc(var(--s) * 50), 48px);
  padding: 0 calc(var(--s) * 8);
  border-radius: 999px;
  color: var(--olive-dark);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: max(calc(var(--s) * 10.5), 10px);
  line-height: 1;
  letter-spacing: 0.12em;
  text-decoration: none;
  text-transform: uppercase;
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color 0.4s ease,
    color 0.4s ease,
    scale 0.3s var(--ease-spring);
}

.dock__item.is-active {
  background: rgb(189 208 141 / 0.5);
}

.dock__item--cta,
.dock__item--cta.is-active {
  background: linear-gradient(135deg, #dc8ea6, #b9607d 58%, var(--pink-deep));
  color: #fff;
  padding: 0 calc(var(--s) * 14);
}

.dock__item:active {
  scale: 0.92;
}

.dock__item:focus-visible {
  outline: 3px solid var(--olive-dark);
  outline-offset: 2px;
}

@media (hover: hover) {
  .dock__item:hover .dock__icon {
    translate: 0 calc(var(--s) * -2);
  }
}

.dock__icon {
  width: calc(var(--s) * 17);
  height: calc(var(--s) * 17);
  transition: translate 0.3s var(--ease-spring);
}
</style>
