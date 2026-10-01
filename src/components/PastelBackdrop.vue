<!-- Fondo vivo: las rayas del diseño y manchas de color de la paleta que se desplazan despacio.
     Llena a su contenedor, que debe estar posicionado y recortar el desborde. -->
<template>
  <div class="backdrop" aria-hidden="true">
    <span class="backdrop__blob backdrop__blob--pink" />
    <span class="backdrop__blob backdrop__blob--sage" />
    <span class="backdrop__blob backdrop__blob--rose" />
    <span class="backdrop__blob backdrop__blob--cream" />
  </div>
</template>

<style scoped>
.backdrop {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: var(--paper) url('../assets/img/stripes.webp') center top / calc(var(--col) * 0.42)
    auto;
}

/* Degradados radiales en lugar de filtros de desenfoque: solo se anima `transform`,
   que el teléfono compone sin repintar. */
.backdrop__blob {
  position: absolute;
  width: 120vmax;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(closest-side, var(--tint), transparent);
  will-change: transform;
  animation: drift 24s ease-in-out infinite alternate;
}

.backdrop__blob--pink {
  --tint: rgb(229 104 129 / 0.3);
  top: -45vmax;
  left: -55vmax;
  --dx: 26vmax;
  --dy: 22vmax;
}

.backdrop__blob--sage {
  --tint: rgb(189 208 141 / 0.6);
  right: -60vmax;
  bottom: -50vmax;
  --dx: -24vmax;
  --dy: -26vmax;
  animation-duration: 29s;
}

.backdrop__blob--rose {
  --tint: rgb(214 140 163 / 0.34);
  top: 10vmax;
  right: -70vmax;
  --dx: -30vmax;
  --dy: 18vmax;
  animation-duration: 33s;
}

/* Lava las rayas al centro para que el contenido respire */
.backdrop__blob--cream {
  --tint: rgb(254 252 249 / 0.92);
  top: calc(50% - 60vmax);
  left: calc(50% - 60vmax);
  --dx: 8vmax;
  --dy: -10vmax;
  animation-duration: 19s;
}

@keyframes drift {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(var(--dx), var(--dy), 0) scale(1.18);
  }
}
</style>
