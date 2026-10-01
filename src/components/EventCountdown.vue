<script setup lang="ts">
import { computed } from 'vue'
import bow from '../assets/img/bow.webp'
import { useCountdown } from '../composables/useCountdown'
import { vReveal } from '../directives/reveal'

const props = defineProps<{ target: Date }>()

const { days, hours, minutes, seconds } = useCountdown(props.target)

// El anillo grande se va vaciando durante el último mes
const DAYS_RING = 30

const minor = computed(() => [
  { label: 'Hrs', value: hours.value, total: 24 },
  { label: 'Min', value: minutes.value, total: 60 },
  { label: 'Seg', value: seconds.value, total: 60 },
])

const summary = computed(
  () =>
    `Faltan ${days.value} días, ${hours.value} horas, ${minutes.value} minutos y ${seconds.value} segundos`,
)

// Los trazos usan pathLength="100": el hueco es el porcentaje que ya pasó
const offset = (value: number, total: number) => 100 - Math.min(1, value / total) * 100

// Cada cifra lleva como clave su posición desde la derecha, para que solo
// se animen las que cambian.
function digits(value: number, pad = 2) {
  const chars = String(value).padStart(pad, '0').split('')
  return chars.map((char, index) => ({ char, place: chars.length - index }))
}
</script>

<template>
  <div class="countdown" role="timer" :aria-label="summary">
    <div v-reveal:scale class="countdown__major" aria-hidden="true">
      <svg class="countdown__halo" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="97" />
      </svg>
      <svg class="countdown__ring" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="countdown-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#e56881" />
            <stop offset="0.55" stop-color="#d68ca3" />
            <stop offset="1" stop-color="#bdd08d" />
          </linearGradient>
        </defs>
        <circle class="countdown__track" cx="100" cy="100" r="84" />
        <circle
          class="countdown__progress"
          cx="100"
          cy="100"
          r="84"
          pathLength="100"
          stroke-dasharray="100"
          :stroke-dashoffset="offset(days, DAYS_RING)"
          stroke="url(#countdown-gradient)"
        />
      </svg>
      <div class="countdown__disc glass">
        <span class="countdown__value">
          <span v-for="digit in digits(days, 1)" :key="digit.place" class="countdown__digit">
            <Transition name="roll">
              <span :key="digit.char">{{ digit.char }}</span>
            </Transition>
          </span>
        </span>
        <span class="script countdown__days">{{ days === 1 ? 'día' : 'días' }}</span>
      </div>
      <img class="countdown__bow" :src="bow" width="474" height="500" alt="" />
    </div>

    <div class="countdown__minor" aria-hidden="true">
      <div
        v-for="(unit, index) in minor"
        :key="unit.label"
        v-reveal:scale="150 + index * 130"
        class="countdown__unit glass"
      >
        <svg class="countdown__ring" viewBox="0 0 100 100">
          <circle class="countdown__track" cx="50" cy="50" r="45" />
          <circle
            class="countdown__progress"
            cx="50"
            cy="50"
            r="45"
            pathLength="100"
            stroke-dasharray="100"
            :stroke-dashoffset="offset(unit.value, unit.total)"
          />
        </svg>
        <span class="countdown__value">
          <span v-for="digit in digits(unit.value)" :key="digit.place" class="countdown__digit">
            <Transition name="roll">
              <span :key="digit.char">{{ digit.char }}</span>
            </Transition>
          </span>
        </span>
        <span class="countdown__label">{{ unit.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.countdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--s) * 22);
  color: var(--olive-dark);
}

/* ---------- Anillo de los días ---------- */

.countdown__major {
  position: relative;
  width: calc(var(--s) * 236);
  aspect-ratio: 1;
}

.countdown__major > svg,
.countdown__unit > svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* Corona de puntos que gira despacio */
.countdown__halo {
  fill: none;
  stroke: var(--olive);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-dasharray: 0.1 7.5;
  opacity: 0.7;
  animation: spin 80s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* El trazo arranca arriba, a las 12 */
.countdown__ring {
  rotate: -90deg;
  fill: none;
}

.countdown__track {
  stroke: rgb(214 140 163 / 0.22);
  stroke-width: 7;
}

.countdown__progress {
  stroke-width: 7;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s linear;
}

.countdown__major .countdown__progress {
  filter: drop-shadow(0 0 5px rgb(229 104 129 / 0.5));
}

.countdown__disc {
  position: absolute;
  inset: calc(var(--s) * 30);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.countdown__value {
  display: flex;
  font-family: var(--font-display);
  font-weight: 600;
  font-variant-numeric: lining-nums;
  line-height: 1;
}

.countdown__disc .countdown__value {
  font-size: calc(var(--s) * 92);
  margin-top: calc(var(--s) * -6);
}

/* Cada cifra en su propia ventana de ancho fijo: al cambiar, rueda hacia arriba */
.countdown__digit {
  position: relative;
  display: grid;
  place-items: center;
  width: 0.5em;
  height: 0.86em;
  overflow: hidden;
  overflow: clip;
  overflow-clip-margin: 0.1em;
}

.countdown__digit > span {
  grid-area: 1 / 1;
}

.roll-enter-active,
.roll-leave-active {
  transition:
    transform 0.5s var(--ease-out),
    opacity 0.4s ease;
}

.roll-enter-from {
  opacity: 0;
  transform: translateY(70%);
}

.roll-leave-to {
  opacity: 0;
  transform: translateY(-70%);
}

.countdown__days {
  margin-top: calc(var(--s) * -8);
  color: var(--pink);
  font-size: calc(var(--s) * 36);
  line-height: 1;
}

.countdown__bow {
  position: absolute;
  top: calc(var(--s) * -22);
  left: 50%;
  width: calc(var(--s) * 74);
  height: auto;
  margin-left: calc(var(--s) * -37);
  rotate: -6deg;
  filter: drop-shadow(0 calc(var(--s) * 6) calc(var(--s) * 8) rgb(164 80 106 / 0.3));
}

/* ---------- Horas, minutos y segundos ---------- */

.countdown__minor {
  display: flex;
  gap: calc(var(--s) * 16);
}

.countdown__unit {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: calc(var(--s) * 3);
  width: calc(var(--s) * 90);
  aspect-ratio: 1;
  border-radius: 50%;
}

.countdown__unit .countdown__track,
.countdown__unit .countdown__progress {
  stroke-width: 4.5;
}

.countdown__unit .countdown__progress {
  stroke: var(--pink-button);
}

.countdown__unit:nth-child(2) .countdown__progress {
  stroke: var(--olive);
}

.countdown__unit .countdown__value {
  position: relative;
  font-size: calc(var(--s) * 34);
}

.countdown__label {
  position: relative;
  color: var(--pink-deep);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: max(calc(var(--s) * 10.5), 10px);
  letter-spacing: 0.2em;
  text-indent: 0.2em;
  text-transform: uppercase;
}
</style>
