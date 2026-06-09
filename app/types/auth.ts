export interface SessionUser {
  id: string
  name: string
  email: string
  roles: string[]
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken?: string
  user: SessionUser
}
