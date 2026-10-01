<script setup lang="ts">
import { computed, onMounted, useTemplateRef } from 'vue'

// Fondo vivo: manchas de color de la paleta que se desplazan despacio.
// Llena a su contenedor, que debe estar posicionado.
//
// Las manchas se pintan una sola vez en dos lienzos diminutos que el navegador estira:
// un degradado suave se ve igual ampliado, y la textura pesa unos KB en lugar de las
// decenas de MB que ocupa una capa del tamaño de la pantalla en un teléfono de alta
// densidad. Solo se anima `transform`, sin repintar nada.
const props = withDefaults(
  defineProps<{
    tone?: 'pastel' | 'olive'
    /** Franja extra por encima del contenedor (en fracción de su alto) donde el fondo
     *  se desvanece: el velo del video la usa para no entrar con un corte. */
    feather?: number
  }>(),
  { tone: 'pastel', feather: 0 },
)

// [x, y, radio] en fracciones del lienzo, color RGB y opacidad al centro
type Blob = [x: number, y: number, radius: number, rgb: string, alpha: number]

const LAYERS: Record<'pastel' | 'olive', [Blob[], Blob[]]> = {
  pastel: [
    [
      [0.12, 0.16, 0.6, '229,104,129', 0.34],
      [0.95, 0.52, 0.5, '214,140,163', 0.32],
    ],
    [
      [0.88, 0.92, 0.62, '189,208,141', 0.6],
      // Lava las rayas al centro para que el contenido respire
      [0.5, 0.45, 0.46, '254,252,249', 0.9],
    ],
  ],
  olive: [[[0.08, 0.1, 0.62, '189,208,141', 0.8]], [[0.95, 0.95, 0.6, '229,104,129', 0.32]]],
}

const WIDTH = 72
const HEIGHT = 128
// Los lienzos sobresalen 15 % por lado: al moverse nunca enseñan el borde
const OVERSCAN = 0.15
const SPAN = 1 + OVERSCAN * 2

// Parte del alto total (contenedor + franja) que ocupa la franja
const fade = computed(() => props.feather / (1 + props.feather))
const canvasHeight = computed(() => Math.round(HEIGHT * (1 + props.feather)))

const first = useTemplateRef<HTMLCanvasElement>('first')
const second = useTemplateRef<HTMLCanvasElement>('second')

function paint(canvas: HTMLCanvasElement | null, blobs: Blob[]) {
  const context = canvas?.getContext('2d')
  if (!canvas || !context) return
  const { width, height } = canvas

  for (const [x, y, radius, rgb, alpha] of blobs) {
    // Las manchas se colocan respecto al contenedor, debajo de la franja
    const inContainer = y * SPAN - OVERSCAN
    const centerY = ((fade.value + inContainer * (1 - fade.value) + OVERSCAN) / SPAN) * height
    const gradient = context.createRadialGradient(
      x * width,
      centerY,
      0,
      x * width,
      centerY,
      radius * HEIGHT,
    )
    gradient.addColorStop(0, `rgba(${rgb},${alpha})`)
    gradient.addColorStop(1, `rgba(${rgb},0)`)
    context.fillStyle = gradient
    context.fillRect(0, 0, width, height)
  }

  if (!fade.value) return
  // El desvanecido va pintado en el propio lienzo: una máscara CSS sobre capas
  // en movimiento tendría que recomponerse en cada cuadro.
  const top = (OVERSCAN / SPAN) * height
  const ramp = context.createLinearGradient(0, top, 0, ((OVERSCAN + fade.value) / SPAN) * height)
  ramp.addColorStop(0, 'rgba(0,0,0,0)')
  ramp.addColorStop(1, 'rgba(0,0,0,1)')
  context.globalCompositeOperation = 'destination-in'
  context.fillStyle = ramp
  context.fillRect(0, 0, width, height)
}

onMounted(() => {
  const [back, front] = LAYERS[props.tone]
  paint(first.value, back)
  paint(second.value, front)
})
</script>

<template>
  <div
    class="backdrop"
    :style="{ top: `${-feather * 100}%`, '--fade': `${fade * 100}%` }"
    aria-hidden="true"
  >
    <div v-if="tone === 'pastel'" class="backdrop__stripes" :class="{ 'is-feathered': feather }" />
    <canvas ref="first" class="backdrop__layer" :width="WIDTH" :height="canvasHeight" />
    <canvas
      ref="second"
      class="backdrop__layer backdrop__layer--reverse"
      :width="WIDTH"
      :height="canvasHeight"
    />
  </div>
</template>

<style scoped>
.backdrop {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

/* Las rayas del diseño, fijas bajo las manchas */
.backdrop__stripes {
  position: absolute;
  inset: 0;
  background: var(--paper) url('../assets/img/stripes.webp') center bottom / calc(var(--col) * 0.42)
    auto;
}

/* Capa quieta: su máscara se pinta una sola vez */
.backdrop__stripes.is-feathered {
  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 var(--fade));
  mask-image: linear-gradient(to bottom, transparent, #000 var(--fade));
}

.backdrop__layer {
  position: absolute;
  top: -15%;
  left: -15%;
  width: 130%;
  height: 130%;
  will-change: transform;
  animation: drift 26s ease-in-out infinite alternate;
}

.backdrop__layer--reverse {
  animation-duration: 33s;
  animation-direction: alternate-reverse;
}

@keyframes drift {
  from {
    transform: translate3d(-7%, -5%, 0) rotate(-4deg) scale(1);
  }
  to {
    transform: translate3d(7%, 6%, 0) rotate(5deg) scale(1.14);
  }
}
</style>
