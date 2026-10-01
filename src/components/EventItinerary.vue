<script setup lang="ts">
import clothesGreen from '../assets/img/clothes-green.webp'
import cakeIcon from '../assets/img/icon-cake.webp'
import clockIcon from '../assets/img/icon-clock.webp'
import foodIcon from '../assets/img/icon-food.webp'
import giftIcon from '../assets/img/icon-gift.webp'
import receptionIcon from '../assets/img/icon-reception.webp'
import snacksIcon from '../assets/img/icon-snacks.webp'
import toysIcon from '../assets/img/icon-toys.webp'
import { box, maskIcon } from '../design'
import { vReveal } from '../directives/reveal'

// En el diseño el texto alterna de lado, empezando por la derecha
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
</script>

<template>
  <section class="sheet itinerary">
    <div class="itinerary__column" />
    <img
      v-reveal
      class="itinerary__clothes"
      :style="box(0, 169, 903, 447)"
      :src="clothesGreen"
      alt="Juguete y ropa de bebé colgados en un tendedero"
    />
    <h2 v-reveal class="line itinerary__title" :style="box(505, 115, 1010, 56)">
      Itinerario de actividades
    </h2>

    <ol class="timeline">
      <li
        v-for="(activity, index) in activities"
        :key="index"
        v-reveal
        class="timeline__row"
        :class="{ 'timeline__row--flipped': index % 2 === 1 }"
      >
        <span
          class="timeline__icon"
          :style="maskIcon(activity.icon)"
          aria-hidden="true"
        />
        <span class="timeline__dot" aria-hidden="true" />
        <p class="timeline__text">
          <span class="script timeline__name">{{ activity.name }}</span>
          <time class="timeline__time">{{ activity.time }}</time>
        </p>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.itinerary {
  padding: calc(var(--u) * 598) 0 calc(var(--u) * 170);
}

/* Continuación de la columna crema que nace del arco de la sección anterior */
.itinerary__column {
  position: absolute;
  inset: 0 auto 0 calc(var(--u) * 168);
  width: calc(var(--u) * 913);
  background: var(--cream);
}

.itinerary__clothes {
  height: auto;
}

.itinerary__title {
  color: var(--pink-soft);
  font-weight: 700;
  font-size: calc(var(--u) * 46);
  text-transform: uppercase;
}

.timeline {
  position: relative;
  width: calc(var(--u) * 1000);
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

/* Línea vertical: de la primera a la última bolita */
.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: calc(var(--u) * 8);
  translate: -50% 0;
  background: var(--olive-dark);
}

.timeline__row {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  column-gap: calc(var(--u) * 26);
  min-height: max(calc(var(--u) * 110), 44px);
}

.timeline__icon {
  justify-self: end;
  width: max(calc(var(--u) * 92), 30px);
  height: max(calc(var(--u) * 84), 28px);
  margin: 0 calc(var(--u) * 22);
  background: var(--pink-soft);
  -webkit-mask: var(--icon) center / contain no-repeat;
  mask: var(--icon) center / contain no-repeat;
}

.timeline__dot {
  width: calc(var(--u) * 29);
  height: calc(var(--u) * 29);
  border-radius: 50%;
  background: var(--olive-dark);
}

.timeline__text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-self: start;
  line-height: 1;
}

.timeline__row--flipped .timeline__icon {
  order: 3;
  justify-self: start;
}

.timeline__row--flipped .timeline__text {
  order: 1;
  justify-self: end;
}

.timeline__row--flipped .timeline__dot {
  order: 2;
}

.timeline__name {
  color: var(--olive-dark);
  font-size: max(calc(var(--u) * 58), 19px);
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.timeline__time {
  margin-top: 0.2em;
  color: var(--pink-soft);
  font-size: max(calc(var(--u) * 31), 10.5px);
  white-space: nowrap;
}
</style>
