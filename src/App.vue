<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import EnvelopeGate from './components/EnvelopeGate.vue'
import EventItinerary from './components/EventItinerary.vue'
import FloatingDock from './components/FloatingDock.vue'
import GiftsRsvp from './components/GiftsRsvp.vue'
import HeroVideo from './components/HeroVideo.vue'
import InvitationIntro from './components/InvitationIntro.vue'
import SaveTheDate from './components/SaveTheDate.vue'
import VenueMap from './components/VenueMap.vue'
import { lockScroll } from './motion'

const hero = useTemplateRef('hero')
const opened = ref(false)

onMounted(() => {
  // La invitación siempre empieza por el sobre, desde arriba
  history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
  lockScroll(true)
})

function open() {
  opened.value = true
  lockScroll(false)
  // Dentro del mismo toque: así el navegador permite el sonido del video
  hero.value?.start()
}
</script>

<template>
  <Transition name="gate">
    <EnvelopeGate v-if="!opened" @open="open" />
  </Transition>

  <main>
    <HeroVideo ref="hero" />
    <InvitationIntro />
    <SaveTheDate />
    <VenueMap />
    <EventItinerary />
    <GiftsRsvp />
  </main>

  <FloatingDock />
</template>
