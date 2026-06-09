export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const requiredRoles = to.meta.requiredRoles

  if (!requiredRoles?.length) {
    return
  }

  if (authStore.canAccess(requiredRoles)) {
    return
  }

  return createError({
    statusCode: 403,
    statusMessage: 'Forbidden'
  })
})
