import { describe, expect, it } from 'vitest'
import { hasRequiredRole } from '../../app/utils/auth'

describe('hasRequiredRole', () => {
  it('returns true when no role is required', () => {
    expect(hasRequiredRole(['editor'], [])).toBe(true)
  })

  it('returns true when one required role matches', () => {
    expect(hasRequiredRole(['editor', 'admin'], ['admin'])).toBe(true)
  })

  it('returns false when no required role matches', () => {
    expect(hasRequiredRole(['viewer'], ['admin', 'editor'])).toBe(false)
  })
})
