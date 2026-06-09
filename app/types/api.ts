export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export interface HealthPayload {
  status: string
  timestamp: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}
