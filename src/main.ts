import { createApp } from 'vue'
import 'lenis/dist/lenis.css'
import './style.css'
import App from './App.vue'
import { initSmoothScroll, ScrollTrigger } from './motion'

createApp(App).mount('#app')
initSmoothScroll()

// Las fuentes caligráficas cambian el alto de las secciones al cargar
document.fonts?.ready.then(() => ScrollTrigger.refresh())
