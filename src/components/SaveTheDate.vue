<script setup lang="ts">
import { onMounted, ref } from 'vue'
import bouquet from '../assets/img/bouquet.webp'
import bow from '../assets/img/bow.webp'
import calendarIcon from '../assets/img/icon-calendar.webp'
import pinIcon from '../assets/img/icon-pin.webp'
import stork from '../assets/img/stork.webp'
import { useCountdown } from '../composables/useCountdown'
import { box, u } from '../design'
import { vReveal } from '../directives/reveal'
import { EVENT, GOOGLE_CALENDAR_URL, ICS_URL, MAP_EMBED_URL, MAP_URL } from '../event'
import EventCountdown from './EventCountdown.vue'
import PillButton from './PillButton.vue'

const { finished } = useCountdown(EVENT.start)

// iOS y escritorio abren el .ics directamente en su calendario; en Android
// es más cómodo el formulario de Google Calendar que descargar el archivo.
const calendarUrl = ref<string>(ICS_URL)
const calendarIsExternal = ref(false)

onMounted(() => {
  if (/android/i.test(navigator.userAgent)) {
    calendarUrl.value = GOOGLE_CALENDAR_URL
    calendarIsExternal.value = true
  }
})

// Las pastillas se anclan por su centro: en pantallas chicas crecen para poder
// tocarlas con el dedo, sin moverse del lugar que tienen en el diseño.
const centered = (centerY: number, centerX: number) => ({
  position: 'absolute' as const,
  top: u(centerY),
  left: u(centerX),
  transform: 'translate(-50%, -50%)',
})
</script>

<template>
  <section id="fecha" class="sheet date">
    <div class="date__arch" />
    <img v-reveal class="fill" :style="box(79, 416, 408, 430)" :src="bow" alt="" />
    <img v-reveal="200" class="fill" :style="box(481, 20, 266, 406)" :src="bouquet" alt="" />

    <h2 v-reveal class="line heading" :style="box(586, 321, 651, 70)">Agenda la fecha</h2>

    <div v-reveal="100" :style="box(700, 223, 835, 120)">
      <p class="line script date__day" :style="box(-22, 0, 471, 92)">Domingo</p>
      <p class="line date__month" :style="box(68, 122, 280, 47)">25 octubre</p>
      <span class="date__rule" :style="box(0, 439, 4, 113)" />
      <p class="line script date__time" :style="box(22, 471, 286, 85)">02:00 pm</p>
    </div>

    <PillButton
      v-reveal="150"
      :style="centered(905, 627)"
      :href="calendarUrl"
      :external="calendarIsExternal"
      :icon="calendarIcon"
    >
      Agregar al calendario
    </PillButton>

    <h2 v-reveal class="line heading" :style="box(987, 346, 600, 70)">
      {{ finished ? '¡Llegó el día!' : 'Faltan' }}
    </h2>
    <div v-reveal="100" :style="box(1076, 246, 800)">
      <EventCountdown :target="EVENT.start" />
    </div>

    <h2 v-reveal class="line heading heading--pink" :style="box(1311, 218, 562, 70)">
      Te esperamos en...
    </h2>
    <div v-reveal="100" :style="box(1425, 69, 800, 190)">
      <p class="line script date__venue" :style="box(0, 0, 800, 90)">Jardín de mis amores</p>
      <p class="date__address" :style="box(74, 80, 725)">
        Tancítaro #66<br />Lomas de Guayangareo, 58240
      </p>
    </div>
    <PillButton v-reveal="150" :style="centered(1686, 532)" :href="MAP_URL" external :icon="pinIcon">
      Ver ubicación
    </PillButton>

    <img
      v-reveal="200"
      class="fill date__stork"
      :style="box(1241, 830, 410, 561)"
      :src="stork"
      alt="Cigüeña con un bebé"
    />

    <div v-reveal class="date__map">
      <iframe
        :src="MAP_EMBED_URL"
        title="Mapa de Jardín de Mis Amores"
        width="600"
        height="450"
        style="border: 0"
        allowfullscreen
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
      />
    </div>
  </section>
</template>

<style scoped>
/* Reproduce la página 7 del diseño y, debajo, el mapa: la cigüeña queda parada sobre él */
.date {
  padding: calc(var(--u) * 1796) 0 calc(var(--u) * 110);
}

.date__arch {
  position: absolute;
  inset: calc(var(--u) * 234) auto 0 calc(var(--u) * 168);
  width: calc(var(--u) * 913);
  border-radius: calc(var(--u) * 457) calc(var(--u) * 457) 0 0;
  background: var(--cream);
}

.fill {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.heading {
  color: var(--olive-dark);
  font-weight: 700;
  font-size: calc(var(--u) * 58.6);
  text-transform: uppercase;
}

.heading--pink {
  color: var(--pink-soft);
  text-transform: none;
}

.date__day {
  color: var(--pink-soft);
  font-size: calc(var(--u) * 108);
}

.date__month {
  color: var(--olive-text);
  font-size: calc(var(--u) * 38);
  text-transform: uppercase;
}

.date__rule {
  background: var(--pink-soft);
}

.date__time {
  color: var(--pink);
  font-size: calc(var(--u) * 92);
}

.date__venue {
  color: var(--olive-dark);
  font-size: calc(var(--u) * 96);
}

.date__address {
  color: var(--olive-text);
  font-size: max(calc(var(--u) * 33), 11px);
  line-height: 1.4;
  text-align: center;
  white-space: nowrap;
}

.date__stork {
  z-index: 1;
  pointer-events: none;
}

.date__map {
  position: relative;
  width: calc(var(--u) * 850);
  height: max(calc(var(--u) * 600), 250px);
  margin: 0 auto;
  overflow: hidden;
  border: max(calc(var(--u) * 3), 1.5px) solid var(--pink-deep);
  border-radius: calc(var(--u) * 36);
  background: #eee9e2;
}

.date__map iframe {
  width: 100%;
  height: 100%;
}
</style>
