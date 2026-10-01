import type { CSSProperties } from 'vue'

// Los iconos son máscaras de un solo color: se pintan con `background` en CSS
// (clase .icon-mask). Las comillas importan: Vite incrusta los SVG pequeños como data URI.
export const maskIcon = (url: string): CSSProperties => ({ '--icon': `url("${url}")` })
