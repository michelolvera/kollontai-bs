<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import poster from '../assets/img/reel-poster.jpg'
import reel from '../assets/reel-web.mp4'
import { vReveal } from '../directives/reveal'
import { gsap, reducedMotion, ScrollTrigger, scrollToSection } from '../motion'
import PastelBackdrop from './PastelBackdrop.vue'
import RevealText from './RevealText.vue'

const video = useTemplateRef<HTMLVideoElement>('video')
const ambient = useTemplateRef<HTMLVideoElement>('ambient')
const hero = useTemplateRef<HTMLElement>('hero')
const copy = useTemplateRef<HTMLElement>('copy')
const veil = useTemplateRef<HTMLElement>('veil')

const started = ref(false)
const playing = ref(false)
// El navegador puede bloquear la reproducción (p. ej. en ahorro de batería):
// en ese caso queda visible el botón de reproducir.
const blocked = ref(false)
const muted = ref(true)
// El velo ya tapó el video por completo
const covered = ref(false)
// Pantallas anchas: el reel vertical se centra sobre una copia desenfocada de sí mismo
const wide = ref(false)
// Pasado un rato el texto se retira para dejar ver el video completo
const QUIET_AFTER = 15_000
const quiet = ref(false)
let quietTimer: number | undefined

function play() {
  const element = video.value
  if (!element) return
  element.play().catch(() => {
    if (element.paused) blocked.value = true
  })
}

function setMuted(value: boolean) {
  muted.value = value
  if (video.value) video.value.muted = value
}

// Se llama desde el toque que abre el sobre: ese gesto permite arrancar con sonido.
function start() {
  started.value = true
  quietTimer = window.setTimeout(() => (quiet.value = true), QUIET_AFTER)
  const element = video.value
  if (!element) return
  setMuted(false)
  element.play().catch(() => {
    // Sin permiso para el audio: al menos que se vea el video
    setMuted(true)
    play()
  })
}

function toggleSound() {
  setMuted(!muted.value)
  if (!muted.value) play()
  else if (covered.value) video.value?.pause()
}

function onPlay() {
  playing.value = true
  blocked.value = false
  if (ambient.value && video.value) {
    ambient.value.currentTime = video.value.currentTime
    ambient.value.play().catch(() => {})
  }
}

function onPause() {
  playing.value = false
  ambient.value?.pause()
}

// Con el video tapado y en silencio no tiene caso seguir decodificándolo.
// Con sonido se deja correr: acompaña como música mientras se lee la invitación.
function setCovered(value: boolean) {
  covered.value = value
  if (!started.value) return
  if (value && muted.value) video.value?.pause()
  else if (!value && video.value?.paused) play()
}

// El velo arranca 1.6 pantallas abajo y sube más rápido que el contenido:
// así lo que entra en pantalla siempre cae sobre fondo claro.
const VEIL_START = 160
const VEIL_SPEED = 190

// progress: 0 con el video a pantalla completa, 1 cuando la portada ya salió de pantalla
function render(progress: number) {
  const offset = Math.max(0, VEIL_START - VEIL_SPEED * progress)
  if (veil.value) gsap.set(veil.value, { yPercent: offset })
  if (!reducedMotion) {
    if (video.value) gsap.set(video.value, { scale: 1 + progress * 0.14 })
    if (copy.value) gsap.set(copy.value, { y: progress * -90 })
  }
  if (copy.value) gsap.set(copy.value, { opacity: Math.max(0, 1 - progress * 2.4) })

  const isCovered = offset === 0
  if (isCovered !== covered.value) setCovered(isCovered)
}

let trigger: ScrollTrigger | undefined
let wideQuery: MediaQueryList | undefined
const updateWide = () => (wide.value = wideQuery?.matches ?? false)

onMounted(() => {
  wideQuery = matchMedia('(min-aspect-ratio: 4/5)')
  wideQuery.addEventListener('change', updateWide)
  updateWide()

  render(0)
  if (!hero.value) return
  trigger = ScrollTrigger.create({
    trigger: hero.value,
    start: 'top top',
    end: 'bottom top',
    onUpdate: (self) => render(self.progress),
    onRefresh: (self) => render(self.progress),
  })
})

onUnmounted(() => {
  window.clearTimeout(quietTimer)
  trigger?.kill()
  wideQuery?.removeEventListener('change', updateWide)
})

defineExpose({ start })
</script>

<template>
  <!-- Escenario fijo: el video queda detrás de toda la invitación -->
  <div class="stage" :class="{ 'is-hidden': covered }">
    <video
      v-if="wide"
      ref="ambient"
      class="stage__ambient"
      :src="reel"
      muted
      loop
      playsinline
      preload="metadata"
      aria-hidden="true"
    />
    <video
      ref="video"
      class="stage__video"
      :src="reel"
      :poster="poster"
      loop
      playsinline
      preload="auto"
      @play="onPlay"
      @pause="onPause"
    />
    <div class="stage__shade" :class="{ 'is-quiet': quiet }" />
  </div>

  <!-- Velo pastel que sube con el scroll hasta cubrir el video -->
  <div ref="veil" class="veil">
    <PastelBackdrop :feather="0.6" />
  </div>

  <section ref="hero" class="hero" aria-label="Video de bienvenida">
    <div v-if="started" ref="copy" class="hero__copy">
      <div class="hero__layout" :class="{ 'is-quiet': quiet }">
        <p v-reveal:blur="500" class="hero__chip">Baby Shower <span>·</span> Ada Kollontai</p>

        <div class="hero__bottom">
          <RevealText
            class="script hero__caption"
            :lines="['Una nueva aventura', 'comienza']"
            :delay="900"
          />
          <div v-reveal="1900">
            <button class="hero__cue" type="button" @click="scrollToSection('invitacion')">
              Desliza
              <span class="hero__cue-line" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="started && blocked && !playing"
      class="hero__play"
      type="button"
      aria-label="Reproducir video"
      @click="play"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
    </button>
  </section>

  <button
    v-if="started"
    class="sound"
    :class="{ 'sound--light': covered, 'is-on': !muted }"
    type="button"
    :aria-label="muted ? 'Activar sonido' : 'Silenciar'"
    :aria-pressed="!muted"
    @click="toggleSound"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" stroke="none" />
      <path v-if="muted" d="m15.5 9.5 5 5m0-5-5 5" />
      <path v-else d="M15 9a4.2 4.2 0 0 1 0 6m2.4-8.6a7.8 7.8 0 0 1 0 11.2" />
    </svg>
  </button>
</template>

<style scoped>
/* lvh: el alto con la barra del navegador ya escondida, para que el video
   no salte ni deje un hueco cuando la barra se oculta al hacer scroll. */
.stage,
.veil {
  position: fixed;
  inset: 0 0 auto;
  height: 100vh;
  height: 100lvh;
  pointer-events: none;
}

.stage {
  z-index: 0;
  overflow: hidden;
  display: grid;
  /* Una sola celda del tamaño del escenario: las capas se apilan en ella */
  grid-template: 100% / 100%;
  place-items: center;
  background: #e9e4dc;
}

.stage.is-hidden {
  visibility: hidden;
}

.stage > * {
  grid-area: 1 / 1;
}

.stage__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
}

.stage__ambient {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(46px) saturate(1.25) brightness(0.8);
  scale: 1.25;
}

/* Sombra arriba y abajo para que el texto se lea sobre cualquier escena */
.stage__shade {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgb(62 26 40 / 0.5),
    transparent 20%,
    transparent 42%,
    rgb(62 26 40 / 0.5) 72%,
    rgb(62 26 40 / 0.82)
  );
  transition: opacity 1.8s ease;
}

.stage__shade.is-quiet {
  opacity: 0;
}

@media (min-aspect-ratio: 4/5) {
  /* El reel completo al centro, con los bordes fundidos en su propio reflejo */
  .stage__video {
    width: auto;
    aspect-ratio: 9 / 16;
    -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
    mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
  }
}

/* El velo sube completo con `transform` (lo mueve el scroll desde render):
   es una capa ya pintada que el teléfono solo desplaza. Su borde de arriba
   se desvanece (feather) para fundirse con el video en lugar de cortarlo. */
.veil {
  z-index: 1;
  will-change: transform;
}

/* svh: el alto con la barra del navegador visible, para que el texto
   y la invitación a deslizar nunca queden debajo de ella. */
.hero {
  height: 100vh;
  height: 100svh;
  color: #fff;
  pointer-events: none;
}

/* Controles sobre el video: en teléfonos, un ahumado translúcido; con mouse, vidrio
   desenfocado (desenfocar un video en cada cuadro le cuesta de más a un teléfono). */
.hero,
.sound {
  --smoke: rgb(62 26 40 / 0.34);
}

@media (hover: hover) and (pointer: fine) {
  .hero,
  .sound {
    --smoke: rgb(255 255 255 / 0.16);
  }

  .hero__chip,
  .hero__play,
  .sound:not(.sound--light) {
    -webkit-backdrop-filter: blur(12px) saturate(1.4);
    backdrop-filter: blur(12px) saturate(1.4);
  }
}

.hero__copy {
  height: 100%;
}

.hero__layout {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: min(100%, calc(var(--col) * 1.3));
  height: 100%;
  margin: 0 auto;
  padding: calc(env(safe-area-inset-top, 0px) + var(--s) * 18) var(--gutter)
    calc(env(safe-area-inset-bottom, 0px) + var(--s) * 30);
}

/* A los 15 segundos el texto se desvanece y queda solo el video */
.hero__layout {
  transition:
    opacity 1.8s ease,
    visibility 0s;
}

.hero__layout.is-quiet {
  opacity: 0;
  visibility: hidden;
  transition-delay: 0s, 1.8s;
}

.hero__chip {
  display: flex;
  align-items: center;
  gap: 0.6em;
  min-height: max(calc(var(--s) * 44), 44px);
  /* Deja libre la esquina del botón de sonido */
  max-width: calc(100% - max(calc(var(--s) * 44), 44px) - var(--s) * 10);
  padding: 0 calc(var(--s) * 16);
  border: 1px solid rgb(255 255 255 / 0.35);
  border-radius: 999px;
  background: var(--smoke);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: max(calc(var(--s) * 11.5), 10px);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  white-space: nowrap;
}

.hero__chip span {
  opacity: 0.6;
}

.hero__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--s) * 22);
  width: 100%;
  text-align: center;
}

.hero__caption {
  font-size: calc(var(--s) * 50);
  line-height: 1.02;
  text-shadow: 0 2px calc(var(--s) * 22) rgb(62 26 40 / 0.6);
}

.hero__cue {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--s) * 10);
  min-width: 44px;
  padding: calc(var(--s) * 6) calc(var(--s) * 14) 0;
  border: 0;
  background: none;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: max(calc(var(--s) * 11.5), 11px);
  letter-spacing: 0.34em;
  text-indent: 0.34em;
  text-shadow: 0 1px calc(var(--s) * 10) rgb(62 26 40 / 0.7);
  text-transform: uppercase;
  cursor: pointer;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
}

.hero__cue:focus-visible,
.hero__play:focus-visible,
.sound:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 3px;
}

/* Una gota de luz que cae por la línea, una y otra vez */
.hero__cue-line {
  position: relative;
  width: 1.5px;
  height: calc(var(--s) * 44);
  overflow: hidden;
  background: rgb(255 255 255 / 0.4);
}

.hero__cue-line::after {
  content: '';
  position: absolute;
  inset: 0;
  background: #fff;
  animation: cue 2s cubic-bezier(0.7, 0, 0.3, 1) infinite;
}

@keyframes cue {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
}

.hero__play {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  width: calc(var(--s) * 84);
  height: calc(var(--s) * 84);
  padding: 0;
  border: 1px solid rgb(255 255 255 / 0.5);
  border-radius: 50%;
  background: var(--smoke);
  translate: -50% -50%;
  cursor: pointer;
  pointer-events: auto;
}

.hero__play svg {
  width: 44%;
  fill: #fff;
}

/* Botón de sonido: siempre a la mano, también cuando el video ya quedó atrás */
.sound {
  position: fixed;
  top: calc(env(safe-area-inset-top, 0px) + var(--s) * 18);
  right: max(var(--gutter), calc(50vw - var(--col) * 0.65 + var(--gutter)));
  z-index: 20;
  display: grid;
  place-items: center;
  width: max(calc(var(--s) * 44), 44px);
  height: max(calc(var(--s) * 44), 44px);
  padding: 0;
  border: 1px solid rgb(255 255 255 / 0.35);
  border-radius: 50%;
  background: var(--smoke);
  color: #fff;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    scale 0.3s var(--ease-spring),
    color 0.5s ease,
    background-color 0.5s ease,
    border-color 0.5s ease;
  animation: sound-in 0.9s var(--ease-out) 0.6s backwards;
}

.sound--light {
  border-color: var(--glass-border);
  background: var(--glass-bg);
  box-shadow: var(--glass-shadow);
  color: var(--pink-deep);
}

/* Con sonido, un halo late alrededor del botón */
.sound.is-on::after {
  content: '';
  position: absolute;
  inset: -1px;
  border: 1.5px solid currentColor;
  border-radius: 50%;
  animation: sound-ring 2.2s ease-out infinite;
}

.sound:active {
  scale: 0.9;
}

@media (hover: hover) {
  .sound:hover {
    scale: 1.08;
  }
}

.sound svg {
  width: 54%;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@keyframes sound-in {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
}

@keyframes sound-ring {
  from {
    transform: scale(1);
    opacity: 0.6;
  }
  to {
    transform: scale(1.55);
    opacity: 0;
  }
}
</style>
