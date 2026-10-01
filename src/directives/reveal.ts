import type { Directive } from 'vue'

// v-reveal: el elemento pasa de transparente a sólido al entrar en pantalla.
// El valor opcional es el retraso en milisegundos (v-reveal="150").
let observer: IntersectionObserver | undefined

function getObserver(): IntersectionObserver | undefined {
  if (typeof IntersectionObserver === 'undefined') return undefined
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer?.unobserve(entry.target)
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
  )
  return observer
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, { value }) {
    el.classList.add('reveal')
    if (value) el.style.setProperty('--reveal-delay', `${value}ms`)

    const io = getObserver()
    if (io) io.observe(el)
    else el.classList.add('is-visible')
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
