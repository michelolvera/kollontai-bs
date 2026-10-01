<script setup lang="ts">
import giftbox from '../assets/img/giftbox.webp'
import glasses from '../assets/img/glasses.svg'
import goose from '../assets/img/goose.webp'
import calendarIcon from '../assets/img/icon-calendar.webp'
import presentIcon from '../assets/img/icon-present.webp'
import sadIcon from '../assets/img/icon-sad.svg'
import whatsappIcon from '../assets/img/icon-whatsapp.svg'
import rattle from '../assets/img/rattle.webp'
import { box, maskIcon } from '../design'
import { vReveal } from '../directives/reveal'
import { REGISTRY, RSVP_NO_URL, RSVP_YES_URL } from '../event'
import PillButton from './PillButton.vue'
</script>

<template>
  <section id="regalos" class="sheet gifts">
    <div class="gifts__column" />
    <img v-reveal class="fill" :style="box(15, 508, 223, 248)" :src="giftbox" alt="" />
    <img v-reveal="300" class="fill gifts__rattle" :style="box(448, 997, 164, 280)" :src="rattle" alt="" />

    <h2 v-reveal class="script gifts__title">Regalos</h2>
    <p v-reveal="100" class="gifts__text gifts__intro">
      Lo más importante para nosotros es tu presencia y tu buena energía en el Baby Shower. Pero si
      deseas dar un regalo a nuestra hija, lo recibiremos con mucho cariño y te compartimos nuestra
      mesa de regalos
    </p>

    <div v-reveal="150" class="gifts__registry" aria-label="Mesa de regalos">
      <PillButton :href="REGISTRY.amazon" external :icon="presentIcon">Amazon</PillButton>
      <PillButton :href="REGISTRY.liverpool" external :icon="presentIcon">Liverpool</PillButton>
    </div>

    <p v-reveal class="gifts__text gifts__spoiler">
      <strong>SPOILER:</strong> Recuerda que somos primerizos y todavía no tenemos muy claro qué
      necesitamos jeje
    </p>

    <div class="gifts__free">
      <div v-reveal class="gifts__goose">
        <img class="fill" :src="goose" alt="Gansa con lentes y moño rosa" />
        <img class="gifts__glasses" :style="box(215, 208, 129, 70)" :src="glasses" alt="" />
      </div>
      <h3 v-reveal class="gifts__subtitle">Regalos que no cuestan pero valen muchísimo</h3>
      <p v-reveal="100" class="gifts__text gifts__resources">
        Lupita, en su infinita ñoñez, agradecerá de corazón si compartes contactos de asesoras de
        lactancia, clases de estimulación prenatal, cursos de primeros auxilios para bebés o
        cualquier recurso útil que nos ayude en esta nueva aventura
      </p>
    </div>

    <div id="confirmacion" class="rsvp">
      <span
        v-reveal
        class="rsvp__icon"
        :style="maskIcon(calendarIcon)"
        aria-hidden="true"
      />
      <h2 v-reveal="50" class="script rsvp__title">Confirmación</h2>
      <p v-reveal="100" class="rsvp__text">
        Agradecemos que confirmes tu asistencia antes del 20 de octubre
      </p>
      <div v-reveal="150" class="rsvp__actions">
        <PillButton class="rsvp__button" :href="RSVP_YES_URL" external :icon="whatsappIcon">
          Confirmar asistencia
        </PillButton>
        <PillButton class="rsvp__button" :href="RSVP_NO_URL" external :icon="whatsappIcon">
          No puedo asistir
          <span class="rsvp__sad" :style="maskIcon(sadIcon)" aria-hidden="true" />
        </PillButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gifts {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: calc(var(--u) * 268);
}

/* Columna crema con el estampado de patitos */
.gifts__column {
  position: absolute;
  inset: 0 auto 0 calc(var(--u) * 168);
  width: calc(var(--u) * 913);
  background:
    linear-gradient(var(--cream), transparent calc(var(--u) * 200)),
    var(--cream) url('../assets/img/duck-pattern.webp') 0 0 / calc(var(--u) * 427);
}

.gifts > :not(.gifts__column, img) {
  position: relative;
}

.fill {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.gifts__rattle {
  transform: rotate(14deg);
}

.gifts__title {
  left: calc(var(--u) * -17);
  color: var(--olive-dark);
  font-size: calc(var(--u) * 114);
  line-height: 0.95;
  letter-spacing: 0.04em;
}

.gifts__text {
  color: var(--olive-text);
  font-size: max(calc(var(--u) * 28), 12px);
  line-height: 1.4;
  text-align: center;
  text-wrap: pretty;
}

.gifts__intro {
  left: calc(var(--u) * 17);
  width: calc(var(--u) * 740);
  margin-top: calc(var(--u) * 6);
}

.gifts__registry {
  left: calc(var(--u) * 28);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: calc(var(--u) * 24);
  width: calc(var(--u) * 760);
  margin-top: calc(var(--u) * 36);
}

.gifts__spoiler {
  left: calc(var(--u) * 30);
  width: calc(var(--u) * 645);
  margin-top: calc(var(--u) * 36);
  font-size: max(calc(var(--u) * 24), 11px);
}

.gifts__spoiler strong {
  color: var(--pink);
  font-weight: 400;
}

/* Bloque con la gansa a la izquierda: sus patas pisan el panel verde */
.gifts__free {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: calc(var(--u) * 50);
  padding: 0 calc(var(--u) * 186) calc(var(--u) * 62) calc(var(--u) * 328);
}

.gifts__goose {
  position: absolute;
  z-index: 1;
  bottom: calc(var(--u) * -93);
  left: calc(var(--u) * -98);
  width: calc(var(--u) * 528);
  height: calc(var(--u) * 528);
  pointer-events: none;
}

.gifts__glasses {
  transform: rotate(4.7deg);
}

.gifts__subtitle {
  width: calc(var(--u) * 629);
  color: var(--pink);
  font-weight: 700;
  font-size: max(calc(var(--u) * 37.3), 14px);
  line-height: 1.3;
  text-align: center;
  text-wrap: balance;
}

.gifts__resources {
  margin-top: calc(var(--u) * 27);
}

.rsvp {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(var(--u) * 913);
  padding: calc(var(--u) * 71) calc(var(--u) * 30) calc(var(--u) * 80);
  background: var(--sage);
  color: #fff;
  text-align: center;
}

.rsvp__icon {
  width: calc(var(--u) * 54);
  height: calc(var(--u) * 54);
  background: currentColor;
  -webkit-mask: var(--icon) center / contain no-repeat;
  mask: var(--icon) center / contain no-repeat;
}

.rsvp__title {
  margin-top: calc(var(--u) * 16);
  font-size: calc(var(--u) * 94);
  line-height: 1;
}

.rsvp__text {
  width: calc(var(--u) * 834);
  margin-top: calc(var(--u) * 12);
  font-style: italic;
  font-size: max(calc(var(--u) * 40.8), 14px);
  line-height: 1.4;
  text-wrap: balance;
}

.rsvp__actions {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: calc(var(--u) * 14);
  min-width: calc(var(--u) * 548);
  margin-top: calc(var(--u) * 34);
}

.rsvp__button {
  justify-content: space-between;
  text-transform: uppercase;
}

.rsvp__sad {
  display: inline-block;
  width: 0.85em;
  height: 0.75em;
  margin-left: 0.3em;
  rotate: -19deg;
  background: currentColor;
  -webkit-mask: var(--icon) center / contain no-repeat;
  mask: var(--icon) center / contain no-repeat;
}
</style>
