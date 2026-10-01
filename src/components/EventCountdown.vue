<script setup lang="ts">
import { computed } from 'vue'
import { useCountdown } from '../composables/useCountdown'

const props = defineProps<{ target: Date }>()

const { days, hours, minutes, seconds } = useCountdown(props.target)

const units = computed(() => [
  { label: 'Días', name: 'días', value: days.value },
  { label: 'Hrs', name: 'horas', value: hours.value },
  { label: 'Min', name: 'minutos', value: minutes.value },
  { label: 'Seg', name: 'segundos', value: seconds.value },
])

const summary = computed(() => units.value.map((unit) => `${unit.value} ${unit.name}`).join(', '))

const digits = (value: number) => String(value).padStart(2, '0').split('')
</script>

<template>
  <div class="countdown" role="timer" :aria-label="`Faltan ${summary}`">
    <template v-for="(unit, index) in units" :key="unit.label">
      <span v-if="index > 0" class="countdown__colon" aria-hidden="true">:</span>
      <div class="countdown__unit" aria-hidden="true">
        <div class="countdown__digits">
          <span v-for="(digit, position) in digits(unit.value)" :key="position" class="countdown__digit">
            {{ digit }}
          </span>
        </div>
        <span class="countdown__label">{{ unit.label }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.countdown {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: calc(var(--u) * 12);
  font-family: var(--font-digits);
  font-weight: 500;
  color: #1c1c1c;
}

.countdown__unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--u) * 12);
}

.countdown__digits {
  display: flex;
  gap: calc(var(--u) * 5);
}

/* Fichas oscuras con un corte al centro, como el reloj del diseño */
.countdown__digit {
  display: grid;
  place-items: center;
  width: calc(var(--u) * 62);
  height: calc(var(--u) * 104);
  border-radius: calc(var(--u) * 8);
  background: linear-gradient(#2e2e2e 0 48.5%, #0c0c0c 48.5% 51.5%, #222 51.5%);
  color: #fff;
  font-size: calc(var(--u) * 76);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.countdown__colon {
  height: calc(var(--u) * 104);
  font-size: calc(var(--u) * 64);
  line-height: calc(var(--u) * 96);
}

.countdown__label {
  font-size: max(calc(var(--u) * 22), 8px);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
