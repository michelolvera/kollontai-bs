<script setup lang="ts">
import bow from '../assets/img/bow.webp'
import clothesPink from '../assets/img/clothes-pink.webp'
import duckling from '../assets/img/duckling.webp'
import frame from '../assets/img/frame.webp'
import geese from '../assets/img/geese.webp'
import roses from '../assets/img/roses.webp'
import vine from '../assets/img/vine.webp'
import { vParallax } from '../directives/parallax'
import { vReveal } from '../directives/reveal'
import RevealText from './RevealText.vue'
</script>

<template>
  <!-- La llegada: tendedero -->
  <section id="invitacion" class="arrival">
    <!-- El texto va justo al centro del círculo: el moño cuelga de su borde de arriba
         y el tendedero cruza por el de abajo -->
    <div class="arrival__panel">
      <div v-reveal:scale class="arrival__shape">
        <div class="arrival__blob glass" />
      </div>
      <div v-reveal:scale class="arrival__bow">
        <img class="floaty" :src="bow" width="474" height="500" alt="" />
      </div>
      <RevealText
        class="arrival__text"
        :lines="['Una pequeñita llega', 'para recorrer el mundo...']"
        :delay="200"
      />
    </div>
    <div v-reveal="350" class="arrival__clothes">
      <img
        class="sway"
        :src="clothesPink"
        width="920"
        height="552"
        alt="Ropa de bebé colgada en un tendedero"
      />
    </div>
  </section>

  <!-- La invitación: arco con mamá y papá ganso -->
  <section class="invite">
    <div v-reveal class="invite__arch glass">
      <div v-reveal:scale="150" class="invite__crown">
        <img class="invite__roses invite__roses--left" :src="roses" width="400" height="414" alt="" />
        <img class="invite__roses invite__roses--right" :src="roses" width="400" height="414" alt="" />
        <img class="invite__bow" :src="bow" width="474" height="500" alt="" />
      </div>
      <RevealText
        class="script invite__text"
        :lines="['Acompáñanos', 'a celebrar la llegada', 'de nuestra hija']"
        :delay="300"
      />
      <div v-reveal:scale="450" class="invite__geese">
        <img
          v-parallax="-16"
          :src="geese"
          width="514"
          height="575"
          alt="Mamá y papá ganso abrazando a su bebé"
        />
      </div>
    </div>

    <!-- El nombre, acunado por la guía de flores -->
    <div class="invite__name">
      <div v-reveal:scale="150" class="invite__vine">
        <img :src="vine" width="800" height="266" alt="" />
      </div>
      <p v-reveal:write="350" class="script name"><span>Kollontai</span></p>
    </div>
  </section>

  <!-- La portada: marco de flores -->
  <section class="cover">
    <div v-reveal:scale class="cover__frame">
      <div class="cover__oval" />
      <img class="cover__garland" :src="frame" width="1300" height="1821" alt="" />
      <div class="cover__content">
        <h1 class="cover__title">
          <span class="cover__baby">Baby</span>
          <span class="script cover__shower">Shower</span>
        </h1>
        <img
          class="cover__duckling"
          :src="duckling"
          width="434"
          height="659"
          alt="Patita con moño y botas rosas"
        />
        <p v-reveal:write="500" class="script name cover__name"><span>Kollontai</span></p>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  width: var(--col);
  margin: 0 auto;
}

img {
  width: 100%;
  height: auto;
}

/* ---------- Llegada ---------- */

.arrival {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(var(--s) * 120) 0 calc(var(--s) * 30);
}

.arrival__panel {
  position: relative;
  display: grid;
  place-items: center;
  width: calc(100% - var(--s) * 28);
  aspect-ratio: 1;
}

.arrival__shape {
  position: absolute;
  inset: 0;
}

/* Círculo de vidrio que respira despacio */
.arrival__blob {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: breathe 9s ease-in-out infinite alternate;
}

@keyframes breathe {
  to {
    transform: scale(1.03);
  }
}

/* El nudo y las lazadas quedan montados sobre el borde del círculo;
   las puntas cuelgan hacia adentro */
.arrival__bow {
  position: absolute;
  top: calc(var(--s) * -48);
  left: 50%;
  width: calc(var(--s) * 132);
  margin-left: calc(var(--s) * -66);
  rotate: -7deg;
}

.arrival__text {
  position: relative;
  color: var(--olive-dark);
  font-family: var(--font-formal-script);
  font-size: calc(var(--s) * 35);
  line-height: 1.12;
  text-align: center;
}

/* El tendedero es más ancho que la columna: se sale por ambos lados */
.arrival__clothes {
  position: relative;
  width: calc(var(--col) * 1.04);
  margin-top: calc(var(--s) * -104);
}

/* ---------- Invitación ---------- */

.invite {
  padding: calc(var(--s) * 120) var(--gutter) calc(var(--s) * 56);
}

.invite__arch {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(var(--s) * 112) calc(var(--s) * 18) 0;
  border-radius: calc(var(--s) * 173) calc(var(--s) * 173) calc(var(--s) * 44) calc(var(--s) * 44);
}

/* Corona de rosas y moño montada sobre la cima del arco */
.invite__crown {
  position: absolute;
  top: calc(var(--s) * -78);
  left: 50%;
  width: calc(var(--s) * 262);
  aspect-ratio: 707 / 430;
  margin-left: calc(var(--s) * -131);
}

.invite__crown img {
  position: absolute;
}

.invite__roses {
  top: 17.7%;
  width: 48.2%;
}

.invite__roses--left {
  left: 0;
  transform: scaleX(-1);
}

.invite__roses--right {
  right: 0;
}

.invite__bow {
  top: 0;
  left: 22.3%;
  width: 57.7%;
}

.invite__text {
  color: var(--pink);
  font-size: calc(var(--s) * 35);
  line-height: 1.08;
  text-align: center;
}

/* Las patas de los gansos pisan fuera del arco */
.invite__geese {
  width: calc(var(--s) * 232);
  margin: calc(var(--s) * 20) 0 calc(var(--s) * -42);
}

.invite__name {
  position: relative;
  display: grid;
  place-items: center;
  width: calc(var(--s) * 316);
  aspect-ratio: 949 / 313;
  margin: calc(var(--s) * 62) auto 0;
}

/* Luz crema detrás del nombre para despegarlo de las rayas */
.invite__name::before {
  content: '';
  position: absolute;
  inset: -45% -12%;
  background: radial-gradient(closest-side, rgb(254 252 249 / 0.95) 35%, transparent);
}

.invite__vine {
  position: absolute;
  inset: 0;
}

.invite__name .name {
  position: relative;
  align-self: start;
  margin-top: calc(var(--s) * -14);
  font-size: calc(var(--s) * 64);
}

/* El nombre de Kollontai, en la invitación y en la portada */
.name {
  color: var(--olive);
  line-height: 1.15;
  white-space: nowrap;
}

/* El recorte de v-reveal:write no debe cortar los rasgos de la caligrafía */
.name span {
  padding: 0 0.12em;
}

/* ---------- Portada ---------- */

.cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(var(--s) * 30) 0 calc(var(--s) * 40);
}

.cover__frame {
  position: relative;
  width: calc(var(--s) * 384);
  aspect-ratio: 1300 / 1821;
}

.cover__oval {
  position: absolute;
  inset: 6% 5% 3%;
  border-radius: 50%;
  background: #fbf9f8;
  box-shadow: 0 calc(var(--s) * 30) calc(var(--s) * 70) calc(var(--s) * -20) rgb(164 80 106 / 0.45);
}

.cover__garland {
  position: absolute;
  inset: 0;
}

/* Sin z-index ni transformaciones aquí: la patita se funde (multiply) con el óvalo */
.cover__content {
  position: absolute;
  inset: 17% 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cover__title {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}

.cover__baby {
  color: var(--olive);
  font-family: var(--font-serif);
  font-size: calc(var(--s) * 38);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.cover__shower {
  margin-top: calc(var(--s) * -4);
  color: var(--pink);
  font-size: calc(var(--s) * 54);
}

/* La ilustración trae fondo blanco: multiply lo funde con el óvalo */
.cover__duckling {
  width: calc(var(--s) * 128);
  margin-top: calc(var(--s) * 10);
  mix-blend-mode: multiply;
  transform-origin: 50% 100%;
  animation: waddle 3.2s ease-in-out infinite;
}

@keyframes waddle {
  0%,
  100% {
    rotate: -2.5deg;
  }
  50% {
    rotate: 2.5deg;
    translate: 0 calc(var(--s) * -4);
  }
}

.cover__name {
  margin-top: calc(var(--s) * -4);
  font-size: calc(var(--s) * 68);
}
</style>
