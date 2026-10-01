<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import clothesGreen from '../assets/img/clothes-green.webp'
import cakeIcon from '../assets/img/icon-cake.webp'
import clockIcon from '../assets/img/icon-clock.webp'
import foodIcon from '../assets/img/icon-food.webp'
import giftIcon from '../assets/img/icon-gift.webp'
import receptionIcon from '../assets/img/icon-reception.webp'
import snacksIcon from '../assets/img/icon-snacks.webp'
import toysIcon from '../assets/img/icon-toys.webp'
import { maskIcon } from '../design'
import { type RevealKind, vReveal } from '../directives/reveal'
import { gsap } from '../motion'

// El texto alterna de lado, empezando por la derecha
const activities = [
  { name: 'Recepción', time: '2:00 pm', icon: receptionIcon },
  { name: 'Comida', time: '3:00 pm', icon: foodIcon },
  { name: 'Juegos', time: '4:30 pm', icon: toysIcon },
  { name: 'Barra de Snacks', time: '5:00 - 7:00 pm', icon: snacksIcon },
  { name: 'Juegos', time: '5:30 pm', icon: toysIcon },
  { name: 'Regalos', time: '6:00 pm', icon: giftIcon },
  { name: 'Postre', time: '7:00 pm', icon: cakeIcon },
  { name: 'Fin', time: '7:30 pm', icon: clockIcon },
]

// Cada tarjeta entra desde su lado
const sideOf = (index: number): RevealKind => (index % 2 === 1 ? 'left' : 'right')

// La línea del tiempo se va dibujando conforme avanza el scroll
const list = useTemplateRef<HTMLElement>('list')
const fill = useTemplateRef<HTMLElement>('fill')
let tween: gsap.core.Tween | undefined

onMounted(() => {
  if (!list.value || !fill.value) return
  tween = gsap.fromTo(
    fill.value,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: list.value, start: 'top 68%', end: 'bottom 62%', scrub: 0.4 },
    },
  )
})

onUnmounted(() => {
  tween?.scrollTrigger?.kill()
  tween?.kill()
})
</script>

<template>
  <section class="itinerary">
    <div v-reveal:scale class="itinerary__clothes">
      <img
        class="sway"
        :src="clothesGreen"
        width="1050"
        height="523"
        alt="Juguete y ropa de bebé colgados en un tendedero"
      />
    </div>

    <h2 class="itinerary__title">
      <span v-reveal:blur class="script itinerary__script">Itinerario</span>
      <span v-reveal="150" class="eyebrow">de actividades</span>
    </h2>

    <ol ref="list" class="timeline">
      <li class="timeline__track" aria-hidden="true"><span ref="fill" /></li>
      <li
        v-for="(activity, index) in activities"
        :key="index"
        class="timeline__row"
        :class="{ 'timeline__row--flipped': index % 2 === 1 }"
      >
        <span v-reveal:scale="80" class="timeline__badge glass" aria-hidden="true">
          <span class="icon-mask" :style="maskIcon(activity.icon)" />
        </span>
        <span v-reveal:scale class="timeline__dot" aria-hidden="true" />
        <p v-reveal:[sideOf(index)]="120" class="timeline__card glass">
          <span class="script timeline__name">{{ activity.name }}</span>
          <time class="timeline__time">{{ activity.time }}</time>
        </p>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.itinerary {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--col);
  margin: 0 auto;
  padding: calc(var(--s) * 30) 0 calc(var(--s) * 60);
}

.itinerary__clothes {
  width: calc(var(--col) * 1.02);
}

.itinerary__clothes img {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 calc(var(--s) * 14) calc(var(--s) * 14) rgb(100 120 43 / 0.2));
}

.itinerary__title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: calc(var(--s) * 26);
}

.itinerary__script {
  color: var(--pink-soft);
  font-size: calc(var(--s) * 62);
  line-height: 1.05;
}

.timeline {
  --row: calc(var(--s) * 88);
  position: relative;
  width: 100%;
  margin-top: calc(var(--s) * 30);
  padding: 0 calc(var(--s) * 8);
  list-style: none;
}

/* Línea vertical: de la primera a la última bolita */
.timeline__track {
  position: absolute;
  top: calc(var(--row) / 2);
  bottom: calc(var(--row) / 2);
  left: 50%;
  width: calc(var(--s) * 3);
  margin-left: calc(var(--s) * -1.5);
  border-radius: 999px;
  background: rgb(100 120 43 / 0.16);
}

.timeline__track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(var(--pink-soft), var(--olive) 30%, var(--olive-dark));
  transform-origin: 50% 0;
}

.timeline__row {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  column-gap: calc(var(--s) * 11);
  height: var(--row);
}

.timeline__badge {
  display: grid;
  justify-self: end;
  place-items: center;
  width: calc(var(--s) * 56);
  height: calc(var(--s) * 56);
  margin-right: calc(var(--s) * 8);
  border-radius: 50%;
  color: var(--pink-soft);
}

.timeline__badge .icon-mask {
  width: 54%;
  height: 54%;
}

.timeline__dot {
  width: calc(var(--s) * 15);
  height: calc(var(--s) * 15);
  border: calc(var(--s) * 3) solid var(--paper);
  border-radius: 50%;
  background: var(--olive-dark);
  box-shadow: 0 0 0 1px rgb(100 120 43 / 0.35);
}

.timeline__card {
  display: flex;
  flex-direction: column;
  justify-self: start;
  gap: calc(var(--s) * 5);
  max-width: 100%;
  padding: calc(var(--s) * 10) calc(var(--s) * 14) calc(var(--s) * 11);
  border-radius: calc(var(--s) * 20);
  line-height: 1;
}

.timeline__row--flipped .timeline__badge {
  order: 3;
  justify-self: start;
  margin: 0 0 0 calc(var(--s) * 8);
}

.timeline__row--flipped .timeline__dot {
  order: 2;
}

.timeline__row--flipped .timeline__card {
  order: 1;
  justify-self: end;
  text-align: right;
}

.timeline__name {
  color: var(--olive-dark);
  font-size: calc(var(--s) * 25);
  text-wrap: balance;
}

.timeline__time {
  color: var(--pink-deep);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: max(calc(var(--s) * 12.5), 11.5px);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
}
</style>
