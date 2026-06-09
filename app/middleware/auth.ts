export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const config = useRuntimeConfig()

  if (authStore.isAuthenticated) {
    return
  }

  const redirect = encodeURIComponent(to.fullPath)
  return navigateTo(`${config.public.loginPath}?redirect=${redirect}`)
})
