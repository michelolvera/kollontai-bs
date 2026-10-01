import type { Directive } from 'vue'

// v-reveal: el elemento aparece al entrar en pantalla.
// El argumento elige el tipo de entrada (v-reveal:scale) y el valor opcional
// es el retraso en milisegundos (v-reveal="150"). Los estilos están en style.css.
export type RevealKind = 'up' | 'scale' | 'left' | 'right' | 'blur' | 'write' | 'words'

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
    { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
  )
  return observer
}

export const vReveal: Directive<HTMLElement, number | undefined, string, RevealKind> = {
  mounted(el, { value, arg }) {
    el.classList.add('reveal', `reveal--${arg ?? 'up'}`)
    if (value) el.style.setProperty('--reveal-delay', `${value}ms`)

    const io = getObserver()
    if (io) io.observe(el)
    else el.classList.add('is-visible')
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
