import type { Directive } from 'vue'
import { finePointer, gsap, reducedMotion } from '../motion'

// v-magnetic: el elemento se deja atraer por el cursor. Solo con mouse:
// en pantallas táctiles no hay cursor que seguir.
const cleanups = new WeakMap<HTMLElement, () => void>()

export const vMagnetic: Directive<HTMLElement, number | undefined> = {
  mounted(el, { value = 0.28 }) {
    if (!finePointer || reducedMotion) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    const follow = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      xTo((event.clientX - (rect.left + rect.width / 2)) * value)
      yTo((event.clientY - (rect.top + rect.height / 2)) * value)
    }
    const release = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('pointermove', follow)
    el.addEventListener('pointerleave', release)
    cleanups.set(el, () => {
      el.removeEventListener('pointermove', follow)
      el.removeEventListener('pointerleave', release)
      gsap.killTweensOf(el)
    })
  },
  unmounted(el) {
    cleanups.get(el)?.()
  },
}
