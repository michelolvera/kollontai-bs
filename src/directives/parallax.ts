import type { Directive } from 'vue'
import { gsap, reducedMotion } from '../motion'

// v-parallax="40": el elemento se desplaza ±40 px mientras su contenedor cruza la pantalla.
// Un valor negativo lo mueve en sentido contrario al scroll.
const tweens = new WeakMap<HTMLElement, gsap.core.Tween>()

export const vParallax: Directive<HTMLElement, number | undefined> = {
  mounted(el, { value = 30 }) {
    if (reducedMotion) return
    tweens.set(
      el,
      gsap.fromTo(
        el,
        { y: value },
        {
          y: -value,
          ease: 'none',
          scrollTrigger: {
            // El contenedor no se mueve: sus medidas son estables
            trigger: el.parentElement ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      ),
    )
  },
  unmounted(el) {
    const tween = tweens.get(el)
    tween?.scrollTrigger?.kill()
    tween?.kill()
  },
}
