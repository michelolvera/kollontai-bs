import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)
// En celular la barra del navegador cambia el alto de la ventana al hacer scroll:
// sin esto, cada cambio recalcularía (y haría saltar) las animaciones.
ScrollTrigger.config({ ignoreMobileResize: true })

const matches = (query: string) => typeof matchMedia !== 'undefined' && matchMedia(query).matches

export const reducedMotion = matches('(prefers-reduced-motion: reduce)')
export const finePointer = matches('(hover: hover) and (pointer: fine)')

let lenis: Lenis | undefined
let locked = false

// Scroll suavizado solo con mouse o trackpad: en pantallas táctiles
// el scroll nativo ya tiene inercia y es más fluido.
export function initSmoothScroll() {
  if (reducedMotion || !finePointer) return

  const instance = new Lenis({ lerp: 0.1 })
  instance.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => instance.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  if (locked) instance.stop()
  lenis = instance
}

// Mientras el sobre está cerrado la página no se desplaza
export function lockScroll(lock: boolean) {
  locked = lock
  document.documentElement.classList.toggle('is-locked', lock)
  if (lock) lenis?.stop()
  else lenis?.start()
}

export function scrollToSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  if (lenis) lenis.scrollTo(target, { offset: -18 })
  else target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
}

export { gsap, ScrollTrigger }
