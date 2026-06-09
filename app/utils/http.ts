import type { ApiResponse } from '~/types/api'

export function assertApiSuccess<T>(response: ApiResponse<T>) {
  if (response.code !== 0) {
    throw new Error(response.message || 'Business request failed')
  }

  return response.data
}
