<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import poster from '../assets/img/reel-poster.jpg'
import reel from '../assets/reel-web.mp4'
import { box } from '../design'
import { vReveal } from '../directives/reveal'

const video = useTemplateRef<HTMLVideoElement>('video')
const playing = ref(false)
const muted = ref(true)

function play() {
  // El navegador puede bloquear la reproducción automática (p. ej. en ahorro de datos):
  // en ese caso queda visible el botón de reproducir.
  video.value?.play().catch(() => {})
}

function toggleSound() {
  muted.value = !muted.value
  if (video.value) video.value.muted = muted.value
  play()
}

onMounted(() => {
  if (!video.value) return
  video.value.muted = true
  play()
})
</script>

<template>
  <section class="sheet hero" aria-label="Video de bienvenida">
    <div v-reveal class="hero__card" :style="box(146, 124, 1015, 1377)">
      <div class="hero__frame">
        <video
          ref="video"
          class="hero__video"
          :src="reel"
          :poster="poster"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
          @play="playing = true"
          @pause="playing = false"
        />
        <button
          v-if="!playing"
          class="hero__play"
          type="button"
          aria-label="Reproducir video"
          @click="play"
        >
          <svg viewBox="0 0 120 86" aria-hidden="true">
            <rect x="3" y="3" width="114" height="80" rx="24" />
            <path d="M50 25v36l31-18z" />
          </svg>
        </button>
        <button
          class="hero__sound"
          type="button"
          :aria-label="muted ? 'Activar sonido' : 'Silenciar video'"
          :aria-pressed="!muted"
          @click="toggleSound"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" stroke="none" />
            <path v-if="muted" d="m15.5 9.5 5 5m0-5-5 5" />
            <path v-else d="M15 9a4.2 4.2 0 0 1 0 6m2.4-8.6a7.8 7.8 0 0 1 0 11.2" />
          </svg>
        </button>
      </div>
    </div>

    <p v-reveal="250" class="line script hero__caption" :style="box(1582, 143, 973, 83)">
      Una nueva aventura comienza
    </p>
  </section>
</template>

<style scoped>
.hero {
  height: calc(var(--u) * 1748);
}

.hero__card {
  display: flex;
  justify-content: center;
  background: var(--cream);
}

/* El reel es vertical (9:16): se muestra completo, centrado en la tarjeta */
.hero__frame {
  position: relative;
  height: 100%;
  aspect-ratio: 9 / 16;
  overflow: hidden;
  background: #e9e4dc;
}

.hero__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__play,
.hero__sound {
  position: absolute;
  padding: 0;
  border: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.hero__play {
  inset: 0;
  display: grid;
  place-items: center;
  background: rgb(252 251 247 / 0.35);
}

.hero__play svg {
  width: calc(var(--u) * 300);
  fill: none;
  stroke: var(--pink-deep);
  stroke-width: 5;
}

.hero__play svg path {
  fill: var(--pink-deep);
  stroke: none;
}

.hero__sound {
  right: calc(var(--u) * 28);
  bottom: calc(var(--u) * 28);
  display: grid;
  place-items: center;
  width: max(calc(var(--u) * 96), 40px);
  height: max(calc(var(--u) * 96), 40px);
  border-radius: 50%;
  background: rgb(164 80 106 / 0.82);
  color: #fff;
  transition: background-color 0.2s ease;
}

.hero__sound:hover {
  background: var(--pink-deep);
}

.hero__sound:focus-visible,
.hero__play:focus-visible {
  outline: 3px solid #fff;
  outline-offset: -5px;
}

.hero__sound svg {
  width: 56%;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.hero__caption {
  color: var(--olive);
  font-size: calc(var(--u) * 102);
}
</style>
