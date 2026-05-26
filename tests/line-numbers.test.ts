import { describe, it, expect } from 'vitest'
import { parseLineRange } from '../src/line-numbers'

describe('parseLineRange', () => {
  it('parses file:N', () => {
    expect(parseLineRange('src/auth.ts:42')).toBe(42)
  })

  it('parses file:N-M', () => {
    expect(parseLineRange('src/auth.ts:42-48')).toBe(42)
  })

  it('parses multi-range (takes first)', () => {
    expect(parseLineRange('test.ts:18-70,79-100')).toBe(18)
  })

  it('returns 1 when no line number', () => {
    expect(parseLineRange('src/auth.ts')).toBe(1)
  })

  it('returns 1 for empty string', () => {
    expect(parseLineRange('')).toBe(1)
  })
})
