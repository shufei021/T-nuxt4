import type { HealthPayload } from '~/types/api'

export function useHealthCheck() {
  const api = useApi()
  const appStore = useAppStore()
  const loading = ref(false)
  const data = ref<HealthPayload | null>(null)
  const errorMessage = ref('')

  async function fetchHealth() {
    loading.value = true
    errorMessage.value = ''

    try {
      data.value = await api.get<HealthPayload>('/health')
      appStore.setHealthStatus('success')
    } catch (error) {
      data.value = null
      appStore.setHealthStatus('error')
      errorMessage.value =
        error instanceof Error ? error.message : 'Request failed'
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    data,
    errorMessage,
    fetchHealth
  }
}
