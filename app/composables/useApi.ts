import type { ApiResponse } from '~/types/api'
import { assertApiSuccess } from '~/utils/http'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
type RequestBody = BodyInit | Record<string, any> | null

interface RequestOptions<TBody extends RequestBody = RequestBody> {
  method?: HttpMethod
  query?: Record<string, string | number | boolean | undefined>
  body?: TBody
  headers?: HeadersInit
}

export function useApi() {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  async function request<TResponse, TBody extends RequestBody = RequestBody>(
    url: string,
    options: RequestOptions<TBody> = {}
  ) {
    const token = authStore.token

    const response = await $fetch<ApiResponse<TResponse>>(url, {
      baseURL: config.public.apiBase,
      method: options.method || 'GET',
      query: options.query,
      body: options.body,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers
      },
      onResponseError({ response }) {
        if (response.status === 401) {
          authStore.clearSession()
        }

        console.error('[API ERROR]', response.status, response._data)
      }
    })

    return assertApiSuccess(response)
  }

  return {
    get: <TResponse>(url: string, query?: RequestOptions['query']) =>
      request<TResponse>(url, { method: 'GET', query }),
    post: <TResponse, TBody extends RequestBody = RequestBody>(
      url: string,
      body?: TBody
    ) => request<TResponse, TBody>(url, { method: 'POST', body }),
    put: <TResponse, TBody extends RequestBody = RequestBody>(
      url: string,
      body?: TBody
    ) => request<TResponse, TBody>(url, { method: 'PUT', body }),
    patch: <TResponse, TBody extends RequestBody = RequestBody>(
      url: string,
      body?: TBody
    ) => request<TResponse, TBody>(url, { method: 'PATCH', body }),
    delete: <TResponse>(url: string) =>
      request<TResponse>(url, { method: 'DELETE' })
  }
}
