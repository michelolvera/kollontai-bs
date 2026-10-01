<script setup lang="ts">
import { onMounted, ref } from 'vue'
import bouquet from '../assets/img/bouquet.webp'
import calendarIcon from '../assets/img/icon-calendar.webp'
import { useCountdown } from '../composables/useCountdown'
import { vParallax } from '../directives/parallax'
import { vReveal } from '../directives/reveal'
import { EVENT, GOOGLE_CALENDAR_URL, ICS_URL } from '../event'
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
</script>

<template>
  <section id="fecha" class="date">
    <div v-reveal class="date__card glass">
      <div v-reveal:left="250" class="date__bouquet">
        <img v-parallax="-18" :src="bouquet" width="310" height="473" alt="" />
      </div>

      <h2 class="eyebrow">Agenda la fecha</h2>

      <div class="date__lockup">
        <p class="script date__day">Domingo</p>
        <p class="date__number">
          <span>25</span>
          <small>octubre</small>
        </p>
        <p class="script date__time">02:00 pm</p>
      </div>

      <div v-reveal="250" class="date__action">
        <PillButton :href="calendarUrl" :external="calendarIsExternal" :icon="calendarIcon">
          Agregar al calendario
        </PillButton>
      </div>
    </div>

    <h2 v-reveal:blur class="script date__waiting">
      {{ finished ? '¡Llegó el día!' : 'Faltan' }}
    </h2>
    <EventCountdown :target="EVENT.start" />
  </section>
</template>

<style scoped>
.date {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--col);
  margin: 0 auto;
  padding: calc(var(--s) * 96) var(--gutter) calc(var(--s) * 50);
}

.date__card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: calc(var(--s) * 34) calc(var(--s) * 14) calc(var(--s) * 30);
  border-radius: calc(var(--s) * 40);
}

/* El ramo se asoma por la esquina de la tarjeta */
.date__bouquet {
  position: absolute;
  top: calc(var(--s) * -112);
  left: calc(var(--s) * -22);
  width: calc(var(--s) * 96);
  rotate: -14deg;
  pointer-events: none;
}

.date__bouquet img {
  width: 100%;
  height: auto;
}

.date__lockup {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  margin-top: calc(var(--s) * 22);
  text-align: center;
}

.date__day,
.date__time {
  font-size: calc(var(--s) * 31);
  line-height: 1;
  white-space: nowrap;
}

.date__day {
  color: var(--pink-soft);
}

.date__time {
  color: var(--pink);
}

.date__number {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 calc(var(--s) * 8);
  padding: 0 calc(var(--s) * 12);
  border-inline: 1px solid rgb(223 114 146 / 0.55);
  color: var(--olive-dark);
  font-family: var(--font-display);
  line-height: 1;
}

.date__number span {
  font-weight: 600;
  font-size: calc(var(--s) * 68);
  font-variant-numeric: lining-nums;
  line-height: 0.82;
}

.date__number small {
  margin-top: calc(var(--s) * 8);
  font-weight: 700;
  font-size: max(calc(var(--s) * 12), 11px);
  letter-spacing: 0.26em;
  text-indent: 0.26em;
  text-transform: uppercase;
}

.date__action {
  margin-top: calc(var(--s) * 28);
}

.date__waiting {
  margin: calc(var(--s) * 64) 0 calc(var(--s) * 34);
  color: var(--pink);
  font-size: calc(var(--s) * 60);
  line-height: 1;
  text-align: center;
}
</style>
