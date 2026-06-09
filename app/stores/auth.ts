import type { LoginPayload, LoginResponse, SessionUser } from '~/types/auth'
import { hasRequiredRole } from '~/utils/auth'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = useCookie<string | null>('access_token', {
    sameSite: 'lax'
  })
  const authUser = useCookie<SessionUser | null>('auth_user', {
    sameSite: 'lax'
  })

  const token = computed(() => accessToken.value || '')
  const user = computed(() => authUser.value)
  const isAuthenticated = computed(() => Boolean(accessToken.value))

  function setSession(session: LoginResponse) {
    accessToken.value = session.accessToken
    authUser.value = session.user
  }

  function clearSession() {
    accessToken.value = null
    authUser.value = null
  }

  function canAccess(requiredRoles: string[]) {
    return hasRequiredRole(user.value?.roles || [], requiredRoles)
  }

  async function login(payload: LoginPayload) {
    const api = useApi()
    const data = await api.post<LoginResponse, LoginPayload>(
      '/auth/login',
      payload
    )
    setSession(data)
    return data
  }

  async function logout(redirectTo = '/login') {
    clearSession()
    await navigateTo(redirectTo)
  }

  return {
    token,
    user,
    isAuthenticated,
    setSession,
    clearSession,
    canAccess,
    login,
    logout
  }
})
