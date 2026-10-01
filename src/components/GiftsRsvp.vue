<script setup lang="ts">
import bow from '../assets/img/bow.webp'
import giftbox from '../assets/img/giftbox.webp'
import glasses from '../assets/img/glasses.svg'
import goose from '../assets/img/goose.webp'
import calendarIcon from '../assets/img/icon-calendar.webp'
import sadIcon from '../assets/img/icon-sad.svg'
import whatsappIcon from '../assets/img/icon-whatsapp.svg'
import rattle from '../assets/img/rattle.webp'
import { maskIcon } from '../design'
import { vParallax } from '../directives/parallax'
import { vReveal } from '../directives/reveal'
import { REGISTRY, RSVP_NO_URL, RSVP_YES_URL } from '../event'
import PillButton from './PillButton.vue'
import RegistryCard from './RegistryCard.vue'
</script>

<template>
  <section id="regalos" class="gifts">
    <div v-reveal:scale class="gifts__box">
      <img class="floaty" :src="giftbox" width="260" height="289" alt="" />
    </div>
    <h2 v-reveal:blur="100" class="script gifts__title">Regalos</h2>

    <p v-reveal="150" class="gifts__intro glass">
      Lo más importante para nosotros es tu presencia y tu buena energía en el Baby Shower. Pero si
      deseas dar un regalo a nuestra hija, lo recibiremos con mucho cariño y te compartimos nuestra
      mesa de regalos
    </p>

    <div class="gifts__registry">
      <div v-reveal:scale>
        <RegistryCard :href="REGISTRY.amazon" store="Amazon" tone="olive" />
      </div>
      <div v-reveal:scale="150">
        <RegistryCard :href="REGISTRY.liverpool" store="Liverpool" tone="pink" />
      </div>
    </div>

    <div v-reveal class="gifts__spoiler">
      <img v-parallax="-12" class="gifts__rattle" :src="rattle" width="200" height="341" alt="" />
      <p>
        <strong>Spoiler:</strong> Recuerda que somos primerizos y todavía no tenemos muy claro qué
        necesitamos jeje
      </p>
    </div>

    <!-- La gansa se asoma por encima de la tarjeta -->
    <div v-reveal class="gifts__free">
      <div v-reveal:left="200" class="gifts__goose">
        <img :src="goose" width="612" height="612" alt="Gansa con lentes y moño rosa" />
        <img class="gifts__ribbon" :src="glasses" alt="" />
      </div>
      <h3 class="gifts__subtitle">Regalos que no cuestan pero valen muchísimo</h3>
      <p class="gifts__resources">
        Lupita, en su infinita ñoñez, agradecerá de corazón si compartes contactos de asesoras de
        lactancia, clases de estimulación prenatal, cursos de primeros auxilios para bebés o
        cualquier recurso útil que nos ayude en esta nueva aventura
      </p>
    </div>
  </section>

  <section id="confirmacion" class="rsvp">
    <div class="rsvp__glow" aria-hidden="true" />
    <div class="rsvp__inner">
      <span v-reveal:scale class="rsvp__seal" aria-hidden="true">
        <span class="icon-mask" :style="maskIcon(calendarIcon)" />
      </span>
      <h2 v-reveal:blur="100" class="script rsvp__title">Confirmación</h2>
      <p v-reveal="200" class="rsvp__text">
        Agradecemos que confirmes tu asistencia antes del <strong>20 de octubre</strong>
      </p>
      <div v-reveal="300" class="rsvp__actions">
        <PillButton variant="light" pulse :href="RSVP_YES_URL" external :icon="whatsappIcon">
          Confirmar asistencia
        </PillButton>
        <PillButton variant="ghost" :href="RSVP_NO_URL" external>
          No puedo asistir
          <span class="rsvp__sad icon-mask" :style="maskIcon(sadIcon)" aria-hidden="true" />
        </PillButton>
      </div>

      <div v-reveal:scale="150" class="rsvp__farewell">
        <img :src="bow" width="474" height="500" alt="" />
        <p class="script">¡Te esperamos!</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ---------- Regalos ---------- */

.gifts {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--col);
  margin: 0 auto;
  padding: calc(var(--s) * 40) var(--gutter) calc(var(--s) * 70);
}

.gifts__box {
  width: calc(var(--s) * 104);
}

.gifts__box img {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 calc(var(--s) * 14) calc(var(--s) * 14) rgb(164 80 106 / 0.28));
}

.gifts__title {
  margin-top: calc(var(--s) * 4);
  color: var(--olive-dark);
  font-size: calc(var(--s) * 68);
  line-height: 1.05;
}

.gifts__intro {
  margin-top: calc(var(--s) * 16);
  padding: calc(var(--s) * 24) calc(var(--s) * 22);
  border-radius: calc(var(--s) * 32);
  font-size: var(--fs-body);
  line-height: 1.65;
  text-align: center;
  text-wrap: pretty;
}

.gifts__registry {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--s) * 14);
  width: 100%;
  margin-top: calc(var(--s) * 20);
}

/* Las tarjetas no quedan a la misma altura */
.gifts__registry > :last-child {
  margin-top: calc(var(--s) * 20);
}

.gifts__registry > * > * {
  height: 100%;
}

/* Nota inclinada, con la sonaja colgando de la esquina */
.gifts__spoiler {
  position: relative;
  align-self: flex-start;
  width: 86%;
  margin-top: calc(var(--s) * 36);
  padding: calc(var(--s) * 18) calc(var(--s) * 58) calc(var(--s) * 18) calc(var(--s) * 20);
  border: 1.5px dashed rgb(223 114 146 / 0.7);
  border-radius: calc(var(--s) * 22);
  background: rgb(255 250 250 / 0.82);
  font-size: var(--fs-small);
  line-height: 1.6;
  rotate: -2deg;
}

.gifts__spoiler strong {
  color: var(--pink);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.15em;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.gifts__rattle {
  position: absolute;
  top: calc(var(--s) * -20);
  right: calc(var(--s) * -44);
  width: calc(var(--s) * 84);
  height: auto;
  rotate: 18deg;
  filter: drop-shadow(0 calc(var(--s) * 10) calc(var(--s) * 10) rgb(164 80 106 / 0.25));
}

.gifts__free {
  position: relative;
  width: 100%;
  margin-top: calc(var(--s) * 96);
  padding: calc(var(--s) * 28) calc(var(--s) * 22) calc(var(--s) * 28);
  border: 1px solid var(--glass-border);
  border-radius: calc(var(--s) * 36);
  background:
    linear-gradient(rgb(252 251 247 / 0.5), rgb(252 251 247 / 0.5)),
    var(--cream) url('../assets/img/duck-pattern.webp') 0 0 / calc(var(--s) * 150);
  box-shadow: var(--glass-shadow);
}

.gifts__goose {
  position: absolute;
  top: calc(var(--s) * -92);
  left: calc(var(--s) * -22);
  width: calc(var(--s) * 176);
  pointer-events: none;
}

.gifts__goose img:first-child {
  width: 100%;
  height: auto;
}

/* glasses.svg es el moño del cuello: de vez en cuando se le mueve */
.gifts__ribbon {
  position: absolute;
  top: 40.7%;
  left: 39.4%;
  width: 24.4%;
  rotate: 4.7deg;
  animation: flutter 6s ease-in-out infinite;
}

@keyframes flutter {
  84% {
    rotate: 11deg;
  }
  92% {
    rotate: 0deg;
  }
}

.gifts__subtitle {
  margin-left: calc(var(--s) * 128);
  color: var(--pink);
  font-weight: 700;
  font-size: calc(var(--s) * 16.5);
  line-height: 1.35;
  text-wrap: balance;
}

.gifts__resources {
  margin-top: calc(var(--s) * 22);
  font-size: var(--fs-body);
  line-height: 1.65;
  text-wrap: pretty;
}

/* ---------- Confirmación ---------- */

.rsvp {
  overflow: hidden;
  border-radius: 50% 50% 0 0 / calc(var(--s) * 64) calc(var(--s) * 64) 0 0;
  background: linear-gradient(165deg, #a7b05a, var(--olive) 38%, var(--olive-dark));
  color: #fff;
  text-align: center;
}

/* Patitos del diseño y luces verdes que se mueven despacio */
.rsvp__glow {
  position: absolute;
  inset: 0;
  background: url('../assets/img/duck-pattern.webp') 0 0 / calc(var(--s) * 170);
  opacity: 0.4;
}

.rsvp::before,
.rsvp::after {
  content: '';
  position: absolute;
  width: 110vmax;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgb(189 208 141 / 0.75), transparent);
  animation: glow 16s ease-in-out infinite alternate;
}

.rsvp::before {
  top: -60vmax;
  left: -60vmax;
}

.rsvp::after {
  right: -70vmax;
  bottom: -70vmax;
  background: radial-gradient(closest-side, rgb(229 104 129 / 0.3), transparent);
  animation-duration: 21s;
  animation-direction: alternate-reverse;
}

@keyframes glow {
  to {
    transform: translate3d(18vmax, 14vmax, 0) scale(1.15);
  }
}

.rsvp__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--col);
  margin: 0 auto;
  padding: calc(var(--s) * 74) var(--gutter)
    calc(env(safe-area-inset-bottom, 0px) + var(--s) * 50);
}

.rsvp__seal {
  display: grid;
  place-items: center;
  width: calc(var(--s) * 68);
  height: calc(var(--s) * 68);
  border: 1px solid rgb(255 255 255 / 0.55);
  border-radius: 50%;
  background: rgb(255 255 255 / 0.16);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

.rsvp__seal .icon-mask {
  width: 42%;
  height: 42%;
}

.rsvp__title {
  margin-top: calc(var(--s) * 14);
  font-size: calc(var(--s) * 64);
  line-height: 1.1;
  text-shadow: 0 2px calc(var(--s) * 18) rgb(60 75 20 / 0.45);
}

.rsvp__text {
  max-width: calc(var(--s) * 300);
  margin-top: calc(var(--s) * 10);
  font-style: italic;
  font-size: calc(var(--s) * 16);
  line-height: 1.55;
  text-wrap: balance;
}

.rsvp__text strong {
  font-weight: 700;
  white-space: nowrap;
}

.rsvp__actions {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: calc(var(--s) * 16);
  width: min(100%, calc(var(--s) * 300));
  margin-top: calc(var(--s) * 32);
}

.rsvp__sad {
  width: 1em;
  height: 0.9em;
  margin-left: 0.5em;
  rotate: -19deg;
}

.rsvp__farewell {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: calc(var(--s) * 60);
  font-size: calc(var(--s) * 42);
  line-height: 1.1;
}

.rsvp__farewell img {
  width: calc(var(--s) * 76);
  height: auto;
  filter: drop-shadow(0 calc(var(--s) * 8) calc(var(--s) * 10) rgb(60 75 20 / 0.4));
}
</style>
