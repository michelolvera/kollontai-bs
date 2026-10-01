<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import pinIcon from '../assets/img/icon-pin.webp'
import stork from '../assets/img/stork.webp'
import { maskIcon } from '../design'
import { vParallax } from '../directives/parallax'
import { vReveal } from '../directives/reveal'
import { MAP_EMBED_URL, MAP_URL } from '../event'
import PillButton from './PillButton.vue'
import RevealText from './RevealText.vue'

// El mapa atrapa el dedo: si respondiera de inmediato, al deslizar la página
// se movería el mapa. Queda dormido hasta que se toca, y se vuelve a dormir
// cuando sale de pantalla.
const map = useTemplateRef<HTMLElement>('map')
const awake = ref(false)
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!map.value || typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) awake.value = false
  })
  observer.observe(map.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section id="lugar" class="venue">
    <div class="venue__intro">
      <div class="venue__heading">
        <p v-reveal:blur class="venue__kicker">Te esperamos en...</p>
        <RevealText
          tag="h2"
          class="script venue__name"
          :lines="['Jardín de', 'mis amores']"
          :delay="150"
        />
      </div>
      <!-- La cigüeña queda parada sobre el borde de la tarjeta -->
      <div v-reveal:right="250" class="venue__stork">
        <img v-parallax="-14" :src="stork" width="476" height="650" alt="Cigüeña con un bebé" />
      </div>
    </div>

    <div v-reveal class="venue__card glass">
      <div ref="map" class="venue__map">
        <iframe
          :src="MAP_EMBED_URL"
          title="Mapa de Jardín de Mis Amores"
          width="600"
          height="450"
          allowfullscreen
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
        />
        <button v-if="!awake" class="venue__wake" type="button" @click="awake = true">
          <span class="venue__wake-chip">Toca para explorar el mapa</span>
        </button>
      </div>

      <div class="venue__details">
        <span class="venue__pin" aria-hidden="true">
          <span class="icon-mask" :style="maskIcon(pinIcon)" />
        </span>
        <p class="venue__address">
          <strong>Jardín de Mis Amores</strong>
          Tancítaro #66<br />Lomas de Guayangareo, 58240
        </p>
      </div>
      <PillButton class="venue__button" :href="MAP_URL" external :icon="pinIcon">
        Ver ubicación
      </PillButton>
    </div>
  </section>
</template>

<style scoped>
.venue {
  width: var(--col);
  margin: 0 auto;
  padding: calc(var(--s) * 50) var(--gutter) calc(var(--s) * 60);
}

.venue__intro {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  pointer-events: none;
}

.venue__heading {
  padding-bottom: calc(var(--s) * 26);
}

.venue__kicker {
  color: var(--pink-soft);
  font-weight: 700;
  font-size: calc(var(--s) * 19);
}

.venue__name {
  margin-top: calc(var(--s) * 8);
  color: var(--olive-dark);
  font-size: calc(var(--s) * 52);
  line-height: 0.98;
  white-space: nowrap;
}

.venue__stork {
  flex: none;
  width: calc(var(--s) * 140);
  margin: 0 calc(var(--s) * -6) calc(var(--s) * -14) 0;
}

.venue__stork img {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 calc(var(--s) * 10) calc(var(--s) * 10) rgb(90 52 6 / 0.18));
}

.venue__card {
  display: flex;
  flex-direction: column;
  padding: calc(var(--s) * 10) calc(var(--s) * 10) calc(var(--s) * 18);
  border-radius: calc(var(--s) * 36);
}

.venue__map {
  position: relative;
  height: calc(var(--s) * 290);
  overflow: hidden;
  border-radius: calc(var(--s) * 27);
  background: #eee9e2;
  /* Safari: recorta también el iframe a las esquinas redondeadas */
  isolation: isolate;
}

.venue__map iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.venue__wake {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  padding: 0 0 calc(var(--s) * 14);
  border: 0;
  background: linear-gradient(to top, rgb(164 80 106 / 0.28), transparent 45%);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.venue__wake-chip {
  padding: calc(var(--s) * 9) calc(var(--s) * 16);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  background: rgb(255 253 249 / 0.82);
  color: var(--pink-deep);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: max(calc(var(--s) * 13), 12px);
  letter-spacing: 0.04em;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.venue__wake:focus-visible .venue__wake-chip {
  outline: 3px solid var(--olive-dark);
  outline-offset: 3px;
}

.venue__details {
  display: flex;
  align-items: center;
  gap: calc(var(--s) * 14);
  padding: calc(var(--s) * 18) calc(var(--s) * 10) calc(var(--s) * 16);
}

.venue__pin {
  display: grid;
  flex: none;
  place-items: center;
  width: calc(var(--s) * 46);
  height: calc(var(--s) * 46);
  border-radius: 50%;
  background: linear-gradient(135deg, rgb(229 104 129 / 0.18), rgb(189 208 141 / 0.4));
  color: var(--pink-deep);
}

.venue__pin .icon-mask {
  width: 46%;
  height: 46%;
}

.venue__address {
  font-size: var(--fs-body);
  line-height: 1.45;
}

.venue__address strong {
  display: block;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: calc(var(--s) * 20);
  line-height: 1.2;
}

.venue__button {
  margin: 0 calc(var(--s) * 8);
}
</style>
