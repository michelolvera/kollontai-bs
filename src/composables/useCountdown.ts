import { computed, onMounted, onUnmounted, ref } from 'vue'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export function useCountdown(target: Date) {
  const now = ref(Date.now())
  let timer: number | undefined

  onMounted(() => {
    now.value = Date.now()
    timer = window.setInterval(() => (now.value = Date.now()), SECOND)
  })
  onUnmounted(() => window.clearInterval(timer))

  const remaining = computed(() => Math.max(0, target.getTime() - now.value))

  return {
    finished: computed(() => remaining.value === 0),
    days: computed(() => Math.floor(remaining.value / DAY)),
    hours: computed(() => Math.floor((remaining.value % DAY) / HOUR)),
    minutes: computed(() => Math.floor((remaining.value % HOUR) / MINUTE)),
    seconds: computed(() => Math.floor((remaining.value % MINUTE) / SECOND)),
  }
}
