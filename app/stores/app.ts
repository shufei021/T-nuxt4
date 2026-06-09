export const useAppStore = defineStore('app', () => {
  const appReady = ref(false)
  const lastHealthStatus = ref<'idle' | 'success' | 'error'>('idle')

  function markReady() {
    appReady.value = true
  }

  function setHealthStatus(status: 'idle' | 'success' | 'error') {
    lastHealthStatus.value = status
  }

  return {
    appReady,
    lastHealthStatus,
    markReady,
    setHealthStatus
  }
})
