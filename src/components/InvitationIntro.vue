<script setup lang="ts">
import bow from '../assets/img/bow.webp'
import clothesPink from '../assets/img/clothes-pink.webp'
import duckling from '../assets/img/duckling.webp'
import envelope from '../assets/img/envelope.webp'
import frame from '../assets/img/frame.webp'
import geese from '../assets/img/geese.webp'
import roses from '../assets/img/roses.webp'
import vine from '../assets/img/vine.webp'
import { box } from '../design'
import { vReveal } from '../directives/reveal'
</script>

<template>
  <!-- Página 3: sobre -->
  <section class="sheet page envelope">
    <div v-reveal :style="box(124, 128, 992, 1427)">
      <img class="fill" :src="envelope" alt="" />
      <p class="envelope__text" :style="box(487, 115, 752, 105)">
        Invitación especial<br />para ti...
      </p>
    </div>
  </section>

  <!-- Página 4: tendedero -->
  <section class="sheet page">
    <div class="oval" :style="box(287, 137, 979, 1270)" />
    <img v-reveal class="fill" :style="box(124, 404, 408, 430)" :src="bow" alt="" />
    <p v-reveal="150" class="arrival" :style="box(592, 184, 884, 234)">
      Una pequeñita llega<br />para recorrer el mundo...
    </p>
    <img
      v-reveal="300"
      class="fill"
      :style="box(826, 245, 792, 475)"
      :src="clothesPink"
      alt="Ropa de bebé colgada en un tendedero"
    />
  </section>

  <!-- Página 5: invitación -->
  <section class="sheet page">
    <div class="arch" :style="box(281, 170, 913, 1467)" />
    <div v-reveal :style="box(104, 258, 707, 430)">
      <img class="fill" :style="box(76, 366, 341, 354)" :src="roses" alt="" />
      <img class="fill flip" :style="box(76, 0, 341, 354)" :src="roses" alt="" />
      <img class="fill" :style="box(0, 158, 408, 430)" :src="bow" alt="" />
    </div>
    <p v-reveal="150" class="script join" :style="box(556, 129, 990, 140)">
      Acompáñanos<br />a celebrar la llegada de nuestra hija
    </p>
    <img
      v-reveal="300"
      class="fill"
      :style="box(717, 336, 591, 661)"
      :src="geese"
      alt="Mamá y papá ganso abrazando a su bebé"
    />
    <div v-reveal :style="box(1437, 143, 949, 313)">
      <img class="fill" :src="vine" alt="" />
      <p class="line script name" :style="box(2, 93, 781, 165)">Kollontai</p>
    </div>
  </section>

  <!-- Página 6: portada -->
  <section class="sheet page">
    <div class="oval oval--cover" :style="box(180, 102, 1011, 1444)" />
    <img v-reveal class="fill" :style="box(91, 61, 1118, 1567)" :src="frame" alt="" />
    <h1 v-reveal="150" class="cover__title" :style="box(353, 300, 640, 290)">
      <span class="line cover__baby" :style="box(0, 103, 308, 123)">Baby</span>
      <span class="line script cover__shower" :style="box(145, 176, 505, 134)">Shower</span>
    </h1>
    <img
      v-reveal="250"
      class="fill duckling"
      :style="box(590, 421, 374, 568)"
      :src="duckling"
      alt="Patita con moño y botas rosas"
    />
    <p v-reveal="350" class="line script name name--cover" :style="box(1190, 168, 881, 179)">
      Kollontai
    </p>
  </section>
</template>

<style scoped>
.page {
  height: calc(var(--u) * 1748);
}

.fill {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.flip {
  transform: scaleX(-1);
}

.oval,
.arch {
  background: var(--cream);
}

.oval {
  border-radius: 50%;
}

.oval--cover {
  background: #fbf9f8;
}

.arch {
  border-radius: calc(var(--u) * 457) calc(var(--u) * 457) 0 0;
}

.envelope__text {
  color: var(--brown);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: calc(var(--u) * 39);
  line-height: 1.3;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
}

.arrival {
  display: grid;
  place-content: center;
  color: var(--olive-dark);
  font-family: var(--font-formal-script);
  font-size: calc(var(--u) * 82);
  line-height: 1.05;
  text-align: center;
  white-space: nowrap;
}

.join {
  color: var(--pink);
  font-size: calc(var(--u) * 74);
  line-height: 1.02;
  text-align: center;
  white-space: nowrap;
}

.name {
  color: var(--olive);
  font-size: calc(var(--u) * 170);
}

.name--cover {
  font-size: calc(var(--u) * 202);
}

.cover__title {
  font-size: inherit;
}

.cover__baby {
  color: var(--olive);
  font-family: var(--font-serif);
  font-size: calc(var(--u) * 116);
  text-transform: uppercase;
}

.cover__shower {
  color: var(--pink);
  font-size: calc(var(--u) * 150);
}

/* La ilustración trae fondo blanco: multiply lo funde con el óvalo */
.duckling {
  mix-blend-mode: multiply;
}
</style>
