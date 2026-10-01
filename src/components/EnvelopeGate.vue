<script setup lang="ts">
import envelope from '../assets/img/envelope.webp'
import PastelBackdrop from './PastelBackdrop.vue'

// Portada: el sobre cubre la página hasta que se toca. Ese toque es además el gesto
// que el navegador exige para reproducir el video con sonido.
defineEmits<{ open: [] }>()
</script>

<template>
  <div class="gate">
    <PastelBackdrop />
    <button class="gate__button" type="button" @click="$emit('open')">
      <span class="gate__envelope">
        <img :src="envelope" width="1150" height="1652" alt="" />
        <span class="gate__text">Invitación especial<br />para ti...</span>
      </span>
      <span class="gate__hint">
        <span class="gate__dot" aria-hidden="true" />
        <span class="script">Toca el sobre para abrir</span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.gate {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.gate__button {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

/* El sobre mide 340 unidades: el texto se alinea con los renglones dibujados en la carta */
.gate__envelope {
  position: relative;
  display: block;
  width: min(calc(var(--s) * 340), 62vh);
  --e: calc(min(calc(var(--s) * 340), 62vh) / 340);
  margin: calc(var(--e) * -40) 0 calc(var(--e) * -62);
  animation:
    gate-in 1.4s var(--ease-out) backwards,
    floaty 5.5s ease-in-out 1.4s infinite alternate;
  transition: scale 0.5s var(--ease-spring);
}

.gate__envelope img {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 calc(var(--e) * 22) calc(var(--e) * 26) rgb(164 80 106 / 0.3));
}

.gate__text {
  position: absolute;
  top: 32.6%;
  right: 0;
  left: 0;
  color: var(--brown);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: calc(var(--e) * 13.6);
  line-height: calc(var(--e) * 22.2);
  letter-spacing: 0.02em;
  text-align: center;
  text-transform: uppercase;
}

@media (hover: hover) {
  .gate__button:hover .gate__envelope {
    scale: 1.04;
  }
}

.gate__button:active .gate__envelope {
  scale: 0.97;
}

.gate__button:focus-visible .gate__hint {
  outline: 3px solid var(--olive-dark);
  outline-offset: 6px;
  border-radius: 999px;
}

.gate__button:focus {
  outline: none;
}

.gate__hint {
  position: relative;
  display: flex;
  align-items: center;
  gap: calc(var(--s) * 12);
  color: var(--pink-deep);
  font-size: calc(var(--s) * 30);
  line-height: 1.2;
  animation: gate-in 1.4s var(--ease-out) 0.5s backwards;
}

.gate__dot {
  position: relative;
  width: calc(var(--s) * 10);
  height: calc(var(--s) * 10);
  border-radius: 50%;
  background: var(--pink);
}

.gate__dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--pink);
  animation: ping 1.8s ease-out infinite;
}

@keyframes ping {
  to {
    transform: scale(3.6);
    opacity: 0;
  }
}

@keyframes gate-in {
  from {
    opacity: 0;
    transform: translateY(calc(var(--s) * 30)) scale(0.92);
  }
}
</style>

<!-- Salida: el sobre se acerca y la portada se disuelve sobre el video -->
<style>
.gate-leave-active {
  transition: opacity 1.1s ease 0.15s;
  pointer-events: none;
}

.gate.gate-leave-active .gate__envelope {
  transition:
    transform 1.25s cubic-bezier(0.7, 0, 0.3, 1),
    opacity 0.9s ease 0.2s;
}

.gate.gate-leave-active .gate__hint {
  transition: opacity 0.3s ease;
}

.gate-leave-to,
.gate.gate-leave-to .gate__hint {
  opacity: 0;
}

.gate.gate-leave-to .gate__envelope {
  opacity: 0;
  transform: scale(2.4) rotate(-4deg);
}

@media (prefers-reduced-motion: reduce) {
  .gate.gate-leave-to .gate__envelope {
    transform: none;
  }
}
</style>
