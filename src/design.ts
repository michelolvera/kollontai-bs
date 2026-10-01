import type { CSSProperties } from 'vue'

// El diseño de Canva mide 1240 × 1748 px por página. `--u` (definida en style.css)
// equivale a un pixel de ese diseño, así las posiciones se copian tal cual.
export const u = (px: number): string => `calc(var(--u) * ${px})`

export function box(top: number, left: number, width: number, height?: number): CSSProperties {
  return {
    position: 'absolute',
    top: u(top),
    left: u(left),
    width: u(width),
    ...(height === undefined ? {} : { height: u(height) }),
  }
}

// Los iconos son máscaras de un solo color: se pintan con `background` en CSS.
// Las comillas importan: Vite incrusta los SVG pequeños como data URI.
export const maskIcon = (url: string): CSSProperties => ({ '--icon': `url("${url}")` })
