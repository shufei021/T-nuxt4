export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  const config = useRuntimeConfig()

  if (authStore.isAuthenticated) {
    return navigateTo(config.public.homePath)
  }
})
