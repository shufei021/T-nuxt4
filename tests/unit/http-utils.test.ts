import { describe, expect, it } from 'vitest'
import { assertApiSuccess } from '../../app/utils/http'

describe('assertApiSuccess', () => {
  it('returns the data payload for successful responses', () => {
    expect(
      assertApiSuccess({
        code: 0,
        message: 'success',
        data: { ok: true }
      })
    ).toEqual({ ok: true })
  })

  it('throws when the business code is not successful', () => {
    expect(() =>
      assertApiSuccess({
        code: 1001,
        message: 'invalid credentials',
        data: null
      })
    ).toThrow('invalid credentials')
  })
})
